import { parseISO } from 'date-fns';

import type { Datetime } from '@eventespresso/edtr-services';
import { isBooleanTrue } from '@eventespresso/utils';
import { diff } from '@eventespresso/dates';
import { NOW as now } from '@eventespresso/constants';

/**
 * Whether a datetime is upcoming, based on its start date
 *
 * @param date The datetime object
 * @param ignoreFlag Whether to ignore the boolean flag from the object and recalculate the value
 */
const isUpcoming = (date: Datetime, ignoreFlag = false): boolean => {
	return (!ignoreFlag && isBooleanTrue(date.isUpcoming)) || diff('seconds', parseISO(date.startDate), now) > 0;
};

export default isUpcoming;
