import type React from 'react';
import type { InputHTMLAttributes, SelectHTMLAttributes, AriaAttributes, HTMLAttributes } from 'react';

export type Map = {
	Select: Select;
	Input: Input;
	// number: 'NUMBER';
	// Generic: React.FunctionComponent;
};

type Select = Factory<InputHTMLAttributes<HTMLInputElement>, string>;

type Input = Factory<SelectHTMLAttributes<HTMLSelectElement>, string>;

type Factory<P extends HTMLAttributes<HTMLElement>, T extends Value> = {
	Props: Component.Props<T> & P;
	Hook: {
		Props: Hook.Props<T>;
		Type: Hook.Type<T>;
	};
};

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

module Component {
	export type Props<T extends Value> = AriaLabel & {
		name: string;
		// getValue: () => T;
		// setValue: (value: T) => void;
		// children?: ((props: Record<any, any>) => React.ReactNode) | React.ReactNode;
		// component?: React.ComponentType | 'input' | 'select' | 'textarea';
		// disabled?: boolean;
	};
}

type Value = string | number | boolean;

type AriaLabel = Required<Pick<AriaAttributes, 'aria-label'>>;
