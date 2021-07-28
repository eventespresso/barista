import { useCallback } from 'react';
import classNames from 'classnames';

import { __ } from '@eventespresso/i18n';
import { isEnterKey } from '@eventespresso/utils';

import { Tooltip } from '../';

import type { TabbableTextProps } from './types';

import './style.scss';

export const TabbableText: React.FC<TabbableTextProps> = ({
	'aria-describedby': ariaDescribedby,
	children,
	className,
	icon,
	onClick,
	...props
}) => {
	const tooltip = props.tooltip || __('Click to edit…');
	const text = props.text || children || tooltip;
	const isDisabled = text === tooltip;
	const role = props.isDisabled ? null : 'button';
	const tabIndex = props.isDisabled ? -1 : 0;

	const textClassName = classNames(
		'ee-tabbable-text',
		!props.text && 'ee-tabbable-text--no-text',
		isDisabled && 'ee-tabbable-text--is-disabled',
		className
	);

	const onKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (isEnterKey(e)) {
				e.preventDefault();
				onClick();
			}
		},
		[onClick]
	);

	return (
		<Tooltip isDisabled={isDisabled} tooltip={tooltip}>
			<div
				aria-describedby={ariaDescribedby}
				aria-label={props.tooltip}
				className={textClassName}
				data-testid={props?.['data-testid']}
				onClick={props.isDisabled ? null : onClick}
				onKeyDown={onKeyDown}
				role={role}
				tabIndex={tabIndex}
			>
				<span className={'ee-tabbable-text__inner_wrapper'}>{text}</span>
				{icon}
			</div>
		</Tooltip>
	);
};

export default TabbableText;
