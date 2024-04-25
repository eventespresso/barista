// TODO: consolidate data types
export type EntityId = string;

// TODO: consolidate data types
export type EntityDbId = number;

// TODO: consolidate data types
export interface Cacheable {
	cacheId: string;
}

// TODO: consolidate data types
export interface Entity extends Cacheable {
	id: EntityId;
	dbId: EntityDbId;
	// unless otherwise stated, the entity/type comes from EE core i.e.
	// plugins/event-espresso-core/core/domain/services/graphql/types/*.php
	__typename?:
		| 'EspressoAttendee'
		| 'EspressoCountry'
		| 'EspressoDatetime'
		| 'EspressoEvent'
		| 'EspressoFormElement'
		| 'EspressoFormSection'
		| 'EspressoPrice'
		| 'EspressoPriceType'
		| 'EspressoRootQuery'
		| 'EspressoState'
		| 'EspressoTicket'
		| 'EspressoVenue'
		| 'EspressoRecurrence'; // Recuring Events Manager (REM)
}

export interface Trashable {
	isTrashed: boolean;
}

// TODO: consolidate data types
export interface EntityEdge<E = Entity, ConnectionTypeName = string> {
	nodes: E[];
	__typename: ConnectionTypeName;
}

// TODO: consolidate data types
export interface Address {
	address?: string;
	address2?: string;
	city?: string;
	country?: string;
	countryISO?: string;
	countryName?: string;
	state?: string;
	stateAbbrev?: string;
	stateName?: string;
	zip?: string;
}
