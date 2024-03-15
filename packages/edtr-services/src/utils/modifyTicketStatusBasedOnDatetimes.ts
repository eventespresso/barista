import { DATETIME_STATUS, TICKET_STATUSES } from '@eventespresso/constants';
import { findEntityByGuid } from '@eventespresso/predicates';
import { useRelations } from '@eventespresso/services';
import { useDatetimes } from '../apollo/queries/datetimes';

import { isDatetime, Ticket, TicketStatus } from '../apollo/types';

export const modifyTicketStatusBasedOnDatetimes = (ticket: Ticket): Ticket => {
	const datetimes = useDatetimes();
	const findDatetime = findEntityByGuid(datetimes);
	const { getRelations } = useRelations();
	const relatedDatetimeIds = getRelations({ entity: 'tickets', entityId: ticket.id, relation: 'datetimes' });

	let newStatus = '';
	for (const relatedDatetimeId of relatedDatetimeIds) {
		const datetime = findDatetime(relatedDatetimeId);

		// verify that datetime is of type Datetime and not null
		if (!isDatetime(datetime)) {
			continue;
		}

		if (datetime.capacity !== -1 && datetime.capacity <= ticket.sold) {
			newStatus = TICKET_STATUSES.SOLD_OUT;
		}

		switch (datetime.status) {
			case DATETIME_STATUS.SOLD_OUT:
				// if any datetime is sold out, then the ticket needs to be sold out too
				newStatus = TICKET_STATUSES.SOLD_OUT;
				break;
			case DATETIME_STATUS.ACTIVE:
			case DATETIME_STATUS.UPCOMING:
				// leave ticket status as is
				newStatus = ticket.sold < ticket.quantity && ticket.status === TICKET_STATUSES.SOLD_OUT
					? TICKET_STATUSES.ON_SALE
					: ticket.status;
				break;
			case DATETIME_STATUS.POSTPONED:
			case DATETIME_STATUS.TO_BE_DETERMINED:
				// if ticket is not sold out and not on sale, then it mark it pending
				if (newStatus !== TICKET_STATUSES.ON_SALE && newStatus !== TICKET_STATUSES.SOLD_OUT) {
					newStatus = TICKET_STATUSES.PENDING;
				}
				break;
			case DATETIME_STATUS.EXPIRED:
				// only change to expired if status is not one of the above statuses
				if (
					newStatus !== TICKET_STATUSES.SOLD_OUT &&
					newStatus !== TICKET_STATUSES.ON_SALE &&
					newStatus !== TICKET_STATUSES.PENDING
				) {
					newStatus = TICKET_STATUSES.EXPIRED;
				}
				break;
			case DATETIME_STATUS.CANCELLED:
			case DATETIME_STATUS.TRASHED:
				// only change to trashed if status has not been changed to something else
				if (newStatus === '') {
					newStatus = TICKET_STATUSES.TRASHED;
				}
				break;
		}
	}

	if (newStatus !== '' && newStatus !== ticket.status) {
		switch (newStatus) {
			case TICKET_STATUSES.ON_SALE:
				return changeTicketStatusToOnSale(ticket);
			case TICKET_STATUSES.PENDING:
				return changeTicketStatusToPending(ticket);
			case TICKET_STATUSES.TRASHED:
				return changeTicketStatusToTrashed(ticket);
			case TICKET_STATUSES.EXPIRED:
				return changeTicketStatusToExpired(ticket);
			case TICKET_STATUSES.SOLD_OUT:
				return changeTicketStatusToSoldOut(ticket);
		}
	}
	return ticket as Ticket;
};


export const changeTicketStatusToOnSale = (ticket: Ticket): Ticket => {
	const changes = {
		isExpired: false,
		isOnSale: true,
		isPending: false,
		isSoldOut: false,
		isTrashed: false,
		status: TicketStatus.ON_SALE,
	};
	return { ...ticket, ...changes };
};


export const changeTicketStatusToPending = (ticket: Ticket): Ticket => {
	const changes = {
		isExpired: false,
		isOnSale: false,
		isPending: true,
		isSoldOut: false,
		isTrashed: false,
		status: TicketStatus.PENDING,
	};
	return { ...ticket, ...changes };
};

export const changeTicketStatusToTrashed = (ticket: Ticket): Ticket => {
	const changes = {
		isExpired: false,
		isOnSale: false,
		isPending: false,
		isSoldOut: false,
		isTrashed: true,
		status: TicketStatus.TRASHED,
	};
	return { ...ticket, ...changes };
};

export const changeTicketStatusToExpired = (ticket: Ticket): Ticket => {
	const changes = {
		isExpired: true,
		isOnSale: false,
		isPending: false,
		isSoldOut: false,
		isTrashed: false,
		status: TicketStatus.EXPIRED,
	};
	return { ...ticket, ...changes };
};

export const changeTicketStatusToSoldOut = (ticket: Ticket): Ticket => {
	const changes = {
		isExpired: false,
		isOnSale: false,
		isPending: false,
		isSoldOut: true,
		isTrashed: false,
		status: TicketStatus.SOLD_OUT,
	};
	return { ...ticket, ...changes };
};
