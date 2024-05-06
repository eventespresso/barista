import type React from 'react';
import { createElement } from 'react';
import type { Attributes, Map } from './types-refactored';

type Props<K extends keyof Map> = Map[K]['Props'] & {
	_type: K;
};

type C<T extends {}> = React.FunctionComponent<T>;

export function Factory<K extends keyof Map | undefined>(args?: Props<K>) {
	if (!args) return createElement('input'); // TODO: just example

	const { _type, getValue, setValue, ...props } = args;

	if (isInput(_type, props)) return input(props);

	if (isSelect(_type, props)) return select(props);
}

function isInput(arg1: any, arg2: any): arg2 is Attributes.Input {
	return arg1 === 'Input';
}

function isSelect(arg1: any, arg2: any): arg2 is Attributes.Select {
	return arg1 === 'Select';
}

const input: C<Attributes.Input> = (props) => {
	return <input {...props} />;
};

const select: C<Attributes.Select> = (props) => {
	return <select {...props} />;
};
