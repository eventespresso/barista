import type { Ticket } from '@eventespresso/edtr-services';
import allOnSaleAndPending from './allOnSaleAndPending';
import expiredOnly from './expiredOnly';
import nextOnSaleOrPendingOnly from './nextOnSaleOrPendingOnly';
import onSaleOnly from './onSaleOnly';
import pendingOnly from './pendingOnly';
import soldOutOnly from './soldOutOnly';
import { notTrashed, trashedOnly } from '../../common';

import type { TicketStatusFilter } from './types';
import { TicketsStatusFilters } from './types';

/**
 * reduces tickets array based on value of the "status" filter
 *
 * @param {Array} tickets    original tickets array
 * @param {string} show    value for the "show" filter
 * @return {Array}         filtered tickets array
 */
const statusFilter = ({ tickets: entities, status = TicketsStatusFilters.onSaleAndPending }: TicketStatusFilter): Ticket[] => {
	const tickets = notTrashed(entities);
	switch (status) {
		case TicketsStatusFilters.all:
			// we don't normally want to show trashed tickets
			return entities;
		case TicketsStatusFilters.trashedOnly:
			// unless the user specifically requests it
			return trashedOnly(entities);
		case TicketsStatusFilters.expiredOnly:
			return expiredOnly(tickets);
		case TicketsStatusFilters.nextOnSaleOrPendingOnly:
			return nextOnSaleOrPendingOnly(tickets);
		case TicketsStatusFilters.onSaleAndPending:
			return allOnSaleAndPending(tickets);
		case TicketsStatusFilters.onSaleOnly:
			return onSaleOnly(tickets);
		case TicketsStatusFilters.pendingOnly:
			return pendingOnly(tickets);
		case TicketsStatusFilters.soldOutOnly:
			return soldOutOnly(tickets);
		default:
			return tickets;
	}
};

export default statusFilter;
