import type * as Chakra from '@chakra-ui/react';

import type { CommonInputProps } from '../types';

type ChakraProps = Pick<
	Chakra.NumberInputProps,
	| 'aria-label'
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
	| 'value'
	| 'onBlur'
	| 'onFocus'
>;

export interface NumberInputProps extends ChakraProps, CommonInputProps<HTMLInputElement> {
	decrementStepperProps?: Chakra.BoxProps;
	disabled?: boolean;
	incrementStepperProps?: Chakra.BoxProps;
	inputFieldProps?: Chakra.InputProps;
	inputStepperProps?: Chakra.FlexProps;
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
