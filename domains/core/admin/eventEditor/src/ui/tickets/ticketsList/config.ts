import { TICKET_STATUS_CODES, TICKET_STATUS_LABELS } from '@eventespresso/constants';
import { IconName, Trash } from '@eventespresso/icons';
import { LegendConfig } from '@eventespresso/ui-components';
import { __ } from '@eventespresso/i18n';

export const legendConfig: LegendConfig<string> = {
	icons: [
		{ icon: IconName.EDIT, description: __('Edit Ticket Details') },
		{ icon: IconName.CALENDAR, description: __('Manage Date Assignments') },
		{ icon: IconName.CALCULATOR, description: __('Ticket Price Calculator') },
		{ icon: Trash, description: __('Move Ticket to Trash') },
	],
	swatches: {
		[TICKET_STATUS_CODES.EXPIRED]: TICKET_STATUS_LABELS.EXPIRED,
		[TICKET_STATUS_CODES.ON_SALE]: TICKET_STATUS_LABELS.ON_SALE,
		[TICKET_STATUS_CODES.PENDING]: TICKET_STATUS_LABELS.PENDING,
		[TICKET_STATUS_CODES.SOLD_OUT]: TICKET_STATUS_LABELS.SOLD_OUT,
		[TICKET_STATUS_CODES.TRASHED]: TICKET_STATUS_LABELS.TRASHED,
	},
};
