import type { Datetime } from '@eventespresso/constants';
import type { IntervalType } from '@eventespresso/dates';

import { RemTicket } from '../../data';

export interface BaseProps {
	ticket: RemTicket;
}

export type TicketSatesFields = {
	position?: 'before' | 'after';
	startOrEnd?: 'start' | 'end';
	unit?: IntervalType;
	unitValue?: number;
};

export type TicketSalesDates = {
	startDate: string | Date;
	endDate: string | Date;
};

export interface RemTicketFields extends Partial<TicketSatesFields>, Partial<TicketSalesDates> {
	ticketSalesDates?: TicketSalesDates;
	ticketSalesStart?: TicketSatesFields;
	ticketSalesEnd?: TicketSatesFields;
	isShared?: boolean;
}

export interface TicketCardProps {
	onCopy?: VoidFunction;
	onTrash?: VoidFunction;
	ticket: RemTicket;
}

export interface OffsetProps {
	datetime: Datetime;
	ticket: RemTicket;
}

export interface Offset {
	startDuration: number;
	startUnit: string;
	endDuration: number;
	endUnit: string;
	endOffsetFrom?: string;
}
