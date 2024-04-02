import { useMemo } from 'react';

import type { Datetime } from '@eventespresso/constants';
import { notTrashed, inYearAndMonth } from '@eventespresso/predicates';
import { useFilterState } from '../filters';

const useFilteredDatetimes = (allDates: Array<Datetime>): Array<Datetime> => {
	const { showTrashedDates, datesByMonth } = useFilterState();

	const datesInYearAndMonth = inYearAndMonth(datesByMonth);

	// If the year i.e. datesByMonth[0] is set, then filter
	const datetimes = useMemo(
		() => (datesByMonth[0] ? datesInYearAndMonth(allDates) : allDates),
		[allDates, datesByMonth, datesInYearAndMonth]
	);

	return useMemo(() => {
		return showTrashedDates ? datetimes : notTrashed(datetimes);
	}, [datetimes, showTrashedDates]);
};

export default useFilteredDatetimes;
