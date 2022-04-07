import type {
	FlexProps as ChakraFlexProps,
	InputProps as ChakraInputProps,
	NumberInputProps as ChakraNumberInputProps,
	BoxProps as ChakraBoxProps,
} from '@chakra-ui/react';

import type { CommonInputProps } from '../types';

type Picked =
	| 'aria-valuenow'
	| 'clampValueOnBlur'
	| 'className'
	| 'defaultValue'
	| 'id'
	| 'isDisabled'
	| 'keepWithinRange'
	| 'max'
	| 'min'
	| 'onChange'
	| 'precision'
	| 'step'
	| 'value';

export interface NumberInputProps extends Pick<ChakraNumberInputProps, Picked>, CommonInputProps<HTMLInputElement> {
	decrementStepperProps?: ChakraBoxProps;
	inputFieldProps?: ChakraInputProps;
	inputStepperProps?: ChakraFlexProps;
	incrementStepperProps?: ChakraBoxProps;
	name?: string;
	placeholder?: string;
	showStepper?: boolean;
	wrapperClass?: string;
}
