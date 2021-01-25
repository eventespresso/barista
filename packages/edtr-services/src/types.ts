import type { User } from '@eventespresso/data';
import type { GeneralSettings, RelationalData } from '@eventespresso/services';
import type { IntervalType } from '@eventespresso/dates';
import type { DatetimeEdge, TicketEdge, PriceEdge, PriceTypeEdge, Event, EventManager } from './apollo';

export interface EventEditorData {
	event?: Event;
	eventManagers?: Array<EventManager>;
	datetimes?: DatetimeEdge;
	tickets?: TicketEdge;
	prices?: PriceEdge;
	priceTypes?: PriceTypeEdge;
	relations?: RelationalData;
}

export interface EditorData {
	eventEditor: EventEditorData;
	currentUser?: User;
	generalSettings?: GeneralSettings;
}

export interface EventEditorDomData {
	eventEditor: EventEditorData;
}

export enum EdtrGlobalModals {
	EDIT_DATE = 'editDate',
	EDIT_TICKET = 'editTicket',
	NEW_DATE = 'newDate',
	TAM = 'tam',
	TPC = 'tpc',
}

export type TicketSalesFields = {
	position?: 'before' | 'after';
	startOrEnd?: 'start' | 'end';
	unit?: IntervalType;
	unitValue?: number;
};
