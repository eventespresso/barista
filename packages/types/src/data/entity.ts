export module Entity {
	export interface Interface<T extends Type> {
		id: Id;
		dbId: DbId;
		__typename: T;
	}

	export interface Trashable {
		isTrashed: boolean;
	}
}

type Id = string; // UUID
type DbId = number;

/**
 * Entity type, unless otherwise stated, the entity/type comes from EE core
 * @see plugins/event-espresso-core/core/domain/services/graphql/types/*.php
 */
type Type =
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
