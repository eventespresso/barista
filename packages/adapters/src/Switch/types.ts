import type { SwitchProps as ChakraSwitchProps } from '@chakra-ui/react';
import type { CommonInputProps } from '../types';

export interface SwitchProps extends ChakraSwitchProps, CommonInputProps<HTMLInputElement, boolean> {}
