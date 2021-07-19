import { useMemo } from 'react';

import useUpdateEntityList from './useUpdateEntityList';
import { VenuesList, useVenueQueryOptions } from '../../apollo';
import { CacheUpdaterFn, WriteQueryOptions } from '@eventespresso/data';

const useUpdateVenueList = (
	writeQueryOptions: WriteQueryOptions<VenuesList> = undefined
): CacheUpdaterFn<VenuesList> => {
	const queryOptions = useVenueQueryOptions();
	const options = useMemo(
		() => ({
			...queryOptions,
			...writeQueryOptions,
		}),
		[queryOptions, writeQueryOptions]
	);
	return useUpdateEntityList<VenuesList>(options);
};

export default useUpdateVenueList;
