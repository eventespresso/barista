import { useCallback } from 'react';

import { EntityId, useApolloClient } from '@eventespresso/data';
import { GET_DATETIME } from './queries';

export type RefreshDatetimes = (ids: Array<EntityId>) => void;

/**
 * Refreshes the local cache for the given datetimes, if needed.
 */
const useRefreshDatetimes = (): RefreshDatetimes => {
	const client = useApolloClient();

	return useCallback<RefreshDatetimes>(
		(ids) => {
			ids.forEach((id) => {
				client.query({
					query: GET_DATETIME,
					fetchPolicy: 'network-only',
					variables: {
						id,
					},
				});
			});
		},
		[client]
	);
};

export default useRefreshDatetimes;
