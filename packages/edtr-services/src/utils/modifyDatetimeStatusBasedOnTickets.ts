import { DATETIME_STATUS, TICKET_STATUSES } from '@eventespresso/constants';
import { findEntityByGuid } from '@eventespresso/predicates';
import { useRelations } from '@eventespresso/services';
import { useTickets } from '../apollo/queries/tickets';

import { Datetime, DatetimeStatus, isTicket } from '../apollo/types';

export const modifyDatetimeStatusBasedOnTickets = (datetime: Datetime): Datetime => {
	const tickets = useTickets();
	const findTicket = findEntityByGuid(tickets);
	const { getRelations } = useRelations();
	const relatedfindTicketIds = getRelations({
		entity: 'datetimes',
		entityId: datetime.id,
		relation: 'tickets',
	});

	const justOneTicket = relatedfindTicketIds.length === 1;

	let newStatus = '';
	for (const relatedfindTicketId of relatedfindTicketIds) {
		const ticket = findTicket(relatedfindTicketId);

		if (!isTicket(ticket)) {
			continue;
		}

		if (datetime.capacity !== -1 && datetime.capacity <= ticket.sold) {
			newStatus = DATETIME_STATUS.SOLD_OUT;
		} else if (justOneTicket && ticket.status === TICKET_STATUSES.SOLD_OUT && ticket.sold >= ticket.quantity) {
			// if there is only one ticket and it is sold out, then the datetime needs to be sold out too
			newStatus = DATETIME_STATUS.SOLD_OUT;
		}
	}

	if (newStatus !== '' && newStatus === DATETIME_STATUS.SOLD_OUT) {
		return changeDatetimeStatusToSoldOut(datetime);
	}
	return datetime;
};


export const changeDatetimeStatusToSoldOut = (datetime: Datetime): Datetime => {
	const changes = {
		isActive: false,
		isCancelled: false,
		isExpired: false,
		isPostponed: false,
		isSoldOut: true,
		isUpcoming: false,
		status: DatetimeStatus.SOLD_OUT,
	};
	return { ...datetime, ...changes };
};
