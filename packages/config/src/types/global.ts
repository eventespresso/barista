import type { EventEditorData } from '@eventespresso/edtr-services';
import type { RemDomData } from '@eventespresso/rem/src/types';
import type { EventSmartDomData } from '@eventespresso/es-edtr-slots/src/types';
import type { WpPluginsPageData } from '@eventespresso/wp-plugins-page/src/types';
import type { UpsellAdEditorData } from '@eventespresso/es-upsell-editor/src/services';
import type { WpUserData } from '@eventespresso/wp-user/src/types';
import type { User } from '@eventespresso/data';
import type { Api, CoreDomainDomData, GeneralSettings, LocaleDomData, Type } from '.';

declare global {
	interface Window {
		/**
		 * Entry points exposed by webpack. For more details, see `output.library` in [webpack.config.js](../../../config/webpack.config.js).
		 * @link https://webpack.js.org/configuration/output/#outputlibrary
		 * @link https://webpack.js.org/guides/author-libraries/#expose-the-library
		 */
		eventEspresso: Window.EventEspresso;

		/**
		 * Injected into HTML as `<script type="text/javascript" id="eventEspressoData">...</script>` by means of `wp_add_inline_script()`
		 */
		eventEspressoData: Window.EventEspressoData;

		/**
		 * Global window object exposed by WordPress
		 * @link https://codex.wordpress.org/Javascript_Reference/wp
		 */
		wp: Window.WordPress;

		/**
		 * A full url to directory `build` of this repository with trailing slash included
		 *
		 * Exists *only* when plugin [`Barista for Event Espresso`](https://github.com/eventespresso/barista/blob/master/ee-barista.php) is enabled
		 */
		baristaAssetsUrl?: string;
	}
}

export module Window {
	export interface EventEspressoData {
		api: Api;
		config: {
			coreDomain: CoreDomainDomData;
			currentUser: User;
			generalSettings: GeneralSettings;
			locale: LocaleDomData;
			siteCurrency: Type.Currency;
			sitePermissions: string[]; // LATER: consolidate data types
			siteUrls: Type.SiteUrls;
			wp_debug: boolean;
		};
		domain: string;
		eei18n: Record<string, any>; // translation strings
		i18n: {
			'': {
				domain: string; // e.g. "event_espresso"
				lang: string; // e.g. "en_US"
				plural_forms?: string;
			};
		};
		eventEditor?: EventEditorData;
		eventSmart?: EventSmartDomData;
		remEditorData?: RemDomData;
		wpPluginsPage?: WpPluginsPageData;
		wpUserData?: WpUserData;
		upsellAdEditor?: UpsellAdEditorData;
	}

	type ESModule = {
		[key: string | number]: any;
		__esModule: true;
		get [Symbol.toStringTag](): '[object Module]';
	};

	export type EventEspresso = Record<string, ESModule>;

	export type WordPress = unknown;
}
