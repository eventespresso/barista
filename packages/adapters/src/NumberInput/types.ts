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
	| 'precision'
	| 'step'
	| 'value';

export interface NumberInputProps extends Pick<ChakraNumberInputProps, Picked>, CommonInputProps<HTMLInputElement> {
	decrementStepperProps?: ChakraBoxProps;
	disabled?: boolean;
	incrementStepperProps?: ChakraBoxProps;
	inputFieldProps?: ChakraInputProps;
	inputStepperProps?: ChakraFlexProps;
	name?: string;
	/**
	 * The pattern used to check the <input> element's value against on form submission.
	 *
	 * @default "[0-9]*(.[0-9]+)?"
	 */
	pattern?: string;
	placeholder?: string;
	showStepper?: boolean;
	wrapperClass?: string;
}
