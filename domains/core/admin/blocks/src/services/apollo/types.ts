import type {
	Address,
	AttendeesList as AttendeeList,
	DatetimesList as DatetimeList,
	Entity,
	EntityEdge,
	EventsList as EventList,
	TicketsList as TicketList,
} from '@eventespresso/data';

/**
 * Properties of GraphQL types i.e. entities which extend Entity type are taken from EE Core
 * There are simply too many types (including nested ones) so at any given point in time these types are *not* comprehensive
 * So if properties for certain GraphQL types are missing, it is necessary to update the types here
 * @see plugins/event-espresso-core/core/domain/services/graphql/types
 */

export interface Attendee extends Entity, Address {
	avatar?: string;
	bio?: string;
	email?: string;
	firstName?: string;
	fullName: string;
	lastName?: string;
	phone?: string;
	shortBio?: string;
}

export type AttendeeEdge<Connection = 'EspressoRootQueryAttendeesConnection'> = EntityEdge<Attendee, Connection>;

export type AttendeesList = AttendeeList<AttendeeEdge>;

export interface Event extends Entity {
	description: string;
	name: string;
	shortDescription: string;
}

export interface EventData {
	espressoEvent: Event;
}

export type EventEdge<Connection = 'RootQueryToEspressoEventConnection'> = EntityEdge<Event, Connection>;

export type EventsList = EventList<EventEdge>;

export interface Datetime extends Entity {
	name: string;
}

export type DatetimeEdge<Connection = 'EspressoRootQueryDatetimesConnection'> = EntityEdge<Datetime, Connection>;

export type DatetimesList = DatetimeList<DatetimeEdge>;

export interface Ticket extends Entity {
	name: string;
}

export type TicketEdge<Connection = 'EspressoRootQueryTicketsConnection'> = EntityEdge<Ticket, Connection>;

export type TicketsList = TicketList<TicketEdge>;
