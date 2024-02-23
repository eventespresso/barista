import type { Datetime } from '@eventespresso/edtr-services';
import type { DatetimeSalesFilters, DatetimeStatusFilters } from '../types';

export type DatetimeFilterFn = (dates: Array<Datetime>) => Array<Datetime>;

export interface DatesSalesFilter {
	dates: Datetime[];
	sales: DatetimeSalesFilters;
}

export interface DatesStatusFilter {
	dates: Datetime[];
	status: DatetimeStatusFilters;
}
