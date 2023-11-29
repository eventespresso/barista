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
		DTU: __('Upcoming'),
		DTA: __('Active'),
		DTS: __('Sold Out'),
		DTE: __('Expired'),
		DTB: __('To Be Determined'),
		DTP: __('Postponed'),
		DTC: __('Cancelled'),
		DTT: __('Trashed'),
	},
};
