import { useMemo } from 'react';

import { useCacheQuery, User, UsersList, QueryHookOptions } from '@eventespresso/data';
import { useMemoStringify } from '@eventespresso/hooks';
import { GET_EVENT_MANAGERS } from './queries';

const useEventManagers = (): Array<Partial<User>> => {
	const options = useMemo<QueryHookOptions>(
		() => ({
			query: GET_EVENT_MANAGERS,
			variables: {
				where: {
					roleIn: ['EVENTS_ADMINISTRATOR', 'ADMINISTRATOR'],
				},
			},
			fetchPolicy: 'cache-first',
		}),
		[]
	);

	const { data } = useCacheQuery<UsersList>(options);

	return useMemoStringify(data?.users?.nodes || []);
};

export default useEventManagers;
