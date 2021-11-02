import { parseISO } from 'date-fns';

import type { Datetime } from '@eventespresso/edtr-services';

/**
 * Whether the date is in the given year
 *
 * @param date The date to check
 * @param year An integer number e.g. 1995
 */
export default function isInYear(date: Datetime, year: number): boolean {
	return parseISO(date.startDate).getFullYear() === year;
}
