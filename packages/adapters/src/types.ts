import type {
	CheckboxGroupProps as ChakraCheckboxGroupProps,
	FlexProps as ChakraFlexProps,
	InputProps as ChakraInputProps,
	NumberInputProps as ChakraNumberInputProps,
	PseudoBoxProps as ChakraPseudoBoxProps,
} from '@chakra-ui/react';

export type CommonInputEvent<T = Element> = React.ChangeEvent<T> | React.FormEvent<T>;

export interface CommonInputProps<T = Element, V = React.ReactText | boolean> {
	// eslint-disable-next-line no-unused-vars
	onChangeValue?: (value: V, event?: CommonInputEvent<T>) => void;
}

export interface CheckboxGroupProps extends ChakraCheckboxGroupProps {}

export interface NumberInputProps extends ChakraNumberInputProps {
	inputFieldProps?: ChakraInputProps;
	inputStepperProps?: ChakraFlexProps;
	showStepper?: boolean;
	incrementStepperProps?: ChakraPseudoBoxProps;
	decrementStepperProps?: ChakraPseudoBoxProps;
}
