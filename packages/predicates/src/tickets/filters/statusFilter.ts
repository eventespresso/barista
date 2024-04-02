import type { Ticket } from '@eventespresso/constants';
import allOnSaleAndPending from './allOnSaleAndPending';
import expiredOnly from './expiredOnly';
import nextOnSaleOrPendingOnly from './nextOnSaleOrPendingOnly';
import onSaleOnly from './onSaleOnly';
import pendingOnly from './pendingOnly';
import soldOutOnly from './soldOutOnly';
import { notTrashed, trashedOnly } from '../../common';

import type { TicketStatusFilter } from './types';
import { TicketsStatus } from './types';

/**
 * reduces tickets array based on value of the "status" filter
 *
 * @param {Array} tickets    original tickets array
 * @param {string} show    value for the "show" filter
 * @return {Array}         filtered tickets array
 */
const statusFilter = ({ tickets: entities, status = TicketsStatus.onSaleAndPending }: TicketStatusFilter): Ticket[] => {
	const tickets = notTrashed(entities);
	switch (status) {
		case TicketsStatus.all:
			// we don't normally want to show trashed tickets
			return entities;
		case TicketsStatus.trashedOnly:
			// unless the user specifically requests it
			return trashedOnly(entities);
		case TicketsStatus.expiredOnly:
			return expiredOnly(tickets);
		case TicketsStatus.nextOnSaleOrPendingOnly:
			return nextOnSaleOrPendingOnly(tickets);
		case TicketsStatus.onSaleAndPending:
			return allOnSaleAndPending(tickets);
		case TicketsStatus.onSaleOnly:
			return onSaleOnly(tickets);
		case TicketsStatus.pendingOnly:
			return pendingOnly(tickets);
		case TicketsStatus.soldOutOnly:
			return soldOutOnly(tickets);
		default:
			return tickets;
	}
};

export default statusFilter;
