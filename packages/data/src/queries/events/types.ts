import type { EntityQueryArgs } from '../types';
import type { EntityEdge } from '../../types';

export type EventsQueryArgs = EntityQueryArgs<Record<string, any>>;

export interface EventsList<Edge extends EntityEdge> {
	espressoEvents: Edge;
}
