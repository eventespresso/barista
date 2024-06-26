import type { NumberProps, SelectProps, TextInputWithLabelProps } from '@eventespresso/ui-components';
import type { InputHTMLAttributes, SelectHTMLAttributes, AriaAttributes, HTMLAttributes } from 'react';

export module Type {
	export module Factory {
		export type Key = Inputs.Key; // alias

		export module Component {
			export type Props<K extends Key> = Inputs.Map[K]['Component']['Props'] & {
				_type: K; // underscore to avoid collission with html attribute
			};

			// LATER: skip type 'Type' for now
		}

		module Inputs {
			export type Key = keyof Map;
			export type Map = {
				Select: Select;
				Text: InputText;
				Number: InputNumber;
			};
		}
	}

	type Select = Make<SelectProps>;
	type InputText = Make<TextInputWithLabelProps>;
	type InputNumber = Make<NumberProps>;

	type Make<A extends object> = {
		Component: {
			Props: Component.Props<A>;
		};
	};
}

module Component {
	export type Props<H extends Attribute.Html> = H &
		AriaLabel & {
			name: string;
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

type AriaLabel = Pick<AriaAttributes, 'aria-label'>;
