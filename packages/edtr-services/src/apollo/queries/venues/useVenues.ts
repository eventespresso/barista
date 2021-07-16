import { useVenuesQuery } from '@eventespresso/data';
import { useMemoStringify } from '@eventespresso/hooks';
import { getCacheIds } from '@eventespresso/predicates';

import type { Venue, VenueEdge } from '../../types';
import { useVenueQueryOptions } from './useVenueQueryOptions';

/**
 * A custom react hook to retrieve all the venues from cache
 */
export const useVenues = (): Venue[] => {
	const options = useVenueQueryOptions();

	const { data } = useVenuesQuery<VenueEdge>(options);

	const nodes = data?.espressoVenues?.nodes || [];

	const cacheIds = getCacheIds(nodes);

	return useMemoStringify(nodes, cacheIds);
};
