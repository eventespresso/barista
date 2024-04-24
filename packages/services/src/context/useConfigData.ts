import { useMemoStringify } from '@eventespresso/utils';
import { useMemo } from 'react';
import {
	ConfigDataProps,
	Currency,
	DateTimeFormats,
	Locale,
	LocaleProps,
	SiteUrl,
	Timezone,
} from '@eventespresso/config';

export const useConfigData = () => {
	const api = useMemoStringify(window?.eventEspressoData?.api);
	const config = useMemoStringify(window?.eventEspressoData?.config);

	return useMemo(
		() => ({
			brandName: config?.coreDomain?.brandName || 'Event Espresso',
			currency: Currency(config?.siteCurrency),
			currentUser: config?.currentUser,
			generalSettings: config?.generalSettings,
			dateTimeFormats: DateTimeFormats({
				dateFormat: config?.generalSettings?.dateFormat,
				timeFormat: config?.generalSettings?.timeFormat,
			}),
			locale: Locale({
				site: config?.locale?.site || '',
				siteTimezone: config?.locale?.siteTimezone || {},
				user: config?.locale?.user || '',
			} as LocaleProps),
			nonce: api?.restApiNonce || '',
			sitePermissions: config?.sitePermissions || [],
			siteUrl: SiteUrl({
				admin: config?.siteUrls?.admin || '',
				home: config?.siteUrls?.home || '',
			}),
			timezone: Timezone({
				city: config?.locale?.siteTimezone?.city || '',
				name: config?.locale?.siteTimezone?.name || '',
				offset: config?.locale?.siteTimezone?.offset || 0,
			}),
			wp_debug: config?.wp_debug || false,
		}),
		[
			api?.restApiNonce,
			config?.coreDomain?.brandName,
			config?.currentUser,
			config?.generalSettings,
			config?.locale?.site,
			config?.locale?.siteTimezone,
			config?.locale?.user,
			config?.siteCurrency,
			config?.sitePermissions,
			config?.siteUrls?.admin,
			config?.siteUrls?.home,
			config?.wp_debug,
		]
	);
};
