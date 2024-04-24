import type { EventEspressoData } from 'types';

import {
	ConfigDataProps as Data,
	Currency,
	DateTimeFormats,
	Locale,
	SiteUrl,
	Timezone,
	TimezoneProps,
	GeneralSettings,
} from '.';

export class Factory {
	public static make(): Factory {
		const config = window.eventEspressoData?.config ?? undefined;
		const api = window.eventEspressoData?.api ?? undefined;
		return new Factory(config, api);
	}

	constructor(private readonly config: Config, private readonly api: API) {}

	public make(): Data {
		const data: Data = {
			brandName: this.brandName,
			currency: this.currency,
			currentUser: this.currentUser,
			generalSettings: this.generalSettings,
			dateTimeFormats: this.dateTimeFormats,
			locale: this.locale,
			nonce: this.nonce,
			siteUrl: this.siteUrl,
			timezone: this.timezone,
			wp_debug: this.wp_debug,
		};

		if (true) {
			// 'TODO: site permissions'
		}

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
		throw new Error('TODO:');
	}

	private get nonce(): Data['nonce'] {
		return this.api?.restApiNonce ?? '';
	}

	private get sitePermissions(): Data['sitePermissions'] {
		throw new Error('TODO:');
	}

	private get siteUrl(): Data['siteUrl'] {
		throw new Error('TODO:');
	}

	private get timezone(): Data['timezone'] {
		throw new Error('TODO:');
	}

	private get wp_debug(): Data['wp_debug'] {
		throw new Error('TODO:');
	}
}

type Config = EventEspressoData['config'] | undefined;
type API = EventEspressoData['api'] | undefined;
