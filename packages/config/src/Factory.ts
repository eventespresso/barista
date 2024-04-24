import type { EventEspressoData } from 'types';

import { ConfigDataProps as Data, Currency, DateTimeFormats, Locale, SiteUrls, Timezone, GeneralSettings } from '.';

export class Factory {
	/**
	 * Initialize the factory
	 */
	public static init(): Factory {
		const config = window.eventEspressoData?.config ?? undefined;
		const api = window.eventEspressoData?.api ?? undefined;
		return new Factory(config, api);
	}

	constructor(private readonly config: Config, private readonly api: API) {}

	/**
	 * Create EventEspresso config merging default values with properties of `window.eventEspressoData.config` and `window.eventEspressoData.api`
	 */
	public make(): Data {
		const data: Data = {
			brandName: this.brandName,
			currency: this.currency,
			currentUser: this.currentUser,
			generalSettings: this.generalSettings,
			dateTimeFormats: this.dateTimeFormats,
			locale: this.locale,
			nonce: this.nonce,
			sitePermissions: this.sitePermissions,
			siteUrl: this.siteUrl,
			timezone: this.timezone,
			wp_debug: this.wp_debug,
		};

		return data;
	}

	private get brandName(): Data['brandName'] {
		return this.config?.coreDomain.brandName ?? 'Event Espresso';
	}

	private get currency(): Data['currency'] {
		return Currency(this.config?.siteCurrency);
	}

	private get currentUser(): Data['currentUser'] {
		return this.config?.currentUser;
	}

	private get generalSettings(): Data['generalSettings'] {
		return GeneralSettings(this.config?.generalSettings);
	}

	private get dateTimeFormats(): Data['dateTimeFormats'] {
		const props: Parameters<typeof DateTimeFormats>['0'] = {};
		if (this.config?.generalSettings.dateFormat) {
			props['dateFormat'] = this.config.generalSettings.dateFormat;
		}
		if (this.config?.generalSettings.timeFormat) {
			props['timeFormat'] = this.config.generalSettings.timeFormat;
		}
		return DateTimeFormats(props);
	}

	private get locale(): Data['locale'] {
		return Locale(this.config?.locale);
	}

	private get nonce(): Data['nonce'] {
		return this.api?.restApiNonce ?? '';
	}

	private get sitePermissions(): Data['sitePermissions'] {
		return this.config?.sitePermissions ?? [];
	}

	private get siteUrl(): Data['siteUrl'] {
		return SiteUrls(this.config?.siteUrls);
	}

	private get timezone(): Data['timezone'] {
		return Timezone(this.config?.locale.siteTimezone);
	}

	private get wp_debug(): Data['wp_debug'] {
		return this.config?.wp_debug ?? false;
	}
}

type Config = EventEspressoData['config'] | undefined;
type API = EventEspressoData['api'] | undefined;
