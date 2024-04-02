import { useMemo } from 'react';

import useCurrentUserQueryOptions from './useCurrentUserQueryOptions';
import { useCacheQuery } from '../';

import type { User } from '@eventespresso/constants';
import type { Viewer } from './types';

/**
 * A custom react hook for retrieving CurrentUser
 */
const useCurrentUser = (): User => {
	const options = useCurrentUserQueryOptions();
	const { data } = useCacheQuery<Viewer>(options);

	const dataStr = JSON.stringify(data?.viewer);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useMemo(() => data?.viewer, [dataStr]);
};

export default useCurrentUser;
