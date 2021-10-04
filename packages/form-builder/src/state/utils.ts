import * as R from 'ramda';

import { __ } from '@eventespresso/i18n';
import { uuid, isNilOrEmpty } from '@eventespresso/utils';
import { sortByOrder, setOrderByIndex, isSharedOrDefault } from '@eventespresso/predicates';

import { FormState } from './types';
import {
	FormElement,
	FormElementRaw,
	FormSection,
	FormSectionRaw,
	LocalOnlyFields,
	FormStatusFlags,
	FormStatus,
	ElementJsonFields,
	SectionJsonFields,
} from '../types';
import { LOCAL_ONLY_FIELDS, STATUS_FLAGS } from './constants';
import { DEFAULT_ELEMENT, DEFAULT_SECTION } from '../constants';

export function omitLocalFields<Item extends LocalOnlyFields>(item: Item) {
	return R.omit(LOCAL_ONLY_FIELDS, item);
}

export function omitStatusFlags<Item extends FormStatusFlags>(item: Item) {
	return R.omit(STATUS_FLAGS, item);
}

/**
 * recalculates the boolean status flags based on the new status
 */
export function resetStatusFlags<Item extends FormStatusFlags & { status?: FormStatus }>(item: Item): Item {
	// Set all of them to false first
	let isActive = false,
		isArchived = false,
		isDefault = false,
		isShared = false,
		isTrashed = false;
	switch (item.status) {
		case 'ACTIVE':
			isActive = true;
			break;
		case 'ARCHIVED':
			isArchived = true;
			break;
		case 'DEFAULT':
			isDefault = true;
			break;
		case 'SHARED':
			isShared = true;
			break;
		case 'TRASHED':
			isTrashed = true;
			break;
	}
	return { ...item, isActive, isArchived, isDefault, isShared, isTrashed };
}

const elementJsonFields: Array<ElementJsonFields> = ['attributes', 'helpText', 'label', 'options', 'required'];
/**
 * Parses a raw form element which has consolidated fields as JSON and converts them to objects
 */
export const parseRawElement = (element: FormElementRaw) => {
	const predicates = elementJsonFields.map((field) => {
		// when the field is present in the element, parse it as JSON
		return R.when<FormElement, FormElement>(R.has(field), R.over(R.lensProp(field), JSON.parse));
	});
	// @ts-ignore ramda TS doesn't like spread operator here which it should
	return R.pipe(...predicates)(element);
};
/**
 * Converts the consolidated fields (which are objects) to JSON strings.
 */
export const stringifyElementFields = (element: FormElement) => {
	const predicates = elementJsonFields.map((field) => {
		// when the field is present in the element, stringify it as JSON
		return R.when<FormElementRaw, FormElementRaw>(R.has(field), R.over(R.lensProp(field), JSON.stringify));
	});
	// @ts-ignore ramda TS doesn't like spread operator here which it should
	return R.pipe(...predicates)(element);
};

const sectionJsonFields: Array<SectionJsonFields> = ['attributes', 'label'];
/**
 * Parses a raw form section which has consolidated fields as JSON and converts them to objects
 */
export const parseRawSection = (element: FormSectionRaw) => {
	const predicates = sectionJsonFields.map((field) => {
		// when the field is present in the section, parse it as JSON
		return R.when<FormSection, FormSection>(R.has(field), R.over(R.lensProp(field), JSON.parse));
	});
	// @ts-ignore ramda TS doesn't like spread operator here which it should
	return R.pipe(...predicates)(element);
};
/**
 * Converts the consolidated fields (which are objects) to JSON strings.
 */
export const stringifySectionFields = (element: FormSection) => {
	const predicates = sectionJsonFields.map((field) => {
		// when the field is present in the element, stringify it as JSON
		return R.when<FormSectionRaw, FormSectionRaw>(R.has(field), R.over(R.lensProp(field), JSON.stringify));
	});
	// @ts-ignore ramda TS doesn't like spread operator here which it should
	return R.pipe(...predicates)(element);
};

/**
 * Normalizes mutation input for element mutations
 */
export function normalizeElementInput(input: any) {
	return R.pipe(omitLocalFields, stringifyElementFields)(input);
}

/**
 * Normalizes mutation input for element mutations
 */
export function normalizeSectionInput(input: any) {
	return R.pipe(stringifySectionFields, omitStatusFlags, omitLocalFields)(input);
}

export function markAsModified<Item extends LocalOnlyFields>(items: Array<Item>, startingIndex: number) {
	// split the items at the starting index to mark the succeeding indices as modified items
	const [unmodifiedElements, modifiedElements] = R.splitAt(startingIndex, items);
	// set `isModified` to true
	const newModifiedElements = modifiedElements.map(R.set(R.lensProp('isModified'), true));
	// Update the elements array
	return [...unmodifiedElements, ...newModifiedElements];
}

/**
 * If the `topLevelSection` is not set,
 * it attempts to set the first added section as the top level one
 */
