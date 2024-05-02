import type { User as _User } from '@eventespresso/data';

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
		siteTimezone: Timezone;
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

	export interface GeneralSettings {
		dateFormat: string;
		timeFormat: string;
		timezone: string;
	}

	export interface Config {
		brandName: BrandName;
		currency: Currency;
		currentUser: User; // LATER: consolidate data types
		dateTimeFormats: DateTimeFormats;
		generalSettings: GeneralSettings;
		locale: Locale;
		nonce: Nonce;
		sitePermissions?: SitePermissions;
		siteUrl: SiteUrls;
		timezone: Timezone;
		wp_debug: WpDebug;
	}

	export type BrandName = string;

	export type Nonce = string;

	export type WpDebug = boolean;

	export type User = _User;

	export type SitePermissions = string[]; // LATER: consolidate data types
}
