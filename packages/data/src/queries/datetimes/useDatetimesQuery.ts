import type { QueryHookOptions, QueryResult as ApolloQueryResult } from '@apollo/react-hooks';

import { useCacheQuery } from '../';
import type { DatetimesList, DatetimesQueryArgs } from './types';
import type { EntityEdge } from '../../types';

type QueryOptions<Edge extends EntityEdge> = QueryHookOptions<DatetimesList<Edge>, DatetimesQueryArgs>;
type QueryResult<Edge extends EntityEdge> = ApolloQueryResult<DatetimesList<Edge>, DatetimesQueryArgs>;

const useDatetimesQuery = <DatetimeEdge extends EntityEdge>(
	queryOptions: QueryOptions<DatetimeEdge>
): QueryResult<DatetimeEdge> => {
	return useCacheQuery<DatetimesList<DatetimeEdge>>(queryOptions);
};

export default useDatetimesQuery;
