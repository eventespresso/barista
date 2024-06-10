import { TICKET_STATUS_CODES } from '@eventespresso/constants';
import type { Ticket } from '@eventespresso/edtr-services';
import { isOnSale, isExpired, isTicketSoldOut, isTrashed } from '@eventespresso/predicates';

export const getUpdatedTicketStatus = (ticket: Ticket): string => {
	if (isTrashed(ticket)) {
		return TICKET_STATUS_CODES.TRASHED;
	}

	if (isExpired(ticket)) {
		return TICKET_STATUS_CODES.EXPIRED;
	}

	if (isTicketSoldOut(ticket)) {
		return TICKET_STATUS_CODES.SOLD_OUT;
	}

	if (isOnSale(ticket)) {
		return TICKET_STATUS_CODES.ON_SALE;
	}

	return TICKET_STATUS_CODES.PENDING;
};
