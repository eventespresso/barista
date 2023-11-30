import { useMemo } from 'react';

import { __ } from '@eventespresso/i18n';
import { datetimeStatusCodesMap, userSelectableDatetimeStatusOptions } from '@eventespresso/constants';
import { useDisclosure } from '@eventespresso/hooks';
import { HelpOutlined } from '@eventespresso/icons';
import { EntityStatusSelector, IconButton, Popover } from '@eventespresso/ui-components';
import { objectToSelectOptions } from '@eventespresso/utils';
import { getDatetimeStatusTextLabel } from '@eventespresso/helpers';

import type { InlineEditProps } from '@eventespresso/adapters';
import type { Datetime } from '@eventespresso/edtr-services';

interface Props {
	date: Datetime;
	onStatusChange: InlineEditProps['onChange'];
}

export const DatetimeStatus: React.FC<Props> = ({ date, onStatusChange }) => {
	const statusText = getDatetimeStatusTextLabel(date);
	const { isOpen, onClose, onToggle } = useDisclosure();

	const options = useMemo(() => {
		const options = objectToSelectOptions(userSelectableDatetimeStatusOptions, true);
		// replace empty option with CC: "Calendar Controlled" option
		options[0] = { value: 'CC', label: __('Calendar Controlled') };
		return options;
	}, []);

	let currentStatus = datetimeStatusCodesMap[date.status];
	// for the sake of the status selector, we want to use "CC" (Calendar Controlled) for all upcoming, active, and expired dates
	if (currentStatus === 'DTU' || currentStatus === 'DTA' || currentStatus === 'DTE') {
		currentStatus = 'CC';
	}

	const legend = (
		<ul className='ee-edtr-option__footer-list'>
			<li className='ee-edtr-option__footer-list-item'>
				<strong>{__('Calendar Controlled:')}</strong>
				<br />
				<span>
					{__(
						'Event Date status will be determined by comparing the current date aginst when the event date starts and ends to decide whether the event date is upcoming, active, or expired.'
					)}
				</span>
			</li>
			<li className='ee-edtr-option__footer-list-item'>
				<strong>{__('Cancelled:')}</strong>
				<br />
				<span>{__('Event Date has been cancelled.')}</span>
			</li>
			<li className='ee-edtr-option__footer-list-item'>
				<strong>{__('Postponed:')}</strong>
				<br />
				<span>
					{__(
						'Event Date is postponed until a later date (kind of like cancelled combined with "to be determined.'
					)}
				</span>
			</li>
			<li className='ee-edtr-option__footer-list-item'>
				<strong>{__('Sold Out:')}</strong>
				<br />
				<span>{__('Event Date has no more available spaces, no further tickets can be purchased.')}</span>
			</li>
			<li className='ee-edtr-option__footer-list-item'>
				<strong>{__('To Be Determined:')}</strong>
				<br />
				<span>{__('Event Date has not been decided upon yet.')}</span>
			</li>
		</ul>
	);

	const helpText = (
		<>
			<IconButton
				borderless
				className='ee-entity-status__help-button'
				icon={HelpOutlined}
				onClick={onToggle}
				tooltip={__('click for status information')}
			/>
			<Popover
				isLazy
				content={legend}
				header={<strong>{__('Event Date Status Options:')}</strong>}
				isOpen={isOpen}
				onClose={onClose}
			/>
		</>
	);

	return (
		<div className='ee-entity-status__label'>
			<span className='ee-entity-status__text'>{statusText}</span>
			<EntityStatusSelector
				currentStatus={currentStatus}
				entityType='date'
				headerText={__('Update Event Date Status')}
				helpText={helpText}
				id={`ee-event-date-status-select-${date.dbId}`}
				onStatusChange={onStatusChange}
				options={options}
				popoverPlacement={'auto'}
			/>
		</div>
	);
};
