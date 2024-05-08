import type { NumberProps, SelectProps, TextInputWithLabelProps } from '@eventespresso/ui-components';
import type { InputHTMLAttributes, SelectHTMLAttributes, AriaAttributes, HTMLAttributes } from 'react';

export module Type {
	export module Factory {
		export type Key = Type.Props.Key;

		export module Component {
			export type Props<K extends Key> = Type.Props.Type[K]['Component']['Props'] & {
				_type: K; // underscore to avoid collission with html attribute
			};

			// LATER: skip type 'Type' for now
		}

		export module Hook {
			export type Props<K extends Key> = Type.Props.Type[K]['Hook']['Type'] & {
				_type: K; // internal prop hence underscore
			};

			export type Type<K extends Key> = Type.Props.Type[K]['Hook']['Type'];
		}
	}

	export module Props {
		export type Key = keyof Type;
		export type Type = {
			Select: Select;
			Text: InputText;
			Number: InputNumber;
		};
	}

	type Select = Make<SelectProps, string>;
	type InputText = Make<TextInputWithLabelProps, string>;
	type InputNumber = Make<NumberProps, number>;

	type Make<A extends object, V extends Value> = {
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
