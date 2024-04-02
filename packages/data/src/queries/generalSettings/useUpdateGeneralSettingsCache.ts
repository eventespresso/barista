import type { CacheUpdaterFn, WriteQueryOptions } from '../types';
import useUpdateCache from '../useUpdateCache';
import type { GeneralSettingsData } from '@eventespresso/config';

const useUpdateGeneralSettingsCache = (
	writeQueryOptions: WriteQueryOptions<GeneralSettingsData> = undefined
): CacheUpdaterFn<GeneralSettingsData> => {
	return useUpdateCache<GeneralSettingsData>(writeQueryOptions);
};

export default useUpdateGeneralSettingsCache;
