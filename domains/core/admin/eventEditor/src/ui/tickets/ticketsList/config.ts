import { IconName, Trash } from '@eventespresso/icons';
import { LegendConfig } from '@eventespresso/ui-components';
import { __ } from '@eventespresso/i18n';

export const legendConfig: LegendConfig<string> = {
	icons: [
		{
			icon: IconName.EDIT,
			description: __('Edit Ticket Details'),
			className: 'ee-icon ee-svg ee-svg--edit',
		},
		{
			icon: IconName.CALENDAR,
			description: __('Manage Date Assignments'),
			className: 'ee-icon ee-svg ee-svg--calendar',
		},
		{
			icon: IconName.CALCULATOR,
			description: __('Ticket Price Calculator'),
			className: 'ee-icon ee-svg ee-svg--calculator',
		},
		{
			icon: Trash,
			description: __('Move Ticket to Trash'),
			className: 'ee-icon ee-svg ee-svg--trash',
		},
	],
	swatches: {
		TKA: __('Trashed'),
		TKE: __('Expired'),
		TKO: __('On Sale'),
		TKS: __('Sold Out'),
		TKP: __('Pending'),
	},
};
