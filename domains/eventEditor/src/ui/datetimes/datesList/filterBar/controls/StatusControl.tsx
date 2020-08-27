import React from 'react';
import { __ } from '@wordpress/i18n';

import { SelectInput } from '@eventespresso/components';
import { DatetimeStatus, useDatesListFilterState } from '@edtrServices/filterState';
import { useMemoStringify } from '@eventespresso/hooks';

const StatusControl: React.FC = () => {
	const { status, setStatus } = useDatesListFilterState();

	const options = useMemoStringify([
		{
			value: DatetimeStatus.all,
			label: __('all dates'),
		},
		{
			value: DatetimeStatus.activeUpcoming,
			label: __('all active and upcoming'),
		},
		{
			value: DatetimeStatus.activeOnly,
			label: __('active dates only'),
		},
		{
			value: DatetimeStatus.upcomingOnly,
			label: __('upcoming dates only'),
		},
		{
			value: DatetimeStatus.nextActiveUpcomingOnly,
			label: __('next active or upcoming only'),
		},
		{
			value: DatetimeStatus.soldOutOnly,
			label: __('sold out dates only'),
		},
		{
			value: DatetimeStatus.recentlyExpiredOnly,
			label: __('recently expired dates'),
		},
		{
			value: DatetimeStatus.expiredOnly,
			label: __('all expired dates'),
		},
		{
			value: DatetimeStatus.trashedOnly,
			label: __('trashed dates only'),
		},
	]);
	return <SelectInput label={__('status')} value={status} options={options} onChangeValue={setStatus} />;
};

export default StatusControl;
