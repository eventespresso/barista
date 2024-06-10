import { DATETIME_STATUS_CODES, DATETIME_STATUS_LABELS } from '@eventespresso/constants';
import { IconName, Trash } from '@eventespresso/icons';
import { LegendConfig } from '@eventespresso/ui-components';
import { __ } from '@eventespresso/i18n';

export const legendConfig: LegendConfig<string> = {
	icons: [
		{ icon: IconName.EDIT, description: __('Edit Event Date Details') },
		{ icon: IconName.GROUPS, description: __('View Registrations for this Date') },
		{ icon: IconName.TICKET, description: __('Manage Ticket Assignments') },
		{ icon: Trash, description: __('Move Date to Trash') },
	],
	swatches: {
		[DATETIME_STATUS_CODES.ACTIVE]: DATETIME_STATUS_LABELS.ACTIVE,
		[DATETIME_STATUS_CODES.CANCELLED]: DATETIME_STATUS_LABELS.CANCELLED,
		[DATETIME_STATUS_CODES.EXPIRED]: DATETIME_STATUS_LABELS.EXPIRED,
		[DATETIME_STATUS_CODES.POSTPONED]: DATETIME_STATUS_LABELS.POSTPONED,
		[DATETIME_STATUS_CODES.SOLD_OUT]: DATETIME_STATUS_LABELS.SOLD_OUT,
		[DATETIME_STATUS_CODES.TO_BE_DETERMINED]: DATETIME_STATUS_LABELS.TO_BE_DETERMINED,
		[DATETIME_STATUS_CODES.TRASHED]: DATETIME_STATUS_LABELS.TRASHED,
		[DATETIME_STATUS_CODES.UPCOMING]: DATETIME_STATUS_LABELS.UPCOMING,
	},
};
