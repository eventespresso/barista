import { useMemo } from 'react';

import { IsPropsType } from '.';

import type { Type } from '.';

type Key = Type.Factory.Key; // alias
type Props<K extends Key> = Type.Factory.Hook.Props<K>;
type Type<K extends Key> = Type.Factory.Hook.Type<K>;

export function useFactory<K extends Key>(props: Props<K>): Type<K> {
	if (props._type === 'Select') {
		const v = (props as Props<'Select'>).getValue();
	}

	if (IsPropsType.Hook.Select(props)) {
		return Select(props);
	}

	if (IsPropsType.Hook.Input.Text(props)) {
		return InputText(props);
	}

	if (IsPropsType.Hook.Input.Number(props)) {
		return InputNumber(props);
	}

	throw new Error('TODO:');
}

function Select(props: Props<'Select'>): Type<'Select'> {
	const { name, getValue: get, setValue: set } = props;
	const value = get();

	const handlers: Type<'Select'>['handlers'] = {
		onBlur: (e) => {},
		onChange: (e) => {},
	};

	return useMemo(() => {
		return {
			name,
			value,
			handlers,
		};
	}, [name, value, get, set]);
}

function InputText(props: Props<'Text'>): Type<'Text'> {
	const { name, getValue: get, setValue: set } = props;
	const value = get();

	const handlers: Type<'Text'>['handlers'] = {
		onBlur: (e) => {},
		onChange: (e) => {},
	};

	return useMemo(() => {
		return {
			name,
			value,
			handlers,
		};
	}, [name, value, get, set]);
}

function InputNumber(props: Props<'Number'>): Type<'Number'> {
	const { name, getValue: get, setValue: set } = props;
	const value = get();

	const handlers: Type<'Number'>['handlers'] = {
		onChange: (e) => {},
	};

	return useMemo(() => {
		return {
			name,
			value,
			handlers,
		};
	}, [name, value, get, set]);
}
