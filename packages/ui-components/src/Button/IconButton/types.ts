import type { Size } from '../../../';
import type { ButtonProps } from '../types';
import type { IconButtonProps as IconButtonAdapterProps } from '@eventespresso/adapters';

export interface IconButtonProps extends Size, Omit<IconButtonAdapterProps, 'aria-label' | 'size'> {
	active?: boolean;
	'aria-label'?: string;
	borderless?: boolean;
	buttonType?: ButtonProps['buttonType'];
	color?: 'white' | 'black';
	noMargin?: boolean;
	noPadding?: boolean;
	transparentBg?: boolean;
}
