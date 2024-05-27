import type { NumberProps, SelectProps, TextInputWithLabelProps } from '@eventespresso/ui-components';
import type { InputHTMLAttributes, SelectHTMLAttributes, AriaAttributes, HTMLAttributes } from 'react';

export module Type {
	export module Factory {
		export type Key = Type.Inputs.Key; // alias

		export module Component {
			export type Props<K extends Key> = Type.Inputs.Map[K]['Component']['Props'] & {
				_type: K; // underscore to avoid collission with html attribute
			};

			// LATER: skip type 'Type' for now
		}

		export module Hook {
			export type Props<K extends Key> = Type.Inputs.Map[K]['Hook']['Props'] & {
				_type: K; // internal prop hence underscore
			};

			export type Type<K extends Key> = Type.Inputs.Map[K]['Hook']['Type'];
		}
	}

	export module Inputs {
		export type Key = keyof Map;
		export type Map = {
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
			Props: Component.Props<A>;
		};
		Hook: {
			Props: Hook.Props;
			Type: Hook.Type<A, V>;
		};
	};
}

module Component {
	export type Props<H extends Attribute.Html> = Props.Type & H & AriaLabel;
}

module Hook {
	export type Props = Props.Type;
	export type Type<A extends Attribute.Html, V extends Value> = {
		name: Name;
		value: V;
		handlers: {
			onChange: A['onChange'];
			onBlur?: A['onBlur'];
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

export module Props {
	export type Type = {
		name: Name;
	};
}

type Name = string;

type Value = string | number | boolean;

type AriaLabel = Required<Pick<AriaAttributes, 'aria-label'>>;
