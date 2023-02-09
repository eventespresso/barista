import classNames from 'classnames';

import { MenuItem } from '@eventespresso/adapters';
import type { DropdownMenuItemProps } from './types';

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
	children,
	icon: Icon,
	isDisabled,
	onClick,
	title,
	...props
}) => {
	const className = classNames('ee-dropdown-menu__item', `${props.className}--menu-item`);

	return (
		<MenuItem
			{...props}
			isDisabled={isDisabled}
			onClick={isDisabled ? null : onClick}
			className={className}
			role='menuitem'
		>
			{Icon && <Icon />}
			<span>{children || title}</span>
		</MenuItem>
	);
};
