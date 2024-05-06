/* eslint-disable */

import type React from 'react';
import type { InputHTMLAttributes, SelectHTMLAttributes, AriaAttributes, HTMLAttributes } from 'react';

export module Attributes {
	export type Input = InputHTMLAttributes<HTMLInputElement>;
	export type Select = SelectHTMLAttributes<HTMLSelectElement>;
}

export type Map = {
	Select: Select;
	Input: Input;
	// number: 'NUMBER';
	// Generic: React.FunctionComponent;
};

type Select = Factory<SelectHTMLAttributes<HTMLSelectElement>, string>;

type Input = Factory<InputHTMLAttributes<HTMLInputElement>, string>;

type Factory<P extends HTMLAttributes<HTMLElement>, T extends Value> = {
	Props: Component.Props<T> & P;
	Hook: {
		Props: Hook.Props<T>;
		Type: Hook.Type<T>;
	};
};

module Component {
	export type Props<T extends Value> = AriaLabel & {
		name: string;
		getValue?: () => T; // TODO: make required!!
		setValue?: (value: T) => void; // TODO: make required!!
	};
}

module Hook {
	export type Props<T extends Value> = Omit<Component.Props<T>, 'aria-label'>;
	export type Type<T extends Value> = {
		value: T;
		handlers: {
			onBlur: HTMLElement['onblur'];
			onChange: HTMLElement['onchange'];
		};
	};
}

type Value = string | number | boolean;

type AriaLabel = Required<Pick<AriaAttributes, 'aria-label'>>;
