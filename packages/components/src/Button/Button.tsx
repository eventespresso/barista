import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { Button as ButtonAdapter } from '@eventespresso/adapters';
import { ButtonType } from './types';
import { withLabel } from '../withLabel';
import { withTooltip } from '../withTooltip';
import type { ButtonProps } from './types';

import './style.scss';

type BtnType = React.ComponentType<ButtonProps>;

/**
 * Button wrapper for adding styles
 *
 * forwardRef to be able to accept
 * onMouseEnter, onMouseLeave, onFocus, onClick events from parent
 */
const Button = forwardRef<typeof ButtonAdapter, ButtonProps>(
	(
		{
			active,
			buttonText,
			buttonType = ButtonType.DEFAULT,
			icon,
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
			noMargin && 'ee-btn--no-margin',
			noHorizontalMargin && 'ee-btn--no-horizontal-margin',
			noVerticalMargin && 'ee-btn--no-vertical-margin',
			size !== 'default' && [`ee-btn--${size}`],
			props.className
		);

		return (
			<ButtonAdapter
				{...props}
				buttonText={buttonText}
				className={className}
				icon={icon}
				onClick={onClick}
				ref={ref}
				tabIndex={0}
			/>
		);
	}
);

// Since withLabel and withTooltip accept only a component type
// Lets cast it
export default withLabel(withTooltip(Button as BtnType) as BtnType);
