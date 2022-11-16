import { forwardRef } from 'react';
import classNames from 'classnames';

import { MenuToggle } from '@eventespresso/adapters';
import { Menu } from '@eventespresso/icons';

import { IconButton } from '../../';
import type { DropdownToggleProps } from '../types';
import './styles.scss';

export const DropdownToggle = forwardRef<HTMLButtonElement, DropdownToggleProps>(
	({ borderless = true, icon = Menu, isOpen, noPadding, size, tooltip, ...props }, ref) => {
		const className = classNames(
			'ee-dropdown-menu__toggle',
			isOpen && 'ee-dropdown-menu__toggle--open',
			noPadding && 'ee-dropdown-menu__toggle--no-padding',
			borderless && 'ee-icon-button--borderless',
			props.className
		);

		return (
			<MenuToggle aria-label={tooltip} as='div' className={className} ref={ref}>
				<IconButton
					borderless
					data-testid={props['data-testid']}
					icon={icon}
					noMargin
					size={size}
					tooltip={tooltip}
				/>
			</MenuToggle>
		);
	}
);
