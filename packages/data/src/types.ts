// LATER: consolidate data types
export type EntityId = string;

// LATER: consolidate data types
export type EntityDbId = number;

// LATER: consolidate data types
export interface Cacheable {
	cacheId: string;
}

// LATER: consolidate data types
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

// LATER: consolidate data types
export interface EntityEdge<E = Entity, ConnectionTypeName = string> {
	nodes: E[];
	__typename: ConnectionTypeName;
}

// LATER: consolidate data types
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

export interface GeneralSettingsData {
	generalSettings: GeneralSettings;
}

// LATER: consolidate into package 'config'
export interface GeneralSettings {
	dateFormat: string;
	timeFormat: string;
	timezone: string;
}
