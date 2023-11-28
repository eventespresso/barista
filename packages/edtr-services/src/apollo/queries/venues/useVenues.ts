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

	const venues = data?.espressoVenues?.nodes || [];

	// need to make a copy else we can't sort it
	const sortedVenues = [...venues];

	// create a collator to sort the venues by name using the current locale and natural sort order
	const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
	sortedVenues.sort((a, b) => collator.compare(a.name, b.name));

	const cacheIds = getCacheIds(sortedVenues);
	return useMemoStringify(sortedVenues, cacheIds);
};
