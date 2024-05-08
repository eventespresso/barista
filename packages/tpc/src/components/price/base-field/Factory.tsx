import css from 'classnames';

import { Select, TextInput, NumberInput } from '@eventespresso/ui-components';

import { IsPropsType, useFactory } from '.';

import type { Type } from '.';

type Key = Type.Factory.Key; // alias
type Props<K extends Key> = Type.Factory.Component.Props<K>;

export function Factory<K extends Key>(props: Props<K>) {
	const className = css(props.className, 'ee-input');

	if (IsPropsType.Component.Select(props)) {
		const { value, handlers } = useFactory<'Select'>(props);

		return (
			<Select {...props} {...handlers} value={value} className={className} fitContainer>
				{props.children}
			</Select>
		);
	}

	if (IsPropsType.Component.Input.Text(props)) {
		const { value, handlers } = useFactory<'Text'>(props);

		return <TextInput {...props} {...handlers} className={className} isDisabled={props.disabled} value={value} />;
	}

	if (IsPropsType.Component.Input.Number(props)) {
		const { value, handlers } = useFactory<'Number'>(props);
		props.max;

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
