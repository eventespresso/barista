import type * as Chakra from '@chakra-ui/react';
import type { Factory as InputProps } from '../Input';
import type { Factory as PreviewProps } from '../Preview';

export module Props {
	export type Type<T extends InputProps.InputType> = {
		container: ChakraProps;
		preview: InputProps.Type<T>;
		input: PreviewProps.Props;
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
