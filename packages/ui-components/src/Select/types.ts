import type { SelectProps as AdapterSelectProps } from '@eventespresso/adapters';

export interface SelectProps extends AdapterSelectProps {
	fitContainer?: boolean;
	flow?: 'inline';
	noBorderColor?: boolean;
}
