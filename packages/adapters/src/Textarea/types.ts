import type { TextareaProps as ChakraTextareaProps } from '@chakra-ui/react';
import { CommonInputProps } from '../types';

export interface TextareaProps<T = Element>
	extends Omit<ChakraTextareaProps, 'sizes' | 'onChange'>,
	Omit<CommonInputProps<HTMLTextAreaElement, string>, 'onChange'> {
		onChange?: (event: React.ChangeEvent<T>) => void;
	}
