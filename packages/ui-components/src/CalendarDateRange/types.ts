import type { StartAndEndDate } from '@eventespresso/types';
import type { CalendarBaseProps, CalendarDateProps } from '../types';

export interface CalendarDateRangeProps
	extends CalendarDateProps,
		CalendarBaseProps,
		StartAndEndDate.Type.DateOrString {}
