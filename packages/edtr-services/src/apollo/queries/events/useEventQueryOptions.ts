import { useMemo } from 'react';

import type { CacheQueryOptions } from '@eventespresso/data';
import useEventGuid from '../events/useEventGuid';
import { GET_EVENT } from './queries';

const useEventQueryOptions = (): CacheQueryOptions => {
	const id = useEventGuid();

	return useMemo(
		() => ({
			query: GET_EVENT,
			variables: {
				id,
			},
		}),
		[id]
	);
};

export default useEventQueryOptions;
