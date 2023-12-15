import { __ } from '@eventespresso/i18n';
import type { OptionsType } from '@eventespresso/adapters';

export type AppliesTo = 'ALL' | 'PRIMARY' | 'PURCHASER' | 'REGISTRANTS';

export const APPLIES_TO_OPTIONS: OptionsType<AppliesTo> = [
	{
		value: 'ALL',
		label: __('all'),
	},
	{
		value: 'PRIMARY',
		label: __('primary registrant'),
	},
	{
		value: 'PURCHASER',
		label: __('purchaser'),
	},
	{
		value: 'REGISTRANTS',
		label: __('registrants'),
	},
];

export const MAPS_TO_OPTIONS: OptionsType = [
	{
		value: '',
		label: '...',
	},
	{
		value: 'Attendee.fname',
		label: __('Attendee First Name'),
	},
	{
		value: 'Attendee.lname',
		label: __('Attendee Last Name'),
	},
	{
		value: 'Attendee.email',
		label: __('Attendee Email Address'),
	},
	{
		value: 'Attendee.email_confirm',
		label: __('Attendee Email Address Confirmation'),
	},
	{
		value: 'Attendee.address',
		label: __('Attendee Address'),
	},
	{
		value: 'Attendee.address2',
		label: __('Attendee Address 2'),
	},
	{
		value: 'Attendee.city',
		label: __('Attendee City'),
	},
	{
		value: 'Attendee.state',
		label: __('Attendee State/Province'),
	},
	{
		value: 'Attendee.country',
		label: __('Attendee Country'),
	},
	{
		value: 'Attendee.zip',
		label: __('Attendee Zip/Postal Code'),
	},
	{
		value: 'Attendee.phone',
		label: __('Attendee Phone Number'),
	},
];
