import isInMonth from '../../isInMonth';
import isInYear from '../../isInYear';
import type { Datetime } from '@eventespresso/edtr-services';
import type { DatetimeFilterFn } from '../types';

type InYearAndMonth = (yearMonth: [number, number]) => DatetimeFilterFn;

/**
 * Returns a predicate to return the dates in the given year and month
 */
const inYearAndMonth: InYearAndMonth =
	([year, month]) =>
	(dates: Array<Datetime>): Array<Datetime> => {
		const datesInYear = dates.filter((date) => isInYear(date, year));

		const datesInMonth = datesInYear.filter((date) => isInMonth(date, month));

		return datesInMonth;
	};

export default inYearAndMonth;
