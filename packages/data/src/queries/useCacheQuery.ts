import { useMemo } from 'react';
import { useQuery, QueryHookOptions, QueryResult } from '@apollo/react-hooks';

const useCacheQuery = <TData = any>(queryOptions: QueryHookOptions<TData>): QueryResult<TData> => {
	const options = useMemo<QueryHookOptions<TData>>(() => ({ fetchPolicy: 'cache-only', ...queryOptions }), [
		queryOptions,
	]);
	return useQuery<TData>(options.query, options);
};

export default useCacheQuery;
