import { IconName, Trash } from '@eventespresso/icons';
import { LegendConfig } from '@eventespresso/ui-components';
import { __ } from '@eventespresso/i18n';

export const legendConfig: LegendConfig<string> = {
	icons: [
		{
			icon: IconName.EDIT,
			description: __('Edit Event Date Details'),
			className: 'ee-icon ee-svg ee-svg--edit',
		},
		{
			icon: IconName.GROUPS,
			description: __('View Registrations for this Date'),
			className: 'ee-icon ee-svg ee-svg--groups',
		},
		{
			icon: IconName.TICKET,
			description: __('Manage Ticket Assignments'),
			className: 'ee-icon ee-svg ee-svg--tickets',
		},
		{
			icon: Trash,
			description: __('Move Date to Trash'),
			className: 'ee-icon ee-svg ee-svg--trash',

		},
	],
	swatches: {
		DTA: __('Active'),
		DTT: __('Trashed'),
		DTE: __('Expired'),
		DTS: __('Sold Out'),
		DTU: __('Upcoming'),
	},
};
