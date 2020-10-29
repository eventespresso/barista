import type { CacheUpdaterFn, WriteQueryOptions } from '../types';
import useUpdateCache from '../useUpdateCache';
import type { Viewer } from './types';

const useUpdateCurrentUserCache = (
	writeQueryOptions: WriteQueryOptions<Viewer> = undefined
): CacheUpdaterFn<Viewer> => {
	return useUpdateCache<Viewer>(writeQueryOptions);
};

export default useUpdateCurrentUserCache;
