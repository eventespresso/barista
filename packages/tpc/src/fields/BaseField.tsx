import { createElement } from 'react';
import classNames from 'classnames';
import { NumberInput, Select, TextInput } from '@eventespresso/ui-components';

import useBaseField from './useBaseField';
import type { BaseFieldProps } from './types';

const BaseField: React.FC<BaseFieldProps> = ({
	children,
	component,
	name,
	format,
	formatOnBlur,
	parse,
	getValue,
	setValue,
	type,
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

	const className = classNames(props.className, 'ee-input');

	if (component === 'select') {
		return (
			<Select
				{...props}
				aria-label={props['aria-label']}
				className={className}
				fitContainer
				isDisabled={props.disabled}
				// @ts-ignore
				onBlur={handlers?.onBlur}
				// @ts-ignore
				onChange={handlers?.onChange}
				value={fieldValue as string}
			>
				{children}
			</Select>
		);
	}

	if (type === 'text') {
		return (
			<TextInput
				{...handlers}
				{...props}
				className={className}
				isDisabled={props.disabled}
				// @ts-ignore
				onBlur={handlers?.onBlur}
				// @ts-ignore
				onChange={handlers?.onChange}
				value={fieldValue as string}
			/>
		);
	}

	if (type === 'number') {
		return (
			<NumberInput
				{...handlers}
				{...props}
				inputClass={'ee-input'}
				isDisabled={props.disabled}
				onBlur={handlers?.onBlur}
				// @ts-ignore
				onChange={handlers?.onChange}
				showStepper={false}
				value={fieldValue as string}
				wrapperClass={props.className}
			/>
		);
	}

	if (typeof component === 'string') {
		const htmlClass = classNames(className, 'ee-input-base');
		return createElement(
			component,
			{ ...handlers, ...props, className: htmlClass, type: type, value: fieldValue },
			children
		);
	}

	return null;
};

export default BaseField;
