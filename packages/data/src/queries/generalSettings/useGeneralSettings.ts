import { useMemo } from 'react';

import type { GeneralSettingsProps, GeneralSettingsData } from '@eventespresso/config';

import useGeneralSettingsQueryOptions from './useGeneralSettingsQueryOptions';
import { useCacheQuery } from '../';

/**
 * A custom react hook for retrieving GeneralSettings
 */
const useGeneralSettings = (): GeneralSettingsProps => {
	const options = useGeneralSettingsQueryOptions();
	const { data } = useCacheQuery<GeneralSettingsData>(options);

	const dataStr = JSON.stringify(data?.generalSettings);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useMemo(() => data?.generalSettings, [dataStr]);
};

export default useGeneralSettings;
