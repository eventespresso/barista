import { findEntityByGuid, TICKET_STATUSES } from '@eventespresso/predicates';
import { useRelations } from '@eventespresso/services';
import { useDatetimes } from '../apollo/queries/datetimes';

import type { Ticket } from '../apollo/types';

export const modifyTicketStatusBasedOnDatetimes = (ticket: Ticket) => {
	const datetimes = useDatetimes();
	const findDatetime = findEntityByGuid(datetimes);
	const { getRelations } = useRelations();
	const relatedDatetimeIds = getRelations({ entity: 'tickets', entityId: ticket.id, relation: 'datetimes' });

	let newStatus = '';
	for (const relatedDatetimeId of relatedDatetimeIds) {
		const datetime = findDatetime(relatedDatetimeId);
		if (datetime.id) {
			switch (datetime.status) {
				case 'SOLD_OUT':
					// if any datetime is sold out, then the ticket needs to be sold out too
					newStatus = TICKET_STATUSES.SOLD_OUT;
					break;
				case 'ACTIVE':
				case 'UPCOMING':
					// unless ticket is sold out, then it should be on sale
					if (newStatus !== TICKET_STATUSES.SOLD_OUT) {
						newStatus = TICKET_STATUSES.ONSALE;
					}
					break;
				case 'POSTPONED':
				case 'TO_BE_DETERMINED':
					// if ticket is not sold out and not on sale, then it mark it pending
					if (newStatus !== TICKET_STATUSES.ONSALE && newStatus !== TICKET_STATUSES.SOLD_OUT) {
						newStatus = TICKET_STATUSES.PENDING;
					}
					break;
				case 'EXPIRED':
					// only change to expired if status is not one of the above statuses
					if (
						newStatus !== TICKET_STATUSES.SOLD_OUT &&
						newStatus !== TICKET_STATUSES.ONSALE &&
						newStatus !== TICKET_STATUSES.PENDING
					) {
						newStatus = TICKET_STATUSES.EXPIRED;
					}
					break;
				case 'CANCELLED':
				case 'TRASHED':
					// only change to trashed if status has not been changed to something else
					if (newStatus === '') {
						newStatus = TICKET_STATUSES.TRASHED;
					}
					break;
			}
		}
	}
	if (newStatus !== ticket.status) {
		switch (newStatus) {
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
	return ticket;
};


export const changeTicketStatusToPending = (ticket: Ticket) => {
	const changes = {
		isExpired: false,
		isOnSale: false,
		isPending: true,
		isSoldOut: false,
		isTrashed: false,
		status: TICKET_STATUSES.PENDING,
	};
	return { ...ticket, ...changes };
}

export const changeTicketStatusToTrashed = (ticket: Ticket) => {
	const changes = {
		isExpired: false,
		isOnSale: false,
		isPending: false,
		isSoldOut: false,
		isTrashed: true,
		status: TICKET_STATUSES.TRASHED,
	};
	return { ...ticket, ...changes };
}

export const changeTicketStatusToExpired = (ticket: Ticket) => {
	const changes = {
		isExpired: true,
		isOnSale: false,
		isPending: false,
		isSoldOut: false,
		isTrashed: false,
		status: TICKET_STATUSES.EXPIRED,
	};
	return { ...ticket, ...changes };
}

export const changeTicketStatusToSoldOut = (ticket: Ticket) => {
	const changes = {
		isExpired: false,
		isOnSale: false,
		isPending: false,
		isSoldOut: true,
		isTrashed: false,
		status: TICKET_STATUSES.SOLD_OUT,
	};
	return { ...ticket, ...changes };
}