export const maybeSetTopLevelSection = (addedSectionId: string) => {
	return R.when<FormState, FormState>(
		R.propSatisfies(isNilOrEmpty, 'topLevelSection'),
		R.set(R.lensProp<FormState>('topLevelSection'), addedSectionId)
	);
};

export const addSectionToState =
	(section: FormSection, afterId: string) =>
	(state: FormState): FormState => {
		const newSection = resetStatusFlags(section);
		// if a section is saved (as DEFAULT or SHARED),
		// we don't need to recalculate the order, lets prevent unnecessary mutations
		if (isSharedOrDefault(newSection)) {
			return R.assocPath(['sections', newSection.id], newSection, state);
		}
		// Sort the sections by order
		let sortedSections = sortByOrder(Object.values(state.sections));
		// Find the index of the section after which the new section should be added
		const existingSectionIdx = R.findIndex(R.propEq('id', afterId), sortedSections);
		const newIndex = existingSectionIdx + 1;
		// Insert the new section at the correct position
		sortedSections = R.insert(newIndex, newSection, sortedSections);
		// Recalculate the order of all the sections
		sortedSections = setOrderByIndex(sortedSections);
		// mark the updated items as modified, here the `order` will change only from the new index
		sortedSections = markAsModified(sortedSections, newIndex);

		// compute the state
		return {
			...state,
			sections: R.indexBy(R.prop('id'), sortedSections),
			// Open the new section
			openElement: newSection.id,
		};
	};

export const moveSection =
	(id: string, newIndex: number) =>
	(state: FormState): FormState => {
		// Sort the sections by order
		let sortedSections = sortByOrder(Object.values(state.sections));
		// Find the current index of the section
		const currentIndex = R.findIndex(R.propEq('id', id), sortedSections);
		// If the element is not found
		if (currentIndex < 0) {
			return state;
		}
		// Move the element to the new index
		sortedSections = R.move(currentIndex, newIndex, sortedSections);
		// Recalculate the order of all the sections
		sortedSections = setOrderByIndex(sortedSections);
		// items can be re-arranged in any order (up and down), so the `order` will change starting from the lower index
		// so we need to use the lowest of the two indices to mark them as modified
		const modifiedStartIndex = Math.min(currentIndex, newIndex);
		// mark the updated items as modified
		sortedSections = markAsModified(sortedSections, modifiedStartIndex);

		// compute the state
		return {
			...state,
			sections: R.indexBy(R.prop('id'), sortedSections),
			// close any open elements
			openElement: '',
		};
	};

export const addElementToState =
	(element: FormElement, afterId?: string) =>
	(state: FormState): FormState => {
		// we need to filter the elements by section to set the order
		const elements = Object.values(state.elements).filter(R.propEq('belongsTo', element.belongsTo));
		// Sort the elements by order
		let sortedElements = sortByOrder(elements);
		// Find the index of the element after which the new element should be added
		const existingElementIdx = afterId ? R.findIndex(R.propEq('id', afterId), sortedElements) : -1;

		// If the element is not found, new index is -1 (end of the list)
		const newIndex = existingElementIdx < 0 ? -1 : existingElementIdx + 1;

		// Insert the new element at the correct position
		sortedElements = R.insert(newIndex, element, sortedElements);

		// Recalculate the order of all the elements
		sortedElements = setOrderByIndex(sortedElements);
		// mark the updated items as modified, here the `order` will change only from the new index
		sortedElements = markAsModified(sortedElements, newIndex);

		// compute the state
		return {
			...state,
			elements: {
				// Since we filtered the elements by section, we need to retain other elements
				...state.elements,
				...R.indexBy(R.prop('id'), sortedElements),
			},
			// Open the new element
			openElement: element.id,
		};
	};

export const moveElement =
	(id: string, newIndex: number, sectionId: string) =>
	(state: FormState): FormState => {
		// Change/Set the section Id for the element
		const elementsMap = {
			...state.elements,
			[id]: {
				...state.elements[id],
				belongsTo: sectionId,
			},
		};
		// we need to filter the elements by section to set the order
		const elements = Object.values(elementsMap).filter(R.propEq('belongsTo', sectionId));
		// Sort the elements by order
		let sortedElements = sortByOrder(elements);
		// Find the current index of the section
		const currentIndex = R.findIndex(R.propEq('id', id), sortedElements);
		// If the element is not found
		if (currentIndex < 0) {
			return state;
		}
		// Move the element to the new index
		sortedElements = R.move(currentIndex, newIndex, sortedElements);

		// Recalculate the order of all the elements
		sortedElements = setOrderByIndex(sortedElements);
		// items can be re-arranged in any order (up and down), so the `order` will change starting from the lower index
		// so we need to use the lowest of the two indices to mark them as modified
		const modifiedStartIndex = Math.min(currentIndex, newIndex);
		// mark the updated items as modified
		sortedElements = markAsModified(sortedElements, modifiedStartIndex);

		// compute the state
		return {
			...state,
			elements: {
				// Since we filtered the elements by section, we need to retain other elements
				...state.elements,
				...R.indexBy(R.prop('id'), sortedElements),
			},
			// close any open elements
			openElement: '',
		};
	};

