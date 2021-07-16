import { useMemo } from 'react';

import type { VenuesList, VenuesQueryArgs, CacheQueryOptions } from '@eventespresso/data';

import { GET_VENUES } from '../venues';
import type { VenueEdge } from '../../';

export type VenuesQueryOptions = CacheQueryOptions<VenuesList<VenueEdge>, VenuesQueryArgs>;

export const useVenueQueryOptions = (queryArgs?: VenuesQueryArgs['where']): VenuesQueryOptions => {
	return useMemo(() => {
		return {
			query: GET_VENUES,
			variables: {
				where: queryArgs,
			},
			fetchPolicy: 'cache-first',
		};
	}, [queryArgs]);
};
