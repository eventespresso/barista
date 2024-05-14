import css from 'classnames';

import { Select, TextInput, NumberInput } from '@eventespresso/ui-components';

import { IsPropsType } from '.';

import type { Type } from '.';

type Key = Type.Factory.Key; // alias
type Props<K extends Key> = Type.Factory.Component.Props<K>;

export function Factory<K extends Key>(props: Props<K>) {
	const className = css(props.className, 'ee-input');

	if (IsPropsType.Component.Select(props)) {
		const { _type: ignore, children, ...selectProps } = props;

		return (
			<Select {...selectProps} className={className} fitContainer>
				{children}
			</Select>
		);
	}

	if (IsPropsType.Component.Input.Text(props)) {
		const { _type: ignore, disabled, ...inputProps } = props;

		return <TextInput {...inputProps} className={className} isDisabled={disabled} />;
	}

	if (IsPropsType.Component.Input.Number(props)) {
		const { _type: ignore, className, ...inputProps } = props;

		return <NumberInput {...inputProps} inputClass='ee-input' showStepper={false} wrapperClass={className} />;
	}

	throw new Error('Unknown component is expected from the factory! Component type: ' + props._type);
}
