import type { FieldMetaState, FieldRenderProps, FormRenderProps } from 'react-final-form';
import { setIn, getIn, Mutator } from 'final-form';
import { ObjectSchema, ValidationError } from 'yup';

import type { FieldConditions } from './types';

type ValidateStatus = '' | 'error' | 'success' | 'warning' | 'validating';

export const getValidateStatus = ({ touched, error, submitError }: FieldMetaState<any>): ValidateStatus => {
	if (touched) {
		if (!(error || submitError)) {
			return 'success';
		}
		if (submitError || error) {
			return 'error';
		}
	}
	return '';
};

export const evalFieldConditions = (
	conditions: FieldConditions,
	formData: Record<string, any>,
	fieldName: string
): boolean => {
	let conditionsApply = true;
	/**
	 * The field can be inside a repeatable field/group.
	 * Thus fieldName can be "billing.addresses[1].phones[0].code"
	 * which means that it belongs to address at index 1 (in array of addresses)
	 * and phone at index 0 (in array of phones)
	 */
	const repeatableIndices = fieldName.match(/\[\d+?\]/g) || []; // ["[1]", "[0]"]

	if (Array.isArray(conditions) && conditions.length) {
		const satisfied = conditions
			.map(({ field, compare, value }) => {
				let complexKey = field;

				// field can be "billing.addresses[x].phones[x].country"
				const variableKeyRegex = /\[x\]/;
				if (variableKeyRegex.test(complexKey)) {
					repeatableIndices.forEach((entry) => {
						complexKey = complexKey.replace(variableKeyRegex, entry);
					});
					// replace any remaining variable indices with "0"
					complexKey = complexKey.replace(new RegExp(variableKeyRegex.source, 'g'), '[0]');
				}

				const result = getIn(formData, complexKey);

				switch (compare) {
					case '=':
						return result === value;
					case '!=':
						return result !== value;
					case '>':
						return result > value;
					case '>=':
						return result >= value;
					case '<':
						return result < value;
					case '<=':
						return result <= value;
					case 'EMPTY':
						return !result;
					case 'NOT_EMPTY':
						return result;
					case 'CONTAINS':
						return (typeof result === 'string' || Array.isArray(result)) && result.includes(value);
					case 'NOT_CONTAINS':
						return !(typeof result === 'string' || Array.isArray(result)) || !result.includes(value);
					case 'MATCHES':
						return new RegExp(value).test(result);
					case 'NOT_MATCHES':
						return !new RegExp(value).test(result);
					default:
						return false;
				}
			})
			.filter(Boolean);
		// whether all conditions apply
		conditionsApply = satisfied.length === conditions.length;
	}
	return conditionsApply;
};

/**
 * Converts yup errors object into RFF error shape.
 *
 * error.inner is an array of all errors like:
 *
 * error.inner = [
 *     {
 *         ...
 *         path: 'price',
 *         message: 'Price is required',
 *         ...
 *     },
 *     {
 *         ...
 *         path: 'dateTime.startDate',
 *         message: 'Start date must not be in the past',
 *         ...
 *     },
 *     {
 *         ...
 *         path: 'dateTime.endDate',
 *         message: 'End date must be after start date',
 *         ...
 *     },
 * ]
 *
 * After error.inner.reduce(), we will get:
 * {
 *     price: 'Price is required',
 *     dateTime: {
 *         startDate: 'Start date must not be in the past',
 *         endDate: 'End date must be after start date',
 *     },
 * }
 * @link https://github.com/jquense/yup#validationerrorerrors-string--arraystring-value-any-path-string
 * @link https://final-form.org/docs/final-form/types/Config#validation-errors
 * @param validationSchema
 * @param values
 */
export const yupToFinalFormErrors = async <T>(
	validationSchema: ObjectSchema<any>,
	values: T
): Promise<Record<string, any>> => {
	try {
		await validationSchema.validate(values, { abortEarly: false });
	} catch (err) {
		// type annotate the error
		const error: ValidationError = err;
		return error.inner?.reduce((formError, innerError) => {
			// Update formError at appropriate path - innerError.path
			// which is dot-and-bracket syntax (e.g. "some.values[3].whatever")
			return setIn(formError, innerError.path, innerError.message);
		}, {});
	}
};

/* React Final Form mutator function */
export const updateFieldValue: Mutator = ([name, value], state, { changeValue }) => {
	changeValue(state, name, () => value);
};

export const formPropsAreEqual = (prevProps: FormRenderProps, nextProps: FormRenderProps): boolean => {
	const prevValue = JSON.stringify(prevProps.form?.getState());
	const nextValue = JSON.stringify(nextProps.form?.getState());
	return prevValue === nextValue;
};

export const fieldPropsAreEqual = (prevProps: FieldRenderProps<any>, nextProps: FieldRenderProps<any>): boolean => {
	const prevInputValue = JSON.stringify(prevProps.input);
	const nextInputValue = JSON.stringify(nextProps.input);
	if (prevInputValue !== nextInputValue) {
		return false;
	}
	const prevMetaValue = JSON.stringify(prevProps.meta);
	const nextMetaValue = JSON.stringify(nextProps.meta);
	return prevMetaValue === nextMetaValue;
};
