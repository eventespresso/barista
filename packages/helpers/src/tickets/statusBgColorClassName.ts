import type { Ticket } from '@eventespresso/edtr-services';
import { isOnSale, isExpired, isTicketSoldOut, isTrashed, TICKET_STATUS_ID } from '@eventespresso/predicates';

const statusBgColorClassName = (ticket: Ticket, reevaluate: boolean = false): string => {
	const ticketStatusCode = TICKET_STATUS_ID[ticket.status];
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

export default statusBgColorClassName;
