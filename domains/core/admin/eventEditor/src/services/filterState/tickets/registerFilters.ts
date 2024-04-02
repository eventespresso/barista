/**
 * This file registers the filters for tickets list via registry package
 */
import { FilterBarService } from '@eventespresso/registry';
import { ticketSalesFilter, ticketStatusFilter, sortTickets } from '@eventespresso/predicates';
import { domain, ticketsList } from '@eventespresso/edtr-services';
import { entityListSearch } from '@eventespresso/utils';
import type { Ticket } from '@eventespresso/constants';
import type { TicketsFilterStateManager } from '@eventespresso/edtr-services';

type Domain = typeof domain;
type TFSM = TicketsFilterStateManager;

const {
	registerFilter: registerTicketsFilter,
	registerSearch: registerTicketsSearch,
	registerSorter: registerTicketsSorter,
} = new FilterBarService<Domain, typeof ticketsList, Ticket, TFSM>(domain, ticketsList);

// Register sales filter
registerTicketsFilter(({ entityList, filterState }) => {
	return ticketSalesFilter({ sales: filterState.sales, tickets: entityList });
}, 11);

// Register status filter
registerTicketsFilter(({ entityList, filterState }) => {
	return ticketStatusFilter({ status: filterState.status, tickets: entityList });
}, 10); // 10 by default

// Register search
registerTicketsSearch(({ entityList, filterState }) => {
	return entityListSearch<Ticket>({
		entities: entityList,
		searchFields: ['name', 'description'],
		searchText: filterState.searchText,
	});
});

// Register sorter
registerTicketsSorter(({ entityList, filterState }) => {
	return sortTickets({ tickets: entityList, sortBy: filterState.sortBy });
});
