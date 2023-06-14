import { useMemo } from 'react';
import type { FieldValue, InputProps, UseBaseField } from './types';

const defaultFormat: UseBaseField['format'] = (value) => value ?? '';
const defaultParse: UseBaseField['parse'] = (value) => value ?? '';

type BaseField = {
	handlers: InputProps;
	fieldValue: FieldValue;
};

const useBaseField = ({
	component,
	name,
	format = defaultFormat,
	formatOnBlur,
	parse = defaultParse,
	getValue,
	setValue,
	value,
}: UseBaseField): BaseField => {
	let fieldValue = (value || getValue()) as FieldValue;

	if (formatOnBlur) {
		if (component === 'input') {
			fieldValue = format(fieldValue, name);
		}
	} else {
		// fieldValue = format(fieldValue, name);
	}

	if (fieldValue === null) {
		fieldValue = '';
	}

	return useMemo<BaseField>(() => {
		const handlers: InputProps = {
			onBlur: () => {
				let value = parse(getValue(), name);
				if (formatOnBlur) {
					value = format(value, name);
				}
				setValue(value);
			},
			onChange: (event) => {
				const value = event?.target?.value;
				console.log('%c useBaseField::onChange()', 'color: Orange; font-size: 12px;');
				console.log('%c value, name, parse', 'color: Orange;', value, name, parse);
				setValue(parse(value, name));
			},
			onChangeValue: (value) => {
				console.log('%c useBaseField::onChangeValue()', 'color: Orange; font-size: 12px;');
				console.log('%c value, name, parse', 'color: Orange;', value, name, parse);
				setValue(parse(value, name));
			},
		};

		return {
			handlers,
			fieldValue,
		};
	}, [fieldValue, formatOnBlur, setValue, format, getValue, name, parse]);
};

export default useBaseField;
