import { useMemo } from 'react';

import { useCacheQuery } from '@eventespresso/data';
import type { FetchQueryResult } from '@eventespresso/data';

import type { EventData } from '../../types';
import { GET_EVENT } from './queries';

export const useEvent = (id: string): FetchQueryResult<EventData> => {
	const options = useMemo(
		() => ({
			query: GET_EVENT,
			variables: {
				id,
			},
			fetchPolicy: 'cache-first' as const,
		}),
		[id]
	);

	return useCacheQuery<EventData>(options);
};
