import type { User } from '@eventespresso/data';

import type { CurrencyProps, GeneralSettings, SiteUrlProps } from './config/types';
import type { Capability } from './permissions';

// LATER: consolidate data types
export interface EventEspressoDomData {
	api: ApiDomData;
	config: ConfigDomData;
	readonly domain: string;
	eei18n: EspressoTranslations;
	i18n: I18nData;
}

// LATER: consolidate data types
export type ApiDomData = {
	graphqlEndpoint: string;
	restApiBaseUrl: string;
	restApiCollectionEndpoints: Record<string, string>;
	restApiNonce: string;
	restApiPrimaryKeys: Record<string, string | [string]>;
	restApiRouteUrl: string;
};

// TODO: consolidate into package 'config'
export type ConfigDomData = {
	coreDomain: CoreDomainDomData;
	currentUser: User;
	generalSettings: GeneralSettings;
	locale: LocaleDomData;
	siteCurrency: CurrencyProps;
	sitePermissions: Array<Capability>;
	siteUrls: SiteUrlProps;
	wp_debug: boolean;
};

// LATER: consolidate data types
export type CoreDomainDomData = {
	assetNamespace: string;
	brandName: string;
	coreVersion: string;
	distributionAssetsPath: string;
	distributionAssetsUrl: string;
	pluginPath: string;
	pluginUrl: string;
};

// LATER: consolidate data types
export interface EspressoTranslations {
	[key: string]: any; // translation strings
}

// LATER: consolidate data types
export interface I18nInfo {
	domain: string; // e.g. "event_espresso"
	lang: string; // e.g. "en_US"
	plural_forms?: string;
}

// LATER: consolidate data types
export type I18nData = {
	'': I18nInfo;
};

// TODO: consolidate into package 'config'
export interface LocaleDomData {
	user: string;
	siteTimezone: LocaleTimezoneDomData;
	site: string;
}

// TODO: consolidate into package 'config'
export interface LocaleTimezoneDomData {
	city: string;
	name: string;
	offset: number;
}
