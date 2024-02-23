import { TICKET_STATUS_CODES } from '@eventespresso/constants';
import type { Ticket } from '@eventespresso/edtr-services';
import { isOnSale, isExpired, isTicketSoldOut, isTrashed } from '@eventespresso/predicates';

export const getTicketStatusBgColorClassName = (ticket: Ticket, reevaluate: boolean = false): string => {
	const ticketStatusCode = TICKET_STATUS_CODES[ticket.status];
	if (ticketStatusCode && !reevaluate) {
		return `ee-status-bg--${ticketStatusCode}`;
	}

	if (isTrashed(ticket)) {
		return 'ee-status-bg--TKA';
	}

	if (isExpired(ticket)) {
		return 'ee-status-bg--TKE';
	}

	if (isTicketSoldOut(ticket)) {
		return 'ee-status-bg--TKS';
	}

	if (isOnSale(ticket)) {
		return 'ee-status-bg--TKO';
	}

	return 'ee-status-bg--TKP';
};