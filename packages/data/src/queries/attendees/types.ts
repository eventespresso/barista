import type { EntityQueryArgs, EntityQueryOrderBy } from '../types';
import type { EntityEdge } from '../../types';
import type { RegistrationStatus } from '../registrations/types';
import type { EntityDbId, EntityId } from '@eventespresso/constants';

export interface AttendeesQueryWhereArgs {
	event?: EntityId;
	eventIn?: Array<EntityId>;
	datetime?: EntityId;
	datetimeIn?: Array<EntityId>;
	orderby?: EntityQueryOrderBy<AttendeesOrderByFields>;
	regStatus?: RegistrationStatus;
	regTicket?: EntityId;
	regTicketId?: EntityDbId;
	regTicketIdIn?: Array<EntityDbId>;
	regTicketIn?: Array<EntityId>;
}

export type AttendeesOrderByFields = 'ID' | 'FIRST_NAME' | 'LAST_NAME';

export type AttendeesQueryArgs = EntityQueryArgs<AttendeesQueryWhereArgs>;

export interface AttendeesList<Edge extends EntityEdge> {
	espressoAttendees: Edge;
}
