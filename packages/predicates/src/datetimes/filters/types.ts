import type { Datetime } from '@eventespresso/edtr-services';

export type DatetimeFilterFn = (dates: Array<Datetime>) => Array<Datetime>;

export interface DatesSalesFilter {
	dates: Datetime[];
	sales: DatetimeSalesFilters;
}

export interface DatesStatusFilter {
	dates: Datetime[];
	status: DatetimeStatusFilters;
}

export enum DatetimeSales {
	above90Capacity = 'above90Capacity',
	above75Capacity = 'above75Capacity',
	above50Capacity = 'above50Capacity',
	all = 'all',
	below50Capacity = 'below50Capacity',
}

export enum DatetimeStatus {
	activeUpcoming = 'activeUpcoming',
	activeOnly = 'activeOnly',
	all = 'all',
	expiredOnly = 'expiredOnly',
	nextActiveUpcomingOnly = 'nextActiveUpcomingOnly',
	recentlyExpiredOnly = 'recentlyExpiredOnly',
	soldOutOnly = 'soldOutOnly',
	trashedOnly = 'trashedOnly',
	upcomingOnly = 'upcomingOnly',
}
