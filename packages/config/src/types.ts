import type { AnyObject } from '@eventespresso/utils';
import type { User } from '@eventespresso/constants';

export interface EventEspressoDomData {
	api: ApiDomData;
	config: ConfigDomData;
	readonly domain: string;
	eei18n: EspressoTranslations;
	i18n: I18nData;
}

export type ApiDomData = {
	graphqlEndpoint: string;
	restApiBaseUrl: string;
	restApiCollectionEndpoints: AnyObject<string>;
	restApiNonce: string;
	restApiPrimaryKeys: AnyObject<string | [string]>;
	restApiRouteUrl: string;
};

export type ConfigDomData = {
	coreDomain: CoreDomainDomData;
	currentUser: User;
	generalSettings: GeneralSettingsProps;
	locale: LocaleDomData;
	siteCurrency: CurrencyProps;
	sitePermissions: Array<Capability>;
	siteUrls: SiteUrlProps;
	wp_debug: boolean;
};

export type CoreDomainDomData = {
	assetNamespace: string;
	brandName: string;
	coreVersion: string;
	distributionAssetsPath: string;
	distributionAssetsUrl: string;
	pluginPath: string;
	pluginUrl: string;
};

export interface EspressoTranslations {
	[key: string]: any; // translation strings
}

export interface I18nInfo {
	domain: string; // e.g. "event_espresso"
	lang: string; // e.g. "en_US"
	plural_forms?: string;
}

export type I18nData = {
	'': I18nInfo;
};

export interface LocaleDomData {
	user: string;
	site: string;
	siteTimezone: LocaleTimezoneDomData | {};
}

export interface LocaleTimezoneDomData {
	city: string;
	name: string;
	offset: number;
}

export type JsDataProps = {
	brandName: string;
	currency_config: CurrencyProps;
	eejs_api_nonce: string;
	locale: JsDataLocaleProps;
	paths: JsDataPathsProps;
	default_timezone: JsDataTimezoneProps;
};

type JsDataLocaleProps = {
	user: string;
	site: string;
};

type JsDataPathsProps = {
	admin_url: string;
	site_url: string;
};

type JsDataTimezoneProps = {
	pretty: string;
	string: string;
	offset: number;
};

type Capability = string;

export type ConfigDataProps = {
	brandName: string;
	currency: CurrencyProps;
	currentUser: User | undefined;
	dateTimeFormats: DateTimeFormatsProps;
	generalSettings: GeneralSettingsProps;
	locale: LocaleDomData;
	nonce: string;
	/* Permission for the whole site */
	sitePermissions?: Array<Capability>;
	siteUrl: SiteUrlProps;
	timezone: TimezoneProps | {};
	wp_debug: boolean;
};

export interface CurrencyProps {
	code: string;
	singularLabel: string;
	pluralLabel: string;
	sign: string;
	signB4: boolean;
	decimalPlaces: number;
	decimalMark: string;
	thousandsSeparator: string;
	subunits?: number;
}

export interface GeneralSettingsData {
	generalSettings: GeneralSettingsProps;
}

export interface GeneralSettingsProps {
	dateFormat: string;
	timeFormat: string;
	timezone: string;
}

export interface DateTimeFormatsProps {
	dateFormat: string;
	timeFormat: string;
	dateTimeFormat: string;
}

export interface LocaleProps {
	user: string;
	site: string;
}

export interface SiteUrlProps {
	admin: string;
	home: string;
}

export interface TimezoneProps {
	city: string;
	name: string;
	offset: number;
}
