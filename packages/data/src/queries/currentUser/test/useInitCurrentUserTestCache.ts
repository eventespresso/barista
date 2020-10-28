import { WriteQueryOptions, useApolloClient } from '../../../';
import type { Viewer } from '../types';

import useCurrentUserQueryOptions from '../useCurrentUserQueryOptions';
import { currentUser } from './data';

const useInitCurrentUserTestCache = (viewer = currentUser): void => {
	// init hooks
	const client = useApolloClient();
	const queryOptions = useCurrentUserQueryOptions();

	const writeQueryOptions: WriteQueryOptions<Viewer> = {
		...queryOptions,
		data: {
			viewer,
		},
	};
	try {
		// write the test data to cache
		client.writeQuery(writeQueryOptions);
	} catch (error) {
		console.error(error);
	}
};
export default useInitCurrentUserTestCache;
