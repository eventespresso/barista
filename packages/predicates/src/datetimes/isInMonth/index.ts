import { parseISO } from 'date-fns';

import type { Datetime } from '@eventespresso/edtr-services';

/**
 * Whether the date is in the given month
 *
 * @param date The date to check
 * @param month An integer number, between 0 and 11, representing the month in the given date according to local time. 0 corresponds to January, 1 to February, and so on.
 */
export default function isInMonth(date: Datetime, month: number): boolean {
	return parseISO(date.startDate).getMonth() === month;
}
