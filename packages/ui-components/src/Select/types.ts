import type { SelectProps as AdapterSelectProps } from '@eventespresso/adapters';
import type { Size, Width } from '../types';

export interface SelectProps extends Omit<AdapterSelectProps, 'size' | 'width'>, Size, Width {
	fitContainer?: boolean;
	flow?: 'inline';
	noBorderColor?: boolean;
	wrapperClassName?: string;
}
