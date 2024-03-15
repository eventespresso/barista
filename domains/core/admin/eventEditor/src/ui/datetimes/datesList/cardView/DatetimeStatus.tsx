import { useCallback, useMemo } from 'react';

import { __ } from '@eventespresso/i18n';
import { DATETIME_STATUS, DATETIME_STATUS_CODES, USER_SELECTABLE_DATETIME_STATUSES } from '@eventespresso/constants';
import { useDisclosure } from '@eventespresso/hooks';
import { HelpOutlined } from '@eventespresso/icons';
import { EntityStatusSelector, IconButton, Popover } from '@eventespresso/ui-components';
import { objectToSelectOptions } from '@eventespresso/utils';
import { getDatetimeStatusTextLabel } from '@eventespresso/helpers';
import { isActive, isExpired, isUpcoming } from '@eventespresso/predicates';

import type { Datetime, DatetimeMutator } from '@eventespresso/edtr-services';

interface Props {
	date: Datetime;
	updateEntity: DatetimeMutator['updateEntity'];
}

export const DatetimeStatus: React.FC<Props> = ({ date, updateEntity }) => {
	const statusText = getDatetimeStatusTextLabel(date);
	const { isOpen, onClose, onToggle } = useDisclosure();

	const options = useMemo(() => {
		return objectToSelectOptions(USER_SELECTABLE_DATETIME_STATUSES, true);
	}, []);

	const onStatusChange = useCallback(
		(status): void => {
			let newStatus = status;

			// convert 'CALENDAR_CONTROLLED' status to upcoming, active, or expired status codes
			if (newStatus === 'CALENDAR_CONTROLLED') {
				if (isUpcoming(date, true)) {
					newStatus = DATETIME_STATUS.UPCOMING;
				}
				if (isActive(date, true)) {
					newStatus = DATETIME_STATUS.ACTIVE;
				}
				if (isExpired(date, true)) {
					newStatus = DATETIME_STATUS.EXPIRED;
				}
			}
			if (newStatus !== date.status) {
				updateEntity({ status: newStatus });
			}
		},
		[date, updateEntity]
	);

	let currentStatus = DATETIME_STATUS_CODES[date.status];
	// for the sake of the status selector,
	// we want to use "CC"(Calendar Controlled) for all upcoming, active, and expired dates
	if (
		currentStatus === DATETIME_STATUS.UPCOMING ||
		currentStatus === DATETIME_STATUS.ACTIVE ||
		currentStatus === DATETIME_STATUS.EXPIRED
	) {
		currentStatus = 'CALENDAR_CONTROLLED';
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
						'Event Date is postponed until a later date (kind of like cancelled combined with "to be determined).'
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
