import { parseISO } from 'date-fns';

import { isBooleanTrue } from '@eventespresso/utils';
import { diff } from '@eventespresso/dates';
import { NOW } from '@eventespresso/constants';
import type { Ticket } from '@eventespresso/constants';

/**
 * Whether a ticket is on sale, based on its start and end date
 *
 * @param ticket The ticket object
 * @param ignoreFlag Whether to ignore the boolean flag from the object and recalculate the value
 */
const isOnSale = (ticket: Ticket, ignoreFlag = false): boolean => {
	return (
		(!ignoreFlag && isBooleanTrue(ticket.isOnSale)) ||
		(diff('seconds', parseISO(ticket.startDate), NOW) < 0 && diff('seconds', parseISO(ticket.endDate), NOW) > 0)
	);
};

export default isOnSale;
