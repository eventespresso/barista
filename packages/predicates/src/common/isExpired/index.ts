import { parseISO } from 'date-fns';

import type { Ticket, Datetime } from '@eventespresso/edtr-services';
import { isBooleanTrue } from '@eventespresso/utils';
import { diff } from '@eventespresso/dates';
import { NOW as now } from '@eventespresso/constants';

/**
 * Whether an entity is expired, based on its end date
 *
 * @param entity The entity object
 * @param ignoreFlag Whether to ignore the boolean flag from the object and recalculate the value
 */
export const isExpired = (entity: Ticket | Datetime, ignoreFlag = false): boolean => {
	return (!ignoreFlag && isBooleanTrue(entity.isExpired)) || diff('minutes', parseISO(entity.endDate), now) < 0;
};
