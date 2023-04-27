import type { Ticket } from '@eventespresso/edtr-services';
import { isOnSale, isExpired, isTicketSoldOut } from '@eventespresso/predicates';

const statusBgColorClassName = (ticket: Ticket): string => {
	if (ticket.isTrashed) {
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
