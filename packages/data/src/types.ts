import type { EntityId, EntityDbId } from '@eventespresso/constants';

export type { EntityId, EntityDbId }; // re-export

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
