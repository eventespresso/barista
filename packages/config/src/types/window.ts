import type { EventEditorData } from '@eventespresso/edtr-services';
import type { RemDomData } from '@eventespresso/rem/src/types';
import type { EventSmartDomData } from '@eventespresso/es-edtr-slots/src/types';
import type { WpPluginsPageData } from '@eventespresso/wp-plugins-page/src/types';
import type { UpsellAdEditorData } from '@eventespresso/es-upsell-editor/src/services';
import type { WpUserData } from '@eventespresso/wp-user/src/types';
import type { User } from '@eventespresso/data';
import type { Type } from '.';

declare global {
	interface Window {
		/**
		 * Entry points exposed by webpack. For more details, see `output.library` in [webpack.config.js](../../../config/webpack.config.js).
		 * @link https://webpack.js.org/configuration/output/#outputlibrary
		 * @link https://webpack.js.org/guides/author-libraries/#expose-the-library
		 */
		eventEspresso: EventEspresso;

		/**
		 * Injected into HTML as `<script type="text/javascript" id="eventEspressoData">...</script>` by means of `wp_add_inline_script()`
		 */
		eventEspressoData: EventEspressoData;

		/**
		 * A full url to directory `build` of this repository with trailing slash included
		 *
		 * Exists *only* when plugin [`Barista for Event Espresso`](https://github.com/eventespresso/barista/blob/master/ee-barista.php) is enabled
		 */
		baristaAssetsUrl?: string;
	}
}

export interface EventEspressoData {
	api: Api;
	config: Config;
	domain: string;
	eei18n: Record<string, any>; // translation strings
	i18n: I18n;
	eventEditor?: EventEditorData;
	eventSmart?: EventSmartDomData;
	remEditorData?: RemDomData;
	wpPluginsPage?: WpPluginsPageData;
	wpUserData?: WpUserData;
	upsellAdEditor?: UpsellAdEditorData;
}

type Config = {
	coreDomain: CoreDomain;
	currentUser: User;
	generalSettings: Type.GeneralSettings;
	locale: Locale;
	siteCurrency: Type.Currency;
	sitePermissions: Type.SitePermissions;
	siteUrls: Type.SiteUrls;
	wp_debug: boolean;
};

type I18n = {
	'': {
		domain: string; // e.g. "event_espresso"
		lang: string; // e.g. "en_US"
		plural_forms?: string;
	};
};

interface Locale {
	user: string;
	site: string;
	siteTimezone: Type.Timezone;
}

type Api = {
	graphqlEndpoint: string;
	restApiBaseUrl: string;
	restApiCollectionEndpoints: Record<string, string>;
	restApiNonce: string;
	restApiPrimaryKeys: Record<string, string | [string]>;
	restApiRouteUrl: string;
};

type CoreDomain = {
	assetNamespace: string;
	brandName: string;
	coreVersion: string;
	distributionAssetsPath: string;
	distributionAssetsUrl: string;
	pluginPath: string;
	pluginUrl: string;
};

type ESModule = {
	[key: string | number]: any;
	__esModule: true;
	get [Symbol.toStringTag](): '[object Module]';
};

type EventEspresso = Record<string, ESModule>;
