import type { Datetime } from '@eventespresso/constants';
import type { DatetimeSales, DatetimeStatus } from '../types';

export type DatetimeFilterFn = (dates: Array<Datetime>) => Array<Datetime>;

export interface DatesSalesFilter {
	dates: Datetime[];
	sales: DatetimeSales;
}

export interface DatesStatusFilter {
	dates: Datetime[];
	status: DatetimeStatus;
}
