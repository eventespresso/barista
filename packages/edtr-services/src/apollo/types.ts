import type { Datetime, Price, PriceType, Ticket, Venue } from '@eventespresso/constants';
import type { Entity, EntityEdge, DatetimesList as DatetimeList, TicketsList as TicketList } from '@eventespresso/data';

// re-export these types
export type {
	Datetime,
	Event,
	EventData,
	EventManager,
	Price,
	PriceType,
	Ticket,
	Venue,
	Attendee,
	EntityId,
	EntityDbId,
} from '@eventespresso/constants';

// re-export these values
export { DateStatus, PriceBasetype } from '@eventespresso/constants';

// type guard
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html
export const isDatetime = (entity: Entity): entity is Datetime => {
	return entity.__typename === 'EspressoDatetime';
};

export interface DatetimeItem {
	espressoDatetime: Datetime;
}

export type DatetimeEdge<Connection = 'EspressoRootQueryDatetimesConnection'> = EntityEdge<Datetime, Connection>;

export type DatetimesList = DatetimeList<DatetimeEdge>;

export type PriceEdge = EntityEdge<Price, 'EspressoRootQueryPricesConnection'>;

export interface PricesList {
	espressoPrices: PriceEdge;
}

export type TicketVisibility = 'ADMINS_ONLY' | 'ADMIN_UI_ONLY' | 'MEMBERS_ONLY' | 'NONE' | 'PUBLIC';

export interface TicketItem {
	espressoTicket: Ticket;
}

export type TicketEdge = EntityEdge<Ticket, 'EspressoRootQueryTicketsConnection'>;

export type TicketsList = TicketList<TicketEdge>;

export type PriceTypeEdge = EntityEdge<PriceType, 'EspressoRootQueryPriceTypesConnection'>;

export interface PriceTypesList {
	espressoPriceTypes: PriceTypeEdge;
}

export type VenueEdge = EntityEdge<Venue, 'RootQueryToEspressoVenueConnection'>;

export interface VenuesList {
	espressoVenues: VenueEdge;
}
