export type EntityId = string;

export type EntityDbId = number;

export interface Cacheable {
	cacheId: string;
}

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

export interface EntityEdge<E = Entity, ConnectionTypeName = string> {
	nodes: E[];
	__typename: ConnectionTypeName;
}

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
