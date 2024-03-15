import type { Ticket } from '@eventespresso/edtr-services';

export interface TicketSalesFilter {
	tickets: Ticket[];
	sales: TicketsSalesFilters;
}

export interface TicketStatusFilter {
	tickets: Ticket[];
	status: TicketsStatusFilters;
}

export type TicketFilterFn = (tickets: Array<Ticket>) => Array<Ticket>;

export enum TicketsStatusFilters {
	all = 'all',
	expiredOnly = 'expired-only',
	nextOnSaleOrPendingOnly = 'next-on-sale-or-pending-only',
	onSaleAndPending = 'on-sale-and-pending',
	onSaleOnly = 'on-sale-only',
	pendingOnly = 'pending-only',
	soldOutOnly = 'sold-out-only',
	trashedOnly = 'trashed-only',
}

export enum TicketsSalesFilters {
	above50Sold = 'above-50-sold',
	above75Sold = 'above-75-sold',
	above90Sold = 'above-90-sold',
	all = 'all',
	below50Sold = 'below-50-sold',
}
