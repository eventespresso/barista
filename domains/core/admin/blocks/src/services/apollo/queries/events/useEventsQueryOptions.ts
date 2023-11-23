import { useMemo } from 'react';

import type { QueryHookOptions } from '@eventespresso/data';

import { EventsList } from '@blocksServices/apollo/types';
import { GET_EVENTS } from './queries';

const useEventsQueryOptions = (): QueryHookOptions<EventsList> => {
	return useMemo<QueryHookOptions<EventsList>>(
		() => ({
			query: GET_EVENTS,
			variables: {
				first: 250,
			},
			fetchPolicy: 'cache-first',
		}),
		[]
	);
};

export default useEventsQueryOptions;
