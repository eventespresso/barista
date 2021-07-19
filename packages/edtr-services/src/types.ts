import type { OptionsType } from '@eventespresso/adapters';
import type { User } from '@eventespresso/data';
import type { GeneralSettings, RelationalData } from '@eventespresso/services';
import type { FormSectionRaw, FormElementRaw } from '@eventespresso/form-builder';
import type { DatetimeEdge, TicketEdge, PriceEdge, PriceTypeEdge, Event, EventManager, VenueEdge } from './apollo';

export type TicketMeta = {
	visibilityOptions: OptionsType;
};

export type EdtrFormBuilderData = {
	sections: Array<FormSectionRaw>;
	elements: Array<FormElementRaw>;
	topLevelSectionId?: string;
};

export interface EventEditorData {
	datetimes?: DatetimeEdge;
	event?: Event;
	eventManagers?: Array<EventManager>;
	formBuilder?: EdtrFormBuilderData;
	priceTypes?: PriceTypeEdge;
	prices?: PriceEdge;
	relations?: RelationalData;
	ticketMeta?: TicketMeta;
	tickets?: TicketEdge;
	venues?: VenueEdge;
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
	DEFAULT_TICKETS = 'defaultTickets',
	EDIT_DATE = 'editDate',
	EDIT_TICKET = 'editTicket',
	NEW_DATE = 'newDate',
	TAM = 'tam',
	TPC = 'tpc',
}
