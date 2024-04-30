import type { User } from '@eventespresso/data';

export module Type {
	export interface Currency {
		code: string;
		singularLabel: string;
		pluralLabel: string;
		sign: string;
		signB4: boolean;
		decimalPlaces: number;
		decimalMark: string;
		thousandsSeparator: string;
		subunits: number;
	}

	export interface DateTimeFormats {
		dateFormat: string;
		timeFormat: string;
		dateTimeFormat: string;
	}

	export interface Locale {
		user: string;
		site: string;
	}

	export interface SiteUrls {
		admin: string;
		home: string;
	}

	export interface Timezone {
		city: string;
		name: string;
		offset: number;
	}
}

export type Api = {
	graphqlEndpoint: string;
	restApiBaseUrl: string;
	restApiCollectionEndpoints: Record<string, string>;
	restApiNonce: string;
	restApiPrimaryKeys: Record<string, string | [string]>;
	restApiRouteUrl: string;
};

export type Config = {
	brandName: string;
	currency: Type.Currency;
	currentUser: User; // LATER: consolidate data types
	dateTimeFormats: Type.DateTimeFormats;
	generalSettings: GeneralSettings;
	locale: Type.Locale;
	nonce: string;
	sitePermissions?: string[]; // LATER: consolidate data types
	siteUrl: Type.SiteUrls;
	timezone: Type.Timezone;
	wp_debug: boolean;
};

export interface GeneralSettings {
	dateFormat: string;
	timeFormat: string;
	timezone: string;
}

export type CoreDomainDomData = {
	assetNamespace: string;
	brandName: string;
	coreVersion: string;
	distributionAssetsPath: string;
	distributionAssetsUrl: string;
	pluginPath: string;
	pluginUrl: string;
};

export interface LocaleDomData {
	user: string;
	siteTimezone: LocaleTimezoneDomData;
	site: string;
}

export interface LocaleTimezoneDomData {
	city: string;
	name: string;
	offset: number;
}
