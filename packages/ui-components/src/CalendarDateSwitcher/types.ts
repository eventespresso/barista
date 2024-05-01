import type { CalendarBaseProps } from '../types';
import type { StartAndEndDate } from '@eventespresso/types';

export interface CalendarDateLabels {
	header?: string;
	headerPast?: string;
	headerFuture?: string;
	footer?: string;
	footerPast?: string;
	footerFuture?: string;
}

export interface CalendarDateSwitcherProps extends CalendarBaseProps, StartAndEndDate.Type.String {
	className?: string;
	displayDate: DisplayStartOrEndDate;
	labels?: CalendarDateLabels;
	showDate?: boolean;
}

export enum DisplayStartOrEndDate {
	start = 'start',
	end = 'end',
	both = 'both',
}
