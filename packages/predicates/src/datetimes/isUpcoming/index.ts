import * as R from 'ramda';
import { parseISO } from 'date-fns';

import type { Datetime } from '@eventespresso/edtr-services';
import { diff } from '@eventespresso/dates';
import { NOW as now } from '@eventespresso/constants';
import { isPostponed, isTBD } from '../index';

/**
 * Whether a datetime is upcoming, based on its start date
 *
 * @param date The datetime object
 * @param ignoreFlag Whether to ignore the boolean flag from the object and recalculate the value
 */
const isUpcoming = (date: Datetime, ignoreFlag = false): boolean => {
	if (ignoreFlag) {
		return diff('seconds', parseISO(date.startDate), now) > 0;
	}
	return (
		R.propEq('isPostponed', true, date) ||
		R.propEq('status', 'UPCOMING', date) ||
		isPostponed(date) || // date is posptponed to a future date which means it is upcoming
		isTBD(date) // date is TBD which most likely means it is upcoming
	);
};

export default isUpcoming;
