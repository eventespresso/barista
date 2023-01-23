import type { Ticket } from '@eventespresso/edtr-services';
import { isOnSale, isExpired, isTicketSoldOut } from '@eventespresso/predicates';

const statusBgColorClassName = (ticket: Ticket): string => {
	if (ticket.isTrashed) {
		return 'ee-status-background-color--TKA';
	}

	if (isExpired(ticket)) {
		return 'ee-status-background-color--TKE';
	}

	if (isTicketSoldOut(ticket)) {
		return 'ee-status-background-color--TKS';
	}

	if (isOnSale(ticket)) {
		return 'ee-status-background-color--TKO';
	}

	return 'ee-status-background-color--TKP';
};

export default statusBgColorClassName;
