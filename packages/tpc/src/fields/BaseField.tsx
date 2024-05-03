import { createElement } from 'react';
import classNames from 'classnames';
import { NumberInput, Select, TextInput } from '@eventespresso/ui-components';

import useBaseField from './useBaseField';
import type React from 'react';
import type { BaseFieldProps } from './types';
import type { Map } from '.';

type C<T extends {}> = React.FunctionComponent<T>;
type Select = Map['Select'];
type Input = Map['Input'];

function factory<K extends keyof Map>(key: K): React.FunctionComponent<Map[K]['Props']> {
	if (key === 'Input') return input;

	if (key === 'Select') return select;

	throw new Error('TODO:');
}

const input: C<Select['Props']> = (props) => {
	return <input {...props} />;
};

const select: C<Input['Props']> = (props) => {
	return <select {...props} />;
};

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
			// @ts-ignore
			<NumberInput
				{...handlers}
				{...props}
				inputClass={'ee-input'}
				isDisabled={props.disabled}
				onChangeValue={handlers?.onChangeValue}
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
