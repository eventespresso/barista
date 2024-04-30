import { Type as ConfigType, Factory as ConfigFactory } from '@eventespresso/config';
import { useMemo } from 'react';

type Config = ConfigType.Config;

export const useConfigData = (): Config => {
	return useMemo(
		() => ({
			...ConfigFactory.make(),
		}),
		[
			// this type comes from package '@eventespresso/config'
			window.eventEspressoData.api?.restApiNonce,
			window.eventEspressoData.config?.coreDomain?.brandName,
			window.eventEspressoData.config?.currentUser,
			window.eventEspressoData.config?.generalSettings,
			window.eventEspressoData.config?.locale?.site,
			window.eventEspressoData.config?.locale?.siteTimezone,
			window.eventEspressoData.config?.locale?.user,
			window.eventEspressoData.config?.siteCurrency,
			window.eventEspressoData.config?.sitePermissions,
			window.eventEspressoData.config?.siteUrls?.admin,
			window.eventEspressoData.config?.siteUrls?.home,
			window.eventEspressoData.config?.wp_debug,
		]
	);
};
