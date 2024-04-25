import type { User } from '@eventespresso/data';
import type { AnyObject } from '@eventespresso/utils';

import type { CurrencyProps, GeneralSettings, SiteUrlProps } from './config/types';
import type { Capability } from './permissions';

// TODO: consolidate data types
export interface EventEspressoDomData {
	api: ApiDomData;
	config: ConfigDomData;
	readonly domain: string;
	eei18n: EspressoTranslations;
	i18n: I18nData;
}

// TODO: consolidate data types
export type ApiDomData = {
	graphqlEndpoint: string;
	restApiBaseUrl: string;
	restApiCollectionEndpoints: AnyObject<string>;
	restApiNonce: string;
	restApiPrimaryKeys: AnyObject<string | [string]>;
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

// TODO: consolidate data types
export type CoreDomainDomData = {
	assetNamespace: string;
	brandName: string;
	coreVersion: string;
	distributionAssetsPath: string;
	distributionAssetsUrl: string;
	pluginPath: string;
	pluginUrl: string;
};

// TODO: consolidate data types
export interface EspressoTranslations {
	[key: string]: any; // translation strings
}

// TODO: consolidate data types
export interface I18nInfo {
	domain: string; // e.g. "event_espresso"
	lang: string; // e.g. "en_US"
	plural_forms?: string;
}

// TODO: consolidate data types
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
