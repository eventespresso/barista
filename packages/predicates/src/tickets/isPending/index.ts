import { parseISO } from 'date-fns';

import { diff, isBooleanTrue } from '@eventespresso/services';
import { NOW as now } from '@eventespresso/constants';
import { Ticket } from '@eventespresso/edtr-services';

/**
 * @function
 * @param {Object} ticket object
 * @return {boolean} 	true if ticket is not yet available for purchase,
 * 						but will be at some date in the future
 */
const isPending = (ticket: Ticket): boolean =>
	isBooleanTrue(ticket.isPending) || diff('minutes', parseISO(ticket.startDate), now) > 0;

export default isPending;
