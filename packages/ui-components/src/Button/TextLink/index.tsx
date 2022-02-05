import { forwardRef } from 'react';
import classNames from 'classnames';
import { External } from '@eventespresso/icons';

import { withTooltip } from '../../withTooltip';
import type { TextLinkProps } from '../types';

import '../style.scss';
import './style.scss';

const PlainLink = forwardRef<HTMLAnchorElement, TextLinkProps>(
	({ children, href, icon, showExternalIcon, target = '_blank', ...props }, ref) => {
		const className = classNames(
			props.className,
			'ee-btn-base',
			'ee-link',
			icon && 'ee-icon-button',
			typeof children === 'string' && 'ee-link--no-icon'
		);

		const external = showExternalIcon && <External />;

		return (
			<a
				aria-label={props['aria-label']}
				className={className}
				href={href}
				rel='noopener noreferrer'
				target={target}
				ref={ref}
			>
				{icon ? icon : children}
				{external}
			</a>
		);
	}
);

export const TextLink = withTooltip(PlainLink);
