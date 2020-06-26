import { renderHook } from '@testing-library/react-hooks';

import { useGeneralSettings } from '..';
import { ApolloMockedProvider } from '@eventespresso/edtr-services/src/context/test';
import { generalSettings, successMocks } from './data';
import useInitGeneralSettingsTestCache from './useInitGeneralSettingsTestCache';

describe('useGeneralSettings', () => {
	it('checks for the general settings when the cache is empty', () => {
		const wrapper = ApolloMockedProvider([], false);
		const { result } = renderHook(() => useGeneralSettings(), { wrapper });

		expect(result.current).toBe(undefined);
	});

	it('checks for the general settings when the cache is NOT empty', async () => {
		const wrapper = ApolloMockedProvider(successMocks, false);
		const { result } = renderHook(
			() => {
				useInitGeneralSettingsTestCache();
				return useGeneralSettings();
			},
			{ wrapper }
		);

		expect(result.current).toBeDefined();
	});

	it('checks for general settings props', async () => {
		const wrapper = ApolloMockedProvider(successMocks, false);
		const { result } = renderHook(
			() => {
				useInitGeneralSettingsTestCache();
				return useGeneralSettings();
			},
			{ wrapper }
		);

		const { current: cachedSettings } = result;

		expect(cachedSettings).toBeDefined();

		expect(cachedSettings.dateFormat).toEqual(generalSettings.dateFormat);

		expect(cachedSettings.timeFormat).toEqual(generalSettings.timeFormat);

		expect(cachedSettings).toEqual(generalSettings);
	});
});
