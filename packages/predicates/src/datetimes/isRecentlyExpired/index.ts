import { parseISO } from 'date-fns';

import type { Datetime } from '@eventespresso/constants';
import { diff } from '@eventespresso/dates';
import { NOW, TIME } from '@eventespresso/constants';

/**
 * @function
 * @param {Object} date date event object
 * @return {boolean} true if end date is in the past
 */
const isRecentlyExpired = (date: Datetime): boolean => {
	const endDate = parseISO(date.endDate);
	return diff('seconds', endDate, NOW) < 0 && diff('seconds', endDate, NOW) > TIME.MONTH_IN_SECONDS * -1;
};

export default isRecentlyExpired;
