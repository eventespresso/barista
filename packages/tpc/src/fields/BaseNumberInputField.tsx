import React from 'react';

import { TextInput } from '@eventespresso/components';
import useBaseField from './useBaseField';
import type { BaseFieldProps } from './types';

const BaseNumberInputField: React.FC<BaseFieldProps> = ({
	className,
	component,
	disabled,
	format,
	formatOnBlur,
	getValue,
	name,
	parse,
	placeholder,
	setValue,
	value,
	...props
}) => {
	const { fieldValue, handlers } = useBaseField({
		component,
		name,
		format,
		formatOnBlur,
		parse,
		getValue,
		setValue,
		value,
	});

	return (
		<TextInput
			className={className}
			// because it can affect other tickets that have this price
			// default price amount should not be changeable
			isDisabled={disabled}
			placeholder={placeholder}
			{...props}
			{...handlers}
			size={null} // TS doesn't like this prop to go
			value={fieldValue as string}
			type='number'
		/>
	);
};

export default BaseNumberInputField;
