import type { InputProps as ChakraInputProps, InputAddonProps } from '@chakra-ui/react';

import type { CommonInputProps } from '../types';

export interface TextInputProps
	extends Omit<ChakraInputProps, 'size' | 'variant'>,
		Omit<CommonInputProps<HTMLInputElement>, 'onChange'> {
	addonBefore?: React.ReactNode;
	addonAfter?: React.ReactNode;
	addonBeforeProps?: InputAddonProps;
	addonAfterProps?: InputAddonProps;
}