export const deleteElement = (id: string) => {
	return R.pipe<FormState, FormState, FormState>(
		// unless an element is new, it needs to be marked as deleted
		R.unless(R.pathEq(['elements', id, 'isNew'], true), R.over(R.lensPath(['deletedElements']), R.concat([id]))),
		R.over(R.lensPath(['elements']), R.omit([id]))
	);
};

export const deleteSection = (id: string) => {
	return R.pipe<FormState, FormState, FormState>(
		// unless a section is new, it needs to be marked as deleted
		R.unless(R.pathEq(['sections', id, 'isNew'], true), R.over(R.lensPath(['deletedSections']), R.concat([id]))),
		R.over(R.lensPath(['sections']), R.omit([id]))
	);
};

export const copySectionElements =
	(copyFromSectionId: string, newSectionId: string) =>
	(state: FormState): FormState => {
		// We also need to copy the elements of the section
		let sectionElements: Array<FormElement> = [];
		// Lets get all the elements that belong to the copied section
		sectionElements = Object.values(state.elements).filter(R.propEq('belongsTo', copyFromSectionId));
		// Change the id and belongsTo for all the elements
		sectionElements = sectionElements.map((elem) => ({
			...elem,
			id: uuid(),
			belongsTo: newSectionId,
			isNew: true,
		}));

		return {
			...state,
			elements: {
				// Since we filtered the elements by section, we need to retain other elements
				...state.elements,
				...R.indexBy(R.prop('id'), sectionElements),
			},
		};
	};

export const deleteSectionElements =
	(sectionId: string) =>
	(state: FormState): FormState => {
		const sectionElementIds = getSectionElementIds(sectionId)(state);

		return R.over(R.lensPath(['elements']), R.omit(sectionElementIds), state);
	};

export const getSectionElementIds =
	(sectionId: string) =>
	(state: FormState): Array<string> => {
		return Object.values(state.elements)
			.filter(R.propEq('belongsTo', sectionId))
			.map(({ id }) => id);
	};

/**
 * Returns true if a section or element has `belongsTo` field empty
 */
export const belongsToNone = R.propSatisfies<string, { belongsTo?: string }>(isNilOrEmpty, 'belongsTo');

export const prepareNewSection = (section: Partial<FormSection>, topLevelSection?: string): FormSection => {
	return {
		// New section will be composed of default section
		...DEFAULT_SECTION,
		// by default set `belongsTo` to `topLevelSection`
		belongsTo: topLevelSection,
		...section,
		id: uuid(),
		isNew: true,
	};
};

export const prepareNewElement = (element: Partial<FormElement>): FormElement => {
	let publicLabel: string;

	switch (element.type) {
		case 'BUTTON':
			publicLabel = __('click');
			break;
		case 'CHECKBOX_MULTI':
			publicLabel = __('checkboxes');
			break;
		case 'DATE':
			publicLabel = __('date');
			break;
		case 'DATETIME_LOCAL':
			publicLabel = __('Local Date');
			break;
		case 'DAY_SELECT':
			publicLabel = __('day');
			break;
		case 'DECIMAL':
			publicLabel = __('Decimal Number');
			break;
		case 'INTEGER':
			publicLabel = __('Whole Number');
			break;
		case 'EMAIL':
			publicLabel = __('email address');
			break;
		case 'EMAIL_CONFIRMATION':
			publicLabel = __('confirm email address');
			break;
		case 'MONTH':
		case 'MONTH_SELECT':
			publicLabel = __('month');
			break;
		case 'PASSWORD':
			publicLabel = __('password');
			break;
		case 'PASSWORD_CONFIRMATION':
			publicLabel = __('confirm password');
			break;
		case 'RADIO':
			publicLabel = __('radio buttons');
			break;
		case 'RANGE':
			publicLabel = __('number range');
			break;
		case 'SELECT':
			publicLabel = __('selection dropdown');
			break;
		case 'SELECT_COUNTRY':
			publicLabel = __('country');
			break;
		case 'SELECT_MULTI':
			publicLabel = __('multi-select dropdown');
			break;
		case 'SELECT_STATE':
			publicLabel = __('state/province');
			break;
		case 'SWITCH':
			publicLabel = __('on/off switch');
			break;
		case 'RESET':
			publicLabel = __('reset');
			break;
		case 'TEL':
			publicLabel = __('phone number');
			break;
		case 'TEXT':
			publicLabel = __('text');
			break;
		case 'TEXTAREA':
			publicLabel = __('simple textarea');
			break;
		case 'TEXTAREA_HTML':
			publicLabel = __('html textarea');
			break;
		case 'TIME':
			publicLabel = __('time');
			break;
		case 'URL':
			publicLabel = __('URL');
			break;
		case 'WEEK':
			publicLabel = __('week');
			break;
		case 'YEAR_SELECT':
			publicLabel = __('year');
			break;
	}

	const newElement = R.mergeDeepRight({ label: { publicLabel } }, element);

	return {
		// New element will be composed of default element
		...DEFAULT_ELEMENT,
		...newElement,
		id: uuid(),
		isNew: true,
	};
};
