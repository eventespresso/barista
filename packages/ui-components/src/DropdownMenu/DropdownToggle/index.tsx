import { useMemo, forwardRef } from 'react';
import classNames from 'classnames';

import { MenuToggle } from '@eventespresso/adapters';
import { Menu } from '@eventespresso/icons';
import { sprintf } from '@eventespresso/i18n';

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

		const ariaLabel: string = useMemo(() => {
			/* translators: open <tooltip> */
			return sprintf('open %s', tooltip);
		}, [tooltip]);

		return (
			<MenuToggle aria-label={ariaLabel} as='div' className={className} ref={ref}>
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
