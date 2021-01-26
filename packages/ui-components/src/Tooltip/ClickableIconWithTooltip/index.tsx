import { useRef } from 'react';
import classNames from 'classnames';

import { InfoCircleOutlined } from '@eventespresso/icons';
import { Clickable } from '@eventespresso/adapters';
import { useDisclosure, useOnClickOutside } from '@eventespresso/hooks';

import { Tooltip } from '../../';

import './style.scss';

interface ClickableIconWithTooltipProps {
	className?: string;
	icon: typeof InfoCircleOutlined;
	id: string;
	tooltipText: string;
}

export const ClickableIconWithTooltip: React.FC<ClickableIconWithTooltipProps> = ({
	icon: Icon,
	id,
	tooltipText,
	...props
}) => {
	const { isOpen, onClose, onToggle } = useDisclosure();
	const wrapperRef = useRef(null);
	const className = classNames('ee-clickable-tooltip', props.className);

	const icon = <Icon className={className} size='small' />;

	useOnClickOutside(wrapperRef.current, onClose);

	return (
		<div className='ee-clickable-tooltip__wrapper' ref={wrapperRef} role='tooltip'>
			<Tooltip isOpen={isOpen} tooltip={tooltipText}>
				<Clickable as='span' id={id} onClick={onToggle}>
					{icon}
				</Clickable>
			</Tooltip>
		</div>
	);
};
