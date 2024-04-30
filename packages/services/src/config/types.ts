import type { User } from '@eventespresso/data';

import type { Capability } from '../permissions';

// TODO: consolidate into package 'config'
export type ConfigDataProps = {
	brandName: string;
	currency: CurrencyProps;
	currentUser: User;
	dateTimeFormats: DateTimeFormatsProps;
	generalSettings: GeneralSettings;
	locale: LocaleProps;
	nonce: string;
	/* Permission for the whole site */
	sitePermissions?: Array<Capability>;
	siteUrl: SiteUrlProps;
	timezone: TimezoneProps;
	wp_debug: boolean;
};

// TODO: consolidate into package 'config'
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

// TODO: move under package 'data'
export interface GeneralSettingsData {
	generalSettings: GeneralSettings;
}

// TODO: move under package 'data'
export interface GeneralSettings {
	dateFormat: string;
	timeFormat: string;
	timezone: string;
}

// TODO: consolidate into package 'config'
export interface DateTimeFormatsProps {
	dateFormat: string;
	timeFormat: string;
	dateTimeFormat?: string;
}

// TODO: consolidate into package 'config'
export interface LocaleProps {
	user: string;
	site: string;
}

// TODO: consolidate into package 'config'
export interface SiteUrlProps {
	admin: string;
	home: string;
}

// TODO: consolidate into package 'config'
export interface TimezoneProps {
	city: string;
	name: string;
	offset: number;
}
