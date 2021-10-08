import { useMemo } from 'react';

import { __ } from '@eventespresso/i18n';
import { useDatetimes } from '@eventespresso/edtr-services';
import { SelectWithLabel } from '@eventespresso/ui-components';
import { getMonthsListFromDatetimes } from '../../utils';
import type { FilterStateManager } from '../filterState';

type DatesByMonthControlProps = Pick<FilterStateManager, 'datesByMonth' | 'setDatesByMonth'>;

const DatesByMonthControl: React.FC<DatesByMonthControlProps> = ({ datesByMonth, setDatesByMonth }) => {
	const datetimes = useDatetimes();
	const monthsList = getMonthsListFromDatetimes(datetimes);

	// e.g. "2020:4" for May 2020
	const yearMonth = datesByMonth.join(':');

	// Add all dates option at the top, "0:0" to match the "year:month" format
	const monthsListWithAllDates = useMemo(
		() => [{ value: '0:0', label: __('All Dates') }, ...monthsList],
		[monthsList]
	);

	return (
		<SelectWithLabel
			id='ee-dates-by-month'
			label={__('dates by month')}
			onChangeValue={setDatesByMonth}
			options={monthsListWithAllDates}
			value={yearMonth}
		/>
	);
};

export default DatesByMonthControl;
