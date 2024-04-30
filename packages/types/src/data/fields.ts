export module Field {
	export type UniqueId = string; // globally unique ID
	export type DatabaseId = number;

	export module Typename {
		export type WordPress = 'User';

		/**
		 * Custom GraphQL object types
		 * @see plugins/event-espresso-core/core/domain/services/graphql/types/*.php
		 */
		export type EventEspresso =
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

		export type Any = WordPress | EventEspresso;
	}
}
