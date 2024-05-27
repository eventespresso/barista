import type * as Chakra from '@chakra-ui/react';
import type { Factory as InputProps } from '../Input/types';
import type { Props as PreviewProps } from '../Preview/types';

export module Props {
	export type Type<T extends InputProps.InputType> = {
		container: ChakraProps;
		input: InputProps.Type<T>;
		preview: PreviewProps.Factory;
	};

	export type InputType = InputProps.InputType;
}

export type Value = NoUndefined<ChakraProps['value']>;

export module Event {
	export type OnSubmit = NoUndefined<ChakraProps['onSubmit']>;
	export type OnChange = NoUndefined<ChakraProps['onChange']>;
}

type ChakraProps = Chakra.EditableProps;
type NoUndefined<T extends any> = Exclude<T, undefined>;
