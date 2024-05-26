import type React from 'react';
import type { Props as InlineEditProps } from '../InlineEdit';
import type { Props as InputProps } from '../Input';
import type { Legacy } from '../legacy-types';

export module Component {
	export type Type = React.FC<Props>;
	export type Props = InlineEditProps.Type & Legacy.InlineEditProps;
}

export module ConvertProps {
	export type Fn = (parameters: Parameters) => Return;

	type Parameters = Component.Props;
	type Return = InlineEditProps.Type;
}

export module ConvertInputType {
	export type Fn = (parameters: Parameters) => Return;

	type Parameters = Legacy.InputType;
	type Return = InputProps.InputType;
}
