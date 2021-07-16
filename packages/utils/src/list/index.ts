import { groupBy, pluck, prop as propVal } from 'ramda';

import { __ } from '@eventespresso/i18n';
import type { OptionsType } from '@eventespresso/adapters';
import { AnyObject } from '../types';

/**
 * Converts entity list to options for select input
 * @param list The entity list
 * @param emptyOption empty option to display at the top
 */
export const entityListToSelectOptions = (
	list: Array<any>,
	emptyOption: OptionsType[0] = { label: __('Select…'), value: '' }
): OptionsType => {
	const options = emptyOption ? [emptyOption] : [];

	return [...options, ...list.map(({ id: value, name: label }) => ({ label, value }))];
};

/**
 * Converts a key-value object to options for select input
 */
export const objectToSelectOptions = (object: AnyObject, prependEmpty?: boolean): OptionsType => {
	const options = Object.entries(object).map(([value, label]) => ({ value, label }));

	if (prependEmpty) {
		return [{ label: '', value: '' }, ...options];
	}

	return options;
};

/**
 * Converts select options to a flat array of option values
 */
export const getOptionValues = (allOptions: OptionsType): Array<string> => {
	return allOptions
		.map(({ options, value }) => (options ? pluck('value', options) : [value]))
		.flat()
		.filter(Boolean);
};

/**
 * Groups the items in a list by value of the given key
 *
 * For example this list
 * [
 * 	{ id: 'abc', order: 50 },
 * 	{ id: 'def', order: 60 },
 * 	{ id: 'ghi', order: 50 },
 * 	{ id: 'klm', order: 70 },
 * 	{ id: 'nop', order: 60 },
 * 	{ id: 'qrs', order: 80 },
 * 	{ id: 'tuv', order: 60 },
 * ]
 * becomes
 * {
 * 	50: [
 * 		{ id: 'abc', order: 50 },
 * 		{ id: 'ghi', order: 50 },
 * 	],
 * 	60: [
 * 		{ id: 'def', order: 60 },
 * 		{ id: 'nop', order: 60 },
 * 		{ id: 'tuv', order: 60 },
 * 	],
 * 	70: [{ id: 'klm', order: 70 }],
 * 	80: [{ id: 'qrs', order: 80 }],
 * }
 *
 * The primary purpose of this abstraction is to preserve types which R.groupBy messes up
 */

export const groupByProp = <T extends Record<string, any>, K extends keyof T>(
	prop: K,
	objList: Array<T>
): Record<T[K], Array<T>> => {
	return groupBy(propVal(prop as string), objList) as Record<T[K], Array<T>>;
};
