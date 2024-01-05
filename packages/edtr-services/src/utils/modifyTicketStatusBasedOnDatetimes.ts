import { findEntityByGuid, TICKET_STATUSES } from '@eventespresso/predicates';
import { useRelations } from '@eventespresso/services';
import { useDatetimes } from '../apollo/queries/datetimes';

import type { Ticket } from '../apollo/types';

export const modifyTicketStatusBasedOnDatetimes = (ticket: Ticket) => {
	const datetimes = useDatetimes();
	const findDatetime = findEntityByGuid(datetimes);
	const { getRelations } = useRelations();
	const relatedDatetimeIds = getRelations({ entity: 'tickets', entityId: ticket.id, relation: 'datetimes' });

	let changes = {};
	for (const relatedDatetimeId of relatedDatetimeIds) {
		const datetime = findDatetime(relatedDatetimeId);
		if (datetime.id) {
			switch (datetime.status) {
				// if at least one datetime is active or upcoming, then just use ticket status
				case 'ACTIVE':
				case 'UPCOMING':
					return ticket;
				case 'POSTPONED':
				case 'TO_BE_DETERMINED':
					changes = {
						isExpired: false,
						isOnSale: false,
						isPending: true,
						isSoldOut: false,
						isTrashed: false,
						status: TICKET_STATUSES.PENDING,
					};
					break;
				case 'CANCELLED':
				case 'TRASHED':
					changes = {
						isExpired: false,
						isOnSale: false,
						isPending: false,
						isSoldOut: false,
						isTrashed: true,
						status: TICKET_STATUSES.TRASHED,
					};
					break;
				case 'EXPIRED':
					changes = {
						isExpired: true,
						isOnSale: false,
						isPending: false,
						isSoldOut: false,
						isTrashed: false,
						status: TICKET_STATUSES.EXPIRED,
					};
					break;
				case 'SOLD_OUT':
					changes = {
						isExpired: false,
						isOnSale: false,
						isPending: false,
						isSoldOut: true,
						isTrashed: false,
						status: TICKET_STATUSES.SOLD_OUT,
					};
					break;
			}
		}
	}
	// but if the ticket status is not active or upcoming, then change the ticket status
	return { ...ticket, ...changes };;
};
