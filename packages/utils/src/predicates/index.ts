import * as R from 'ramda';

import { toBoolean } from '../converters';

export const removeNullAndUndefined = <T extends Record<string, any>>(filterable: T): T => {
	return R.pickBy(R.compose(R.not, R.isNil), filterable);
};

export const normalizeNumericFields = (numericFields: Array<string>, object: Record<string, any>) => {
	return normalizeFields(numericFields, object, Number);
};

export const normalizeBooleanFields = (booleanFields: Array<string>, object: Record<string, any>) => {
	return normalizeFields(booleanFields, object, toBoolean); // use toBoolean instead of Boolean
};

export const normalizeFields = <T extends Function>(fields: Array<string>, object: Record<string, any>, convert: T) => {
	const output = R.clone(object);

	for (const field of fields) {
		if (R.has(field, output)) {
			output[field] = convert(output[field]);
		}
	}
	return output;
};

export const isNilOrEmpty = R.anyPass([R.isNil, R.isEmpty]);
