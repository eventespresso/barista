import type { DatetimeEdge, TicketEdge, PriceEdge, PriceTypeEdge, VenueEdge } from '../types';
import { EntityEdge } from '@eventespresso/data';

export const DEFAULT_ENTITY_LIST_DATA: EntityEdge = {
	nodes: [],
	__typename: '',
};

export const DEFAULT_DATETIME_LIST_DATA: DatetimeEdge = {
	nodes: [],
	__typename: 'EspressoRootQueryDatetimesConnection',
};

export const DEFAULT_TICKET_LIST_DATA: TicketEdge = {
	nodes: [],
	__typename: 'EspressoRootQueryTicketsConnection',
};

export const DEFAULT_PRICE_LIST_DATA: PriceEdge = {
	nodes: [],
	__typename: 'EspressoRootQueryPricesConnection',
};

export const DEFAULT_PRICE_TYPE_LIST_DATA: PriceTypeEdge = {
	nodes: [],
	__typename: 'EspressoRootQueryPriceTypesConnection',
};

export const DEFAULT_VENUE_LIST_DATA: VenueEdge = {
	nodes: [],
	__typename: 'RootQueryToEspressoVenueConnection',
};

export * from './datetimes';

export * from './events';

export * from './tickets';

export * from './prices';

export * from './priceTypes';

export * from './users';

export * from './venues';

export * from './types';
