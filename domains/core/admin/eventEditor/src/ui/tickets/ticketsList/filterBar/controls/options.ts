import { __ } from '@eventespresso/i18n';

import { DisplayStartOrEndDate } from '@eventespresso/edtr-services';

import { TicketsSales, TicketsStatus } from '@eventespresso/predicates';

export const displayStartOrEndDateOptions = {
	[DisplayStartOrEndDate.start]: __('ticket sales start date only'),
	[DisplayStartOrEndDate.end]: __('ticket sales end date only'),
	[DisplayStartOrEndDate.both]: __('ticket sales start and end dates'),
};

export const salesOptions = {
	[TicketsSales.all]: __('all tickets for all dates'),
	[TicketsSales.above90Sold]: __('tickets with 90% or more sold'),
	[TicketsSales.above75Sold]: __('tickets with 75% or more sold'),
	[TicketsSales.above50Sold]: __('tickets with 50% or more sold'),
	// eslint-disable-next-line @wordpress/i18n-translator-comments
	[TicketsSales.below50Sold]: __('tickets with less than 50% sold'),
};

export const salesIsChainedOptions = {
	...salesOptions,
	[TicketsSales.all]: __('all tickets for above dates'),
};

export const statusOptions = {
	[TicketsStatus.all]: __('all tickets for all dates'),
	[TicketsStatus.onSaleAndPending]: __('all on sale and sale pending'),
	[TicketsStatus.onSaleOnly]: __('on sale tickets only'),
	[TicketsStatus.pendingOnly]: __('sale pending tickets only'),
	[TicketsStatus.nextOnSaleOrPendingOnly]: __('next on sale or sale pending only'),
	[TicketsStatus.soldOutOnly]: __('sold out tickets only'),
	[TicketsStatus.expiredOnly]: __('expired tickets only'),
	[TicketsStatus.trashedOnly]: __('trashed tickets only'),
};

export const statusIsChainedOptions = {
	...statusOptions,
	[TicketsStatus.all]: __('all tickets for above dates'),
};

export const sortByOptions = {
	date: __('ticket sale date'),
	name: __('ticket name'),
	id: __('ticket ID'),
	order: __('custom order'),
};

export const labels = {
	displayStartOrEndDate: __('display'),
	isChained: __('linked'),
	sales: __('sales'),
	search: __('search'),
	sortBy: __('sort by'),
	status: __('status'),
};
