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

	export interface GeneralSettings {
		dateFormat: string;
		timeFormat: string;
		timezone: string;
	}

	export interface Config {
		brandName: string;
		currency: Currency;
		currentUser: User; // LATER: consolidate data types
		dateTimeFormats: DateTimeFormats;
		generalSettings: GeneralSettings;
		locale: Locale;
		nonce: string;
		sitePermissions?: string[]; // LATER: consolidate data types
		siteUrl: SiteUrls;
		timezone: Timezone;
		wp_debug: boolean;
	}
}
