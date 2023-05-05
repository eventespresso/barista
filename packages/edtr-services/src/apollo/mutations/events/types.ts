import type { EntityId } from '@eventespresso/data';
import type { Event } from '../../';

type PickedProps =
	| 'allowDonations'
	| 'allowOverflow'
	| 'altRegPage'
	| 'defaultRegStatus'
	| 'description'
	| 'displayDescription'
	| 'displayTicketSelector'
	| 'manager'
	| 'maxRegistrations'
	| 'memberOnly'
	| 'name'
	| 'order'
	| 'phoneNumber'
	| 'shortDescription'
	| 'status'
	| 'timezoneString'
	| 'venue';

export interface EventBaseInput extends Partial<Pick<Event, PickedProps>> {}

export interface UpdateEventInput extends EventBaseInput {
	id?: EntityId;
}

export type EventMutationResult = {
	espressoEvent: Event;
};

export type UpdateEventResult = {
	updateEspressoEvent: EventMutationResult;
};
