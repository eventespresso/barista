import type { EventEditorData } from '@eventespresso/edtr-services';
import type { RemDomData } from '@eventespresso/rem/src/types';
import type { EventSmartDomData } from '@eventespresso/es-edtr-slots/src/types';
import type { WpPluginsPageData } from '@eventespresso/wp-plugins-page/src/types';
import type { UpsellAdEditorData } from '@eventespresso/es-upsell-editor/src/services';
import type { WpUserData } from '@eventespresso/wp-user/src/types';
import type { EventEspressoDomData } from '@eventespresso/services';

/**
 * This is the global object
 */
export interface EventEspressoData extends EventEspressoDomData {
	eventEditor?: EventEditorData;
	eventSmart?: EventSmartDomData;
	remEditorData?: RemDomData;
	wpPluginsPage?: WpPluginsPageData;
	wpUserData?: WpUserData;
	upsellAdEditor?: UpsellAdEditorData;
}

declare global {
	interface Window {
		eventEspressoData: EventEspressoData;
		wp: any;
	}
}
