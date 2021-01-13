import { forwardRef } from 'react';
import classNames from 'classnames';

import { Button as ButtonAdapter } from '@eventespresso/adapters';
import { ButtonType } from './types';
import { withLabel } from '../withLabel';
import { withTooltip } from '../withTooltip';
import type { ButtonProps } from './types';

import './style.scss';

/**
 * Button wrapper for adding styles
 *
 * forwardRef to be able to accept
 * onMouseEnter, onMouseLeave, onFocus, onClick events from parent
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			active,
			buttonText,
			buttonType = ButtonType.DEFAULT,
			icon,
			noBoxShadow,
			noMargin,
			noHorizontalMargin,
			noVerticalMargin,
			onClick,
			size = 'default',
			...props
		},
		ref
	) => {
		const hasIconClassName = (props.leftIcon || props.rightIcon || icon) && 'ee-btn--has-icon';

		const className = classNames(
			'ee-btn-base ee-btn',
			active && 'ee-btn--is-active',
			buttonType !== ButtonType.DEFAULT && [`ee-btn--${buttonType}`],
			hasIconClassName,
			!icon && 'ee-noIcon',
			noBoxShadow && 'ee-btn--no-box-shadow',
			noMargin && 'ee-btn--no-margin',
			noHorizontalMargin && 'ee-btn--no-horizontal-margin',
			noVerticalMargin && 'ee-btn--no-vertical-margin',
			size !== 'default' && [`ee-btn--${size}`],
			props.className
		);

		return (
			<ButtonAdapter
				tabIndex={0}
				{...props}
				buttonText={buttonText}
				className={className}
				icon={icon}
				onClick={onClick}
				ref={ref}
			/>
		);
	}
);

export default withLabel(withTooltip(Button));
