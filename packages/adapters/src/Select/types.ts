import type { SelectProps as ChakraSelectProps } from '@chakra-ui/react';

import type { CommonInputProps } from '../types';

export interface OptionProps<T extends React.ReactText = React.ReactText> {
	label?: React.ReactNode;
	options?: Array<Omit<OptionProps, 'options'>>; // for optgroup
	value?: T;
	[key: string]: any;
}

export type OptionsType<T extends React.ReactText = React.ReactText> = Array<OptionProps<T>>;

export interface SelectProps extends ChakraSelectProps, Omit<CommonInputProps<HTMLInputElement>, 'onChange'> {
	options?: OptionsType;
}
