import {
	Type,
	EventEspressoData,
	BrandName,
	Currency,
	DateTimeFormats,
	Locale,
	Nonce,
	SiteUrls,
	Timezone,
	WpDebug,
	User,
	GeneralSettings,
	SitePermissions,
} from '.';

export class Factory {
	public static make(): Type.Config {
		const factory = new Factory(window.eventEspressoData);
		return factory.get();
	}

	private api;
	private config;

	constructor(data?: EventEspressoData) {
		this.api = data?.api;
		this.config = data?.config;
	}

	get = (): Type.Config => ({
		brandName: BrandName(this.config?.coreDomain.brandName),
		currency: Currency(this.config?.siteCurrency),
		currentUser: User(this.config?.currentUser),
		generalSettings: GeneralSettings(this.config?.generalSettings),
		dateTimeFormats: DateTimeFormats(this.config?.generalSettings),
		locale: Locale(this.config?.locale),
		nonce: Nonce(this.api?.restApiNonce),
		sitePermissions: SitePermissions(this.config?.sitePermissions),
		siteUrl: SiteUrls(this.config?.siteUrls),
		timezone: Timezone(this.config?.locale.siteTimezone),
		wp_debug: WpDebug(this.config?.wp_debug),
	});
}
