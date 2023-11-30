import classNames from 'classnames';
import { useCallback, useState } from 'react';

import { __ } from '@eventespresso/i18n';
import { Asterisk } from '@eventespresso/icons';
import { useDisclosure, useViewportWidthGreaterThan } from '@eventespresso/hooks';
import { RESPONSIVE_CARD_SWITCH_BREAKPOINT } from '@eventespresso/constants';

import { Button, ButtonRow, ButtonType, IconButton, Popover } from '../../';
import { Select } from '../Select';

import type { EntityStatusSelectProps } from './types';

import './styles.scss';

export const EntityStatusSelector: React.FC<EntityStatusSelectProps> = ({
	currentStatus,
	className,
	entityType,
	footerText,
	headerText,
	helpText,
	id,
	onStatusChange,
	options,
	popoverPlacement,
	tooltip,
}) => {
	const [status, setStatus] = useState(currentStatus);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const onChange = useCallback(
		(value) => {
			setStatus(value);
		},
		[setStatus]
	);

	const onSubmit = useCallback(() => {
		onStatusChange(status);
		onClose();
	}, [onClose, onStatusChange, status]);

	const isMobile = !useViewportWidthGreaterThan(RESPONSIVE_CARD_SWITCH_BREAKPOINT);
	const classes = classNames('ee-edtr-option', 'ee-edtr-option__date-status', className);

	const htmlId = id ? id : `ee-event-${entityType}-status-select`;

	const content = (
		<>
			<p>{__('Manually update the status by choosing one of the options below')}</p>
			<div className='ee-layout-row ee-layout-row--fixed'>
				<Select
					className={classes}
					fitContainer
					id={htmlId}
					onChangeValue={onChange}
					options={options}
					value={status}
					wrapperClassName={`ee-edtr-option__wrapper ee-edtr-option__${entityType}-status-wrapper`}
				/>
				{helpText}
			</div>
			<ButtonRow>
				<Button buttonText={__('Submit')} onClick={onSubmit} />
			</ButtonRow>
		</>
	);

	const header = headerText ? headerText : __('Update Entity Status');

	const placement = isMobile ? 'auto' : popoverPlacement;

	return (
		<Popover
			isLazy
			className='ee-edit-entity-selector'
			closeOnBlur={false}
			content={content}
			header={<strong>{header}</strong>}
			footer={footerText}
			isOpen={isOpen}
			onClose={onClose}
			placement={placement}
			trigger={
				<IconButton
					aria-label={headerText}
					borderless
					buttonType={ButtonType.MINIMAL}
					className={'ee-edit-entity-selector-btn'}
					color={'white'}
					icon={Asterisk}
					onClick={onOpen}
					size='small'
					tooltip={tooltip}
					transparentBg
				/>
			}
		/>
	);
};
