import { CalendarBaseProps } from '../types';

export interface CalendarDateLabels {
	header?: string;
	headerPast?: string;
	headerFuture?: string;
	footer?: string;
	footerPast?: string;
	footerFuture?: string;
}

export interface CalendarDateSwitcherProps extends CalendarBaseProps {
	className?: string;
	displayDate: DisplayStartOrEndDate;
	endDate: string; // ISO string?
	labels?: CalendarDateLabels;
	showDate?: boolean;
	startDate: string; // ISO string?
}

export enum DisplayStartOrEndDate {
	start = 'start',
	end = 'end',
	both = 'both',
}
