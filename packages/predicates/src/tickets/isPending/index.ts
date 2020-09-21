import { parseISO } from 'date-fns';

import { isBooleanTrue } from '@eventespresso/utils';
import { diff } from '@eventespresso/dates';
import { NOW as now } from '@eventespresso/constants';
import type { Ticket } from '@eventespresso/edtr-services';

/**
 * @function
 * @param {Object} ticket object
 * @return {boolean} 	true if ticket is not yet available for purchase,
 * 						but will be at some date in the future
 */
const isPending = (ticket: Ticket): boolean =>
	isBooleanTrue(ticket.isPending) || diff('minutes', parseISO(ticket.startDate), now) > 0;

export default isPending;
