import type React from 'react';
import type { Size } from '../../';
import type {
	ButtonProps as ButtonAdapterProps,
	ButtonGroupProps as ButtonGroupAdapterProps,
} from '@eventespresso/adapters';

export type ClickHandler = (click?: React.MouseEvent<HTMLElement>) => void;

export enum ButtonType {
	ACCENT = 'accent',
	DEFAULT = 'default',
	MINIMAL = 'minimal',
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
}

export interface ButtonProps extends Omit<ButtonAdapterProps, 'size'>, Size {
	active?: boolean;
	buttonType?: ButtonType | 'accent' | 'default' | 'minimal' | 'primary' | 'secondary';
	className?: string;
	noMargin?: boolean;
	noHorizontalMargin?: boolean;
	noVerticalMargin?: boolean;
	onClick?: React.MouseEventHandler;
	onKeyPress?: React.KeyboardEventHandler;
}
export interface ButtonGroupProps extends Omit<ButtonGroupAdapterProps, 'size'>, Size {}

export interface LinkProps extends Omit<ButtonAdapterProps, 'icon'> {
	target?: '_blank' | '_parent' | '_self' | '_top';
	className?: string;
	href: string;
	icon?: React.ReactNode;
}
