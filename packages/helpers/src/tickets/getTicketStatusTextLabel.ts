import { __ } from '@eventespresso/i18n';

import { TICKET_STATUSES, TICKET_STATUS_LABELS } from '@eventespresso/constants';
import type { Ticket } from '@eventespresso/edtr-services';

export const getTicketStatusTextLabel = (ticket: Ticket): string => {
	let ticketStatus = '';
	switch (ticket.status) {
		case TICKET_STATUSES.TRASHED:
			ticketStatus = TICKET_STATUS_LABELS.TRASHED;
			break;
		case TICKET_STATUSES.EXPIRED:
			ticketStatus = TICKET_STATUS_LABELS.EXPIRED;
			break;
		case TICKET_STATUSES.SOLD_OUT:
			ticketStatus = TICKET_STATUS_LABELS.SOLD_OUT;
			break;
		case TICKET_STATUSES.PENDING:
			ticketStatus = TICKET_STATUS_LABELS.PENDING;
			break;
		case TICKET_STATUSES.ON_SALE:
			ticketStatus = TICKET_STATUS_LABELS.ON_SALE;
			break;
	}
	return ticketStatus;
};
