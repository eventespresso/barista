import type * as Chakra from '@chakra-ui/react';

import type { CommonInputProps } from '../types';

type CharaProps = Pick<
	Chakra.NumberInputProps,
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
>;

export interface NumberInputProps extends CharaProps, CommonInputProps<HTMLInputElement> {
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
