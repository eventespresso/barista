import * as R from 'ramda';

import { BUTTON_FIELDS, DATE_FIELDS, FIELDS_WITH_OPTIONS, NUMERIC_FIELDS, TEXT_FIELDS } from './constants';
import { FormElement, ElementType } from './types';

export const isFieldOfType = R.curry((types: Array<ElementType>, element: FormElement) =>
	R.includes(element.type, types)
);

export const isButtonField = isFieldOfType(BUTTON_FIELDS);
export const isDateField = isFieldOfType(DATE_FIELDS);
export const isFieldWithOptions = isFieldOfType(FIELDS_WITH_OPTIONS);
export const isNumericField = isFieldOfType(NUMERIC_FIELDS);
export const isTextField = isFieldOfType(TEXT_FIELDS);
export const isTelField = isFieldOfType(['TEL']);
