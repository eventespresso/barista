import { parseISO } from 'date-fns';

import { isBooleanTrue } from '@eventespresso/utils';
import { diff } from '@eventespresso/dates';
import { NOW as now } from '@eventespresso/constants';
import type { Ticket } from '@eventespresso/edtr-services';

/**
 * Whether a ticket is not yet available for purchase,
 * but will be at some date in the future, based on its start date
 *
 * @param ticket The ticket object
 * @param ignoreFlag Whether to ignore the boolean flag from the object and recalculate the value
 */
const isPending = (ticket: Ticket, ignoreFlag = false): boolean => {
	return (!ignoreFlag && isBooleanTrue(ticket.isPending)) || diff('seconds', parseISO(ticket.startDate), now) > 0;
};

export default isPending;
