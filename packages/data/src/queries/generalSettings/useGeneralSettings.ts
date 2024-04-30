import { useMemo } from 'react';

import type { GeneralSettings, GeneralSettingsData } from '@eventespresso/data';

import useGeneralSettingsQueryOptions from './useGeneralSettingsQueryOptions';
import { useCacheQuery } from '../';

/**
 * A custom react hook for retrieving GeneralSettings
 */
const useGeneralSettings = (): GeneralSettings => {
	const options = useGeneralSettingsQueryOptions();
	const { data } = useCacheQuery<GeneralSettingsData>(options);

	const dataStr = JSON.stringify(data?.generalSettings);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useMemo(() => data?.generalSettings, [dataStr]);
};

export default useGeneralSettings;
