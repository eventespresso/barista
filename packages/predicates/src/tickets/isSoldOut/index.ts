import { isBooleanTrue, isInfinite } from '@eventespresso/utils';
import type { Ticket } from '@eventespresso/constants';

const isSoldOut = (ticket: Ticket): boolean =>
	isBooleanTrue(ticket.isSoldOut) ||
	(!isInfinite(ticket.quantity) && ticket.quantity > -1 && ticket.quantity <= ticket.sold);

export default isSoldOut;
