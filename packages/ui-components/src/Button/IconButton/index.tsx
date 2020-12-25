import { forwardRef } from 'react';
import classNames from 'classnames';

import { IconButton as IconButtonAdapter } from '@eventespresso/adapters';
import { ButtonType } from '../types';
import { withLabel } from '../../withLabel';
import { withTooltip } from '../../withTooltip';
import type { IconButtonProps } from './types';

import './style.scss';

export const iconBtnClassName = 'ee-btn-base ee-icon-button';

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	(
		{
			borderless,
			buttonType = ButtonType.DEFAULT,
			color,
			icon,
			noMargin,
			onClick,
			size = 'default',
			transparentBg,
			...props
		},
		ref
	) => {
		const ariaLabel = props['aria-label'];
		const className = classNames(
			iconBtnClassName,
			color && `ee-icon-button-color--${color}`,
			borderless && 'ee-icon-button--borderless',
			buttonType !== ButtonType.DEFAULT && [`ee-btn--${buttonType}`],
			noMargin && 'ee-icon-button--no-margin',
			transparentBg && 'ee-icon-button--transparent-bg',
			size !== 'default' && [`ee-btn--${size}`],
			props.className
		);

		return (
			<IconButtonAdapter
				{...props}
				aria-label={ariaLabel}
				className={className}
				icon={icon}
				onClick={onClick}
				tabIndex={0}
				ref={ref}
			/>
		);
	}
);

export default withLabel(withTooltip(IconButton));
