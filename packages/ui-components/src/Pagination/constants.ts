import { sprintf, __ } from '@eventespresso/i18n';

import type { Locale, PerPageOptions } from './types';

export const DEFAULT_PER_PAGE_OPTIONS: PerPageOptions = {
	2: sprintf(/* translators: %s is per page value */ __('%s / page'), __('2')),
	6: sprintf(/* translators: %s is per page value */ __('%s / page'), __('6')),
	12: sprintf(/* translators: %s is per page value */ __('%s / page'), __('12')),
	24: sprintf(/* translators: %s is per page value */ __('%s / page'), __('24')),
	48: sprintf(/* translators: %s is per page value */ __('%s / page'), __('48')),
	96: sprintf(/* translators: %s is per page value */ __('%s / page'), __('96')),
	9999: __('show all'),
};
export const DEFAULT_LOCALE: Locale = {
	next_page: __('Next Page'),
	prev_page: __('Previous Page'),
};
