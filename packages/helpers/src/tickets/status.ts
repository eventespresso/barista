import type { Ticket } from '@eventespresso/edtr-services';
import { TICKET_STATUS_ID, isOnSale, isExpired, isTicketSoldOut, isTrashed } from '@eventespresso/predicates';

const status = (ticket: Ticket): string => {
	if (isTrashed(ticket)) {
		return TICKET_STATUS_ID.TRASHED;
	}

	if (isExpired(ticket)) {
		return TICKET_STATUS_ID.EXPIRED;
	}

	if (isTicketSoldOut(ticket)) {
		return TICKET_STATUS_ID.SOLD_OUT;
	}

	if (isOnSale(ticket)) {
		return TICKET_STATUS_ID.ONSALE;
	}

	return TICKET_STATUS_ID.PENDING;
};

export default status;
