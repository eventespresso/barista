import { useRef } from 'react';
import classNames from 'classnames';

import { InfoCircleOutlined } from '@eventespresso/icons';
import { useDisclosure, useOnClickOutside } from '@eventespresso/hooks';

import { Tooltip } from '../../';

import './style.scss';

interface ClickableIconWithTooltipProps {
	className?: string;
	icon: typeof InfoCircleOutlined;
	tooltipText: string;
}

export const ClickableIconWithTooltip: React.FC<ClickableIconWithTooltipProps> = ({
	icon: Icon,
	tooltipText,
	...props
}) => {
	const { isOpen, onClose, onToggle } = useDisclosure();
	const wrapperRef = useRef(null);
	const className = classNames('ee-clickable-tooltip', props.className);

	const icon = <Icon className={className} onClick={onToggle} size='small' />;

	useOnClickOutside(wrapperRef.current, onClose);

	return (
		<div className='ee-clickable-tooltip__wrapper' ref={wrapperRef}>
			<Tooltip isOpen={isOpen} shouldWrapChildren tooltip={tooltipText}>
				{icon}
			</Tooltip>
		</div>
	);
};
