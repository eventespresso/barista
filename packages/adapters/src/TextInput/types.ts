import type { InputProps as ChakraInputProps } from '@chakra-ui/input';

import type { CommonInputProps } from '../types';

export interface TextInputProps extends ChakraInputProps, CommonInputProps<HTMLInputElement> {}
