import css from 'classnames';

import { Select, TextInput, NumberInput } from '@eventespresso/ui-components';

import { useFactory } from '.';

import type { Type } from '.';

type Map = Type.Return;
type Props<K extends keyof Map> = Map[K]['Component']['Props'] & {
	_type: K; // underscore to avoid collission with html attribute
};

export function Factory<K extends keyof Map>(props: Props<K>) {
	const className = css(props.className, 'ee-input');

	if (IsSelectProps(props)) {
		const { value, handlers } = useFactory<'Select'>(props);

		return (
			<Select {...props} {...handlers} value={value} className={className} fitContainer>
				{props.children}
			</Select>
		);
	}

	if (IsInputTextProps(props)) {
		const { value, handlers } = useFactory<'Text'>(props);

		return <TextInput {...props} {...handlers} className={className} isDisabled={props.disabled} value={value} />;
	}

	if (IsInputNumberProps(props)) {
		const { value, handlers } = useFactory<'Number'>(props);

		return (
			<NumberInput
				{...props}
				{...handlers}
				inputClass={'ee-input'}
				showStepper={false}
				value={value}
				wrapperClass={props.className}
			/>
		);
	}

	throw new Error('Unknown component is expected from the factory! Component type: ' + props._type);
}

// TODO: refactor to a separate file!

function IsSelectProps(props: Props<keyof Map>): props is Map['Select']['Component']['Props'] & { _type: 'Select' } {
	return props._type === 'Select';
}

function IsInputTextProps(props: Props<keyof Map>): props is Map['Text']['Component']['Props'] & { _type: 'Text' } {
	return props._type === 'Text';
}

function IsInputNumberProps(
	props: Props<keyof Map>
): props is Map['Number']['Component']['Props'] & { _type: 'Number' } {
	return props._type === 'Number';
}
