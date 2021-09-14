import { parseISO } from 'date-fns';

import { isBooleanTrue } from '@eventespresso/utils';
import { diff } from '@eventespresso/dates';
import { NOW as now } from '@eventespresso/constants';
import type { Ticket } from '@eventespresso/edtr-services';

/**
 * Whether a ticket is on sale, based on its start and end date
 *
 * @param ticket The ticket object
 * @param ignoreFlag Whether to ignore the boolean flag from the object and recalculate the value
 */
const isOnSale = (ticket: Ticket, ignoreFlag?: boolean): boolean => {
	return (
		(!ignoreFlag && isBooleanTrue(ticket.isOnSale)) ||
		(diff('minutes', parseISO(ticket.startDate), now) < 0 && diff('minutes', parseISO(ticket.endDate), now) > 0)
	);
};

export default isOnSale;
