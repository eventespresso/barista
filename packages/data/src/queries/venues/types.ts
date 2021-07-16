import type { EntityQueryArgs } from '../types';
import type { EntityEdge } from '../../types';

export interface VenuesQueryWhereArgs {}

export type VenuesQueryArgs = EntityQueryArgs<VenuesQueryWhereArgs>;

export interface VenuesList<Edge extends EntityEdge> {
	espressoVenues: Edge;
}
