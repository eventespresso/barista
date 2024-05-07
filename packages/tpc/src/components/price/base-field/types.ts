import type { InputHTMLAttributes, SelectHTMLAttributes, AriaAttributes, HTMLAttributes } from 'react';

export module Type {
	export type Return = {
		Select: Select;
		Text: InputText;
		Number: InputNumber;
	};

	type Select = Make<Attribute.Select, string>;
	type InputText = Make<Attribute.Input, string>;
	type InputNumber = Make<Attribute.Input, number>;

	type Make<A extends Attribute.Html, V extends Value> = {
		Component: {
			Props: Component.Props<A, V>;
		};
		Hook: {
			Props: Hook.Props<V>;
			Type: Hook.Type<A, V>;
		};
	};
}

module Component {
	export type Props<H extends Attribute.Html, V extends Value> = Props.Type<V> & H & AriaLabel;
}

module Hook {
	export type Props<V extends Value> = Props.Type<V>;
	export type Type<A extends Attribute.Html, V extends Value> = {
		value: V;
		handlers: {
			onBlur: A['onBlur'];
			onChange: A['onChange'];
		};
	};
}

module Attribute {
	export type Html = HTMLAttributes<Element.Html>;
	export type Input = InputHTMLAttributes<Element.Input>;
	export type Select = SelectHTMLAttributes<Element.Select>;
}

module Element {
	export type Html = HTMLElement;
	export type Input = HTMLInputElement;
	export type Select = HTMLSelectElement;
}

module Props {
	export type Type<V extends Value> = {
		name: string;
		getValue: () => V;
		setValue: (value: V) => void;
	};
}

type Value = string | number | boolean;

type AriaLabel = Required<Pick<AriaAttributes, 'aria-label'>>;
