import type React from 'react';
import type * as Chakra from '@chakra-ui/react';
import type { Props as PreviewProps } from '../Preview';
import type { Factory as InputProps } from '../Input';
import type { Legacy } from '../legacy-types';

export module Props {
	export type Type<T extends InputProps.InputType> = {
		container: Container;
		preview: PreviewProps;
		input: InputProps.Type<T>;
	};

	export type InputType = InputProps.InputType;

	type Container = ChakraProps;

	// TODO: move to Preview
	type PreviewProps = PreviewProps.Type & {
		Component?: React.FunctionComponent<PreviewProps.Type>;
		Legacy?: React.ComponentType<Legacy.InlineEditPreviewProps>;
	};
}

export type Value = NoUndefined<ChakraProps['value']>;

export module Event {
	export type OnSubmit = NoUndefined<ChakraProps['onSubmit']>;
	export type OnChange = NoUndefined<ChakraProps['onChange']>;
}

type ChakraProps = Chakra.EditableProps;
type NoUndefined<T extends any> = Exclude<T, undefined>;
