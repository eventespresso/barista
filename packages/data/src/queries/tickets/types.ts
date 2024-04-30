import type { EntityQueryArgs } from '../types';
import type { EntityEdge } from '../../types';

// LATER: consolidate date types
export interface TicketsQueryWhereArgs {
	datetime?: string;
	datetimeId?: number;
	datetimeIdIn?: Array<number>;
	datetimeIn?: Array<string>;
	event?: string;
	eventId?: number;
	includeDefaultTickets?: boolean;
	isDefault?: boolean;
	isRequired?: boolean;
	isTaxable?: boolean;
	isTrashed?: boolean;
}

export type TicketsQueryArgs = EntityQueryArgs<TicketsQueryWhereArgs>;

export interface TicketsList<Edge extends EntityEdge> {
	espressoTickets: Edge;
}
