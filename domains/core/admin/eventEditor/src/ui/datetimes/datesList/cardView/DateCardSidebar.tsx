import { useCallback, useMemo } from 'react';

import { __ } from '@eventespresso/i18n';
import { CalendarDateSwitcher, EditDateRangeButton } from '@eventespresso/ee-components';
import { DATETIME_STATUSES } from '@eventespresso/predicates';
import { useDatesListFilterState } from '@eventespresso/edtr-services';
import { useDatetimeMutator } from '@eventespresso/edtr-services';
import { isActive, isExpired, isUpcoming } from '@eventespresso/predicates';
import { useTimeZoneTime } from '@eventespresso/services';
import { DatetimeStatus } from './DatetimeStatus';

import type { DateRange } from '@eventespresso/dates';
import type { DateItemProps } from '../types';

const DateCardSidebar: React.FC<DateItemProps> = ({ entity: date }) => {
	const { displayStartOrEndDate } = useDatesListFilterState();
	const { updateEntity } = useDatetimeMutator(date.id);
	const { siteTimeToUtc } = useTimeZoneTime();

	const onChange = useCallback(
		([start, end]: DateRange): void => {
			// convert start & end dates to proper UTC "startDate" and "endDate"
			const startDate = siteTimeToUtc(start).toISOString();
			const endDate = siteTimeToUtc(end).toISOString();
			updateEntity({ startDate, endDate });
		},
		[siteTimeToUtc, updateEntity]
	);

	const onStatusChange = useCallback(
		(status: keyof typeof DATETIME_STATUSES): void => {
			let newStatus = status;

			// convert "CC" (Calendar Controlled) status to upcoming, active, or expired status codes
			if (newStatus === 'CC') {
				if (isUpcoming(date, true)) {
					newStatus = 'DTU';
				}
				if (isActive(date, true)) {
					newStatus = 'DTA';
				}
				if (isExpired(date, true)) {
					newStatus = 'DTE';
				}
			}
			if (newStatus !== date.status) {
				updateEntity({ status: DATETIME_STATUSES[newStatus] });
			}
		},
		[date, updateEntity]
	);

	const labels = useMemo(() => {
		return {
			headerFuture: displayStartOrEndDate === 'start' ? __('starts') : __('ends'),
			headerPast: displayStartOrEndDate === 'start' ? __('started') : date.isExpired ? __('ended') : __('ends'),
		};
	}, [date.isExpired, displayStartOrEndDate]);

	return date ? (
		<>
			<CalendarDateSwitcher
				displayDate={displayStartOrEndDate}
				labels={labels}
				endDate={date.endDate}
				startDate={date.startDate}
			/>
			<EditDateRangeButton
				endDate={date.endDate}
				header={__('Edit Event Date')}
				onChange={onChange}
				popoverPlacement='right-end'
				startDate={date.startDate}
				tooltip={__('edit start and end dates')}
			/>
			<DatetimeStatus date={date} onStatusChange={onStatusChange} />
		</>
	) : null;
};

export default DateCardSidebar;
