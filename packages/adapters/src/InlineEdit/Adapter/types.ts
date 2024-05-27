import type { Props as InlineEditProps } from '../InlineEdit/types';
import type { Props as InputProps } from '../Input/types';
import type { Legacy } from '../legacy-types';

export module Component {
	export type Props<T extends InputType> = Partial<InlineEditProps.Type<T>> & Legacy.InlineEditProps;

	type InputType = InlineEditProps.InputType;
}

export module ConvertProps {
	export type Parameters<T extends InputType> = Component.Props<T>;

	export type Return<T extends InputType> = InlineEditProps.Type<T>;

	export type InputType = InlineEditProps.InputType;

	export module InputType {
		export type Legacy = Legacy.InputType;
	}

	export type Container<T extends InputType> = Prop<T, 'container'>;

	export type Input<T extends InputType> = Prop<T, 'input'>;

	export type Preview<T extends InputType> = Prop<T, 'preview'>;

	type Prop<T extends InputType, K extends keyof Return<T>> = Return<T>[K];
}

export module ConvertInputType {
	export type Fn = (parameters: Parameters) => Return;

	type Parameters = Legacy.InputType;
	type Return = InputProps.InputType;
}

export module CreateInputProp {
	export type Parameters<T extends InputType> = AddUndefined<Pick<ConvertProps.Parameters<T>, 'input' | 'inputType'>>;

	export type Return<T extends InputType> = ConvertProps.Input<T>;

	export type InputType = InlineEditProps.InputType;

	export type LegacyProps = Legacy.InlineEditProps;

	type AddUndefined<T extends Record<any, any>> = {
		[K in keyof T]: T[K] | undefined;
	};
}
