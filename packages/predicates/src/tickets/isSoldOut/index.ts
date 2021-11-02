import { isBooleanTrue, isInfinite } from '@eventespresso/utils';
import type { Ticket } from '@eventespresso/edtr-services';

const isSoldOut = (ticket: Ticket): boolean =>
	isBooleanTrue(ticket.isSoldOut) ||
	(!isInfinite(ticket.quantity) && ticket.quantity > -1 && ticket.quantity <= ticket.sold);

export default isSoldOut;
