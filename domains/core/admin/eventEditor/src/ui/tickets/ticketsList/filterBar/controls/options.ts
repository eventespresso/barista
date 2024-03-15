import { __ } from '@eventespresso/i18n';

import { DisplayStartOrEndDate } from '@eventespresso/edtr-services';

import { TicketsSalesFilters, TicketsStatusFilters } from '@eventespresso/predicates';

export const displayStartOrEndDateOptions = {
	[DisplayStartOrEndDate.start]: __('ticket sales start date only'),
	[DisplayStartOrEndDate.end]: __('ticket sales end date only'),
	[DisplayStartOrEndDate.both]: __('ticket sales start and end dates'),
};

export const salesOptions = {
	[TicketsSalesFilters.all]: __('all tickets for all dates'),
	[TicketsSalesFilters.above90Sold]: __('tickets with 90% or more sold'),
	[TicketsSalesFilters.above75Sold]: __('tickets with 75% or more sold'),
	[TicketsSalesFilters.above50Sold]: __('tickets with 50% or more sold'),
	// eslint-disable-next-line @wordpress/i18n-translator-comments
	[TicketsSalesFilters.below50Sold]: __('tickets with less than 50% sold'),
};

export const salesIsChainedOptions = {
	...salesOptions,
	[TicketsSalesFilters.all]: __('all tickets for above dates'),
};

export const statusOptions = {
	[TicketsStatusFilters.all]: __('all tickets for all dates'),
	[TicketsStatusFilters.onSaleAndPending]: __('all on sale and sale pending'),
	[TicketsStatusFilters.onSaleOnly]: __('on sale tickets only'),
	[TicketsStatusFilters.pendingOnly]: __('sale pending tickets only'),
	[TicketsStatusFilters.nextOnSaleOrPendingOnly]: __('next on sale or sale pending only'),
	[TicketsStatusFilters.soldOutOnly]: __('sold out tickets only'),
	[TicketsStatusFilters.expiredOnly]: __('expired tickets only'),
	[TicketsStatusFilters.trashedOnly]: __('trashed tickets only'),
};

export const statusIsChainedOptions = {
	...statusOptions,
	[TicketsStatusFilters.all]: __('all tickets for above dates'),
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
