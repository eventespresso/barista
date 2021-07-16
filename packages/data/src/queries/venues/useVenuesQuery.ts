import type { QueryHookOptions, QueryResult as ApolloQueryResult } from '@apollo/client';

import { useCacheQuery } from '../';
import type { VenuesList, VenuesQueryArgs } from './types';
import type { EntityEdge } from '../../types';

type QueryOptions<Edge extends EntityEdge> = QueryHookOptions<VenuesList<Edge>, VenuesQueryArgs>;
type QueryResult<Edge extends EntityEdge> = ApolloQueryResult<VenuesList<Edge>, VenuesQueryArgs>;

export const useVenuesQuery = <VenueEdge extends EntityEdge>(
	queryOptions: QueryOptions<VenueEdge>
): QueryResult<VenueEdge> => {
	return useCacheQuery<VenuesList<VenueEdge>>(queryOptions);
};
