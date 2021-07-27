import type { SelectProps as AdapterSelectProps } from '@eventespresso/adapters';
import type { WithDebounceProps } from '../withDebounce/types';
import type { WithLabelProps } from '../withLabel/types';

export interface SelectProps extends AdapterSelectProps, WithLabelProps {
	fitContainer?: boolean;
	flow?: 'inline';
	noBorderColor?: boolean;
}

export interface InlineSelectProps extends SelectProps, WithDebounceProps {}
