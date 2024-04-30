import type {
	Address,
	Entity,
	EntityId,
	EntityEdge,
	Trashable,
	DatetimesList as DatetimeList,
	TicketsList as TicketList,
	User,
} from '@eventespresso/data';

import type { StartAndEndDate } from '@eventespresso/types';

// LATER: consolidate data types
export interface Event extends Entity {
	allowDonations: boolean;
	allowOverflow: boolean;
	altRegPage: string;
	created: string;
	defaultRegStatus: string;
	description: string;
	displayDescription: boolean;
	displayTicketSelector: boolean;
	isActive: boolean;
	isCancelled: boolean;
	isExpired: boolean;
	isInactive: boolean;
	isPostponed: boolean;
	isSoldOut: boolean;
	isUpcoming: boolean;
	manager?: EventManager;
	maxRegistrations: number;
	memberOnly: boolean;
	name: string;
	order: number;
	phoneNumber: string;
	shortDescription: string;
	status: string;
	timezoneString: string;
	venue: EntityId; // UUID
}

export type EventManager = Pick<User, 'id' | 'name'>;

// LATER: consolidate data types
export interface EventData {
	espressoEvent: Event;
}

// LATER: consolidate data types
export enum DateStatus {
	soldOut = 'DTS',
	active = 'DTA',
	upcoming = 'DTU',
	postponed = 'DTP',
	cancelled = 'DTC',
	expired = 'DTE',
	inactive = 'DTI',
}

// LATER: consolidate data types
export interface Datetime extends Entity, Trashable, StartAndEndDate.Type.String {
	__typename: 'EspressoDatetime';
	capacity: number;
	description: string;
	isActive: boolean;
	isExpired: boolean;
	isPrimary: boolean;
	isSoldOut: boolean;
	isUpcoming: boolean;
	length: number;
	name: string;
	order: number;
	reserved: number;
	sold: number;
	status: DateStatus;
	venue: EntityId; // UUID
}

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

// LATER: consolidate data types
export interface Price extends Entity, Trashable {
	amount: number;
	description: string;
	isBasePrice: boolean;
	isDefault: boolean;
	isDiscount: boolean;
	isPercent: boolean;
	isTax: boolean;
	name: string;
	order: number;
	overrides: number;
}

export type PriceEdge = EntityEdge<Price, 'EspressoRootQueryPricesConnection'>;

export interface PricesList {
	espressoPrices: PriceEdge;
}

export type TicketVisibility = 'ADMINS_ONLY' | 'ADMIN_UI_ONLY' | 'MEMBERS_ONLY' | 'NONE' | 'PUBLIC';

// LATER: consolidate data types
export interface Ticket extends Entity, Trashable, StartAndEndDate.Type.String {
	description: string;
	isDefault: boolean;
	isExpired: boolean;
	isFree: boolean;
	isOnSale: boolean;
	isPending: boolean;
	isRequired: boolean;
	isSoldOut: boolean;
	max: number;
	min: number;
	name: string;
	order: number;
	price: number;
	prices?: PriceEdge; // for create and update ticket mutation
	quantity: number;
	registrationCount: number;
	reserved: number;
	reverseCalculate: boolean;
	sold: number;
	userId: EntityId;
	uses: number;
	visibility: TicketVisibility;
}

export interface TicketItem {
	espressoTicket: Ticket;
}

export type TicketEdge = EntityEdge<Ticket, 'EspressoRootQueryTicketsConnection'>;

export type TicketsList = TicketList<TicketEdge>;

export enum PriceBasetype {
	BASE_PRICE = 'BASE_PRICE',
	DISCOUNT = 'DISCOUNT',
	SURCHARGE = 'SURCHARGE',
	TAX = 'TAX',
}

// LATER: consolidate data types
export interface PriceType extends Entity, Trashable {
	baseType: PriceBasetype;
	isBasePrice: boolean;
	isDiscount: boolean;
	isPercent: boolean;
	isTax: boolean;
	name: string;
	order: number;
}

export type PriceTypeEdge = EntityEdge<PriceType, 'EspressoRootQueryPriceTypesConnection'>;

export interface PriceTypesList {
	espressoPriceTypes: PriceTypeEdge;
}

// LATER: consolidate data types
export interface Venue extends Entity, Address {
	capacity: number;
	description: string;
	googleMapLink: string;
	name: string;
	phone: string;
	shortDescription: string;
	thumbnail: string;
	url: string;
}

export type VenueEdge = EntityEdge<Venue, 'RootQueryToEspressoVenueConnection'>;

export interface VenuesList {
	espressoVenues: VenueEdge;
}
