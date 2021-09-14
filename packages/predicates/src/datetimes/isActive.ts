import { parseISO } from 'date-fns';

import type { Datetime } from '@eventespresso/edtr-services';
import { isBooleanTrue } from '@eventespresso/utils';
import { diff } from '@eventespresso/dates';
import { NOW as now } from '@eventespresso/constants';

/**
 * Whether a datetime is active, based on its start and end date
 *
 * @param date The datetime object
 * @param ignoreFlag Whether to ignore the boolean flag from the object and recalculate the value
 */
const isActive = (date: Datetime, ignoreFlag?: boolean): boolean => {
	return (
		(!ignoreFlag && isBooleanTrue(date.isActive)) ||
		(diff('seconds', parseISO(date.startDate), now) < 0 && diff('seconds', parseISO(date.endDate), now) > 0)
	);
};

export default isActive;
