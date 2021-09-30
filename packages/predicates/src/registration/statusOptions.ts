import { __ } from '@eventespresso/i18n';

export const regStatusOptions = [
	{
		value: 'APPROVED',
		label: __('Approved'),
		code: 'RAP',
	},
	{
		value: 'CANCELLED',
		label: __('Cancelled'),
		code: 'RCN',
	},
	{
		value: 'DECLINED',
		label: __('Declined'),
		code: 'RDC',
	},
	{
		value: 'INCOMPLETE',
		label: __('Incomplete'),
		code: 'RIC',
	},
	{
		value: 'UNAPPROVED',
		label: __('Not Approved'),
		code: 'RNA',
	},
	{
		value: 'PENDING_PAYMENT',
		label: __('Pending Payment'),
		code: 'RPP',
	},
	{
		value: 'WAIT_LIST',
		label: __('Wait List'),
		code: 'RWL',
	},
];

export default regStatusOptions;
