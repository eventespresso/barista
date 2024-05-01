import type { EntityQueryArgs } from '../types';
import type { EntityEdge } from '../../types';

// TODO: use appropriate types instead of generic ones
export interface RecurrencesQueryWhereArgs {
	datetime?: string;
	datetimeId?: number;
	datetimeIdIn?: Array<number>;
	datetimeIn?: Array<string>;
	event?: string;
	eventId?: number;
}

export type RecurrencesQueryArgs = EntityQueryArgs<RecurrencesQueryWhereArgs>;

export interface RecurrencesList<Edge extends EntityEdge> {
	espressoRecurrences: Edge;
}
