import type { MenuProps, MenuItemProps, MenuToggleProps, MenuListProps } from '@eventespresso/adapters';
import type { AriaAttributes } from 'react';
import type { Size } from '../../';
import type { IconButton, IconButtonProps } from '../Button';
import type { WithTooltipProps } from '../withTooltip';

export interface DropdownMenuProps extends Omit<MenuProps, 'isOpen'> {
	className?: string;
	wrapperClassName?: string;
	menuListProps?: MenuListProps;
	noZindex?: boolean;
	toggleProps?: DropdownToggleProps;
}

export interface DropdownMenuItemProps extends Omit<MenuItemProps, 'icon'>, AriaAttributes {
	icon?: React.ComponentType<any>;
	title?: string;
}

export interface DropdownToggleProps
	extends Size,
		MenuToggleProps,
		Pick<IconButtonProps, 'noPadding'>,
		Pick<React.ComponentProps<typeof IconButton>, keyof WithTooltipProps> {
	borderless?: boolean;
	icon?: React.ComponentType<any>;
	isOpen?: boolean;
	noPadding?: boolean;
	onClose?: VoidFunction;
}
