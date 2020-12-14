import type { MenuProps, MenuItemProps, MenuToggleProps, MenuListProps } from '@eventespresso/adapters';
import type { IconName } from '@eventespresso/icons';
import type { IconButton } from '../Button';
import type { WithTooltipProps } from '../withTooltip';

export interface DropdownMenuProps extends Omit<MenuProps, 'isOpen'> {
	className?: string;
	menuListProps?: MenuListProps;
	toggleProps?: DropdownToggleProps;
}

export interface DropdownMenuItemProps extends MenuItemProps {
	icon?: React.ComponentType<any>;
	title?: string;
}

export interface DropdownToggleProps
	extends MenuToggleProps,
		Pick<React.ComponentProps<typeof IconButton>, keyof WithTooltipProps> {
	borderless?: boolean;
	icon?: IconName;
	isOpen?: boolean;
	onClose?: VoidFunction;
}
