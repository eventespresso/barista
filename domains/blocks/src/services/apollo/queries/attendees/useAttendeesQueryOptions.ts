import { useMemo } from 'react';

import type { AttendeesQueryWhereArgs, QueryHookOptions } from '@eventespresso/data';

import { AttendeesList } from '@blocksServices/apollo/types';
import { GET_ATTENDEES } from './queries';

const useAttendeesQueryOptions = (where: AttendeesQueryWhereArgs, limit?: number): QueryHookOptions<AttendeesList> => {
	return useMemo<QueryHookOptions<AttendeesList>>(
		() => ({
			query: GET_ATTENDEES,
			variables: {
				first: limit,
				where,
			},
			fetchPolicy: 'cache-first',
			// do not fetch until an event has been selected
			// otherwise, we will end up fetching unrelated attendees
			skip: !where.event,
		}),
		[limit, where]
	);
};

export default useAttendeesQueryOptions;
