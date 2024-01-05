import { __ } from '@eventespresso/i18n';

import type { Ticket } from '@eventespresso/edtr-services';
import { TICKET_STATUSES } from '@eventespresso/predicates';

const getStatusTextLabel = (ticket: Ticket): string => {
	let ticketStatus = '';
	switch (ticket.status) {
		case TICKET_STATUSES.TRASHED:
			ticketStatus = __('trashed');
			break;
		case TICKET_STATUSES.EXPIRED:
			ticketStatus = __('expired');
			break;
		case TICKET_STATUSES.SOLD_OUT:
			ticketStatus = __('sold out');
			break;
		case TICKET_STATUSES.PENDING:
			ticketStatus = __('pending');
			break;
		case TICKET_STATUSES.ONSALE:
			ticketStatus = __('on sale');
			break;
	}
	return ticketStatus;
};

export default getStatusTextLabel;
