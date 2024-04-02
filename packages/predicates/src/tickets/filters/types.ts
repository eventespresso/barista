import type { Ticket } from '@eventespresso/constants';

export interface TicketSalesFilter {
	tickets: Ticket[];
	sales: TicketsSales;
}

export interface TicketStatusFilter {
	tickets: Ticket[];
	status: TicketsStatus;
}

export type TicketFilterFn = (tickets: Array<Ticket>) => Array<Ticket>;

export enum TicketsStatus {
	all = 'all',
	expiredOnly = 'expired-only',
	nextOnSaleOrPendingOnly = 'next-on-sale-or-pending-only',
	onSaleAndPending = 'on-sale-and-pending',
	onSaleOnly = 'on-sale-only',
	pendingOnly = 'pending-only',
	soldOutOnly = 'sold-out-only',
	trashedOnly = 'trashed-only',
}

export enum TicketsSales {
	above50Sold = 'above-50-sold',
	above75Sold = 'above-75-sold',
	above90Sold = 'above-90-sold',
	all = 'all',
	below50Sold = 'below-50-sold',
}
