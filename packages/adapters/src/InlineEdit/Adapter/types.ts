import type { Props as InlineEditProps } from '../InlineEdit/types';
import type { Props as InputProps } from '../Input/types';
import type { Legacy } from '../legacy-types';

export module Component {
	export type Props<T extends InlineEditProps.InputType> = InlineEditProps.Type<T> & Legacy.InlineEditProps;
}

export module ConvertProps {
	export type Parameters<T extends InlineEditProps.InputType> = Component.Props<T>;

	export type Return<T extends InlineEditProps.InputType> = InlineEditProps.Type<T>;
}

export module ConvertInputType {
	export type Fn = (parameters: Parameters) => Return;

	type Parameters = Legacy.InputType;
	type Return = InputProps.InputType;
}
