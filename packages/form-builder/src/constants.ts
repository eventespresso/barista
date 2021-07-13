import * as R from 'ramda';

import { __ } from '@eventespresso/i18n';
import type { OptionsType } from '@eventespresso/adapters';

import { ElementBlock, FormSection, FormElement, ElementType } from './types';
import { resetStatusFlags } from './state/utils';

export const SECTIONS_DROPPABLE_ID = 'form-sections';

export const DEFAULT_SECTION: FormSection = resetStatusFlags({
	id: '',
	appliesTo: 'ALL',
	isActive: false,
	isArchived: false,
	isDefault: false,
	isShared: false,
	isTrashed: false,
	label: {
		publicLabel: '',
	},
	order: 1,
	status: 'ACTIVE',
});

export const DEFAULT_ELEMENT: FormElement = {
	id: '',
	belongsTo: '',
	type: 'TEXT',
	order: 1,
};

export const NUMERIC_FIELDS: Array<ElementType> = ['INTEGER', 'DECIMAL', 'RANGE'];

export const TEXT_FIELDS: Array<ElementType> = [
	...NUMERIC_FIELDS,
	'EMAIL',
	'EMAIL_CONFIRMATION',
	'PASSWORD',
	'PASSWORD_CONFIRMATION',
	'TEL',
	'TEXT',
	'URL',
];

export const DATE_FIELDS: Array<ElementType> = ['DATE', 'DATETIME_LOCAL', 'MONTH'];

export const BUTTON_FIELDS: Array<ElementType> = ['BUTTON', 'RESET'];

// These are the fields that require `options` to be passed to the component
export const FIELDS_WITH_OPTIONS: Array<ElementType> = ['CHECKBOX_MULTI', 'RADIO', 'SELECT', 'SELECT_MULTI'];

export const ELEMENT_BLOCKS: Array<ElementBlock> = [
	{
		label: __('Form Section'),
		type: 'FORM_SECTION',
		desc: __(
			'Used for creating logical groupings for questions and form elements. Need to add a heading or description? Use the HTML form element.'
		),
	},
	{
		label: __('HTML Block'),
		type: 'HTML',
		desc: __('allows you to add HTML like headings or text paragraphs to your form'),
	},
	{
		label: __('Text Input'),
		type: 'TEXT',
		desc: __('adds a text input that only accepts plain text'),
	},
	{
		label: __('Plain Text Area'),
		type: 'TEXTAREA',
		desc: __('adds a textarea block that only accepts plain text'),
	},
	{
		label: __('HTML Text Area'),
		type: 'TEXTAREA_HTML',
		desc: __('adds a textarea block that accepts text including simple HTML markup'),
	},
	{
		label: __('Email Address'),
		type: 'EMAIL',
		desc: __('adds a text input that only accets a valid email address'),
	},
	{
		label: __('Email Confirmation'),
		type: 'EMAIL_CONFIRMATION',
		desc: 'adds a text input that confirms the entered email address matches the value entered into another email address input',
	},
	{
		label: __('Password'),
		type: 'PASSWORD',
		desc: __('adds a text input that accepts text but masks what the user enters'),
	},
	{
		label: __('Password Confirmation'),
		type: 'PASSWORD_CONFIRMATION',
		desc: 'adds a text input that confirms the entered password matches the value entered into another password input',
	},
	{
		label: __('URL'),
		type: 'URL',
		desc: __('adds a text input for entering a URL address'),
	},
	{
		label: __('Date'),
		type: 'DATE',
		desc: __('adds a text input that allows users to enter a date directly via keyboard or a datepicker'),
	},
	{
		label: __('Local Date'),
		type: 'DATETIME_LOCAL',
		desc: 'adds a text input that allows users to enter a date and time (no timezone) directly via keyboard or a date/time picker',
	},
	{
		label: __('Month'),
		type: 'MONTH',
		desc: __('adds a text input that allows users to enter a month and year directly via keyboard or a datepicker'),
	},
	{
		label: __('Time'),
		type: 'TIME',
		desc: __('adds a text input that allows users to enter a time directly via keyboard or a timepicker'),
	},
	{
		label: __('Week'),
		type: 'WEEK',
		desc: __('adds a text input that allows users to enter a week and year directly via keyboard or a datepicker'),
	},
	{
		label: __('Day Selector'),
		type: 'DAY_SELECT',
		desc: __('adds a dropdown selector that allows users to select the day of the month (01 to 31)'),
	},
	{
		label: __('Month Selector'),
		type: 'MONTH_SELECT',
		desc: __('adds a dropdown selector that allows users to select the month of the year (01 to 12)'),
	},
	{
		label: __('Year Selector'),
		type: 'YEAR_SELECT',
		desc: __('adds a dropdown selector that allows users to select the year from a configurable range'),
	},
	{
		label: __('Radio Buttons'),
		type: 'RADIO',
		desc: __('adds one or more radio buttons that allow users to only select one option from those provided'),
	},
	{
		label: __('Decimal Number'),
		type: 'DECIMAL',
		desc: __('adds a text input that only accepts numbers whose value is a decimal (float)'),
	},
	{
		label: __('Whole Number'),
		type: 'INTEGER',
		desc: __('adds a text input that only accepts numbers whose value is an integer (whole number)'),
	},
	{
		label: __('Number Range'),
		type: 'RANGE',
		desc: 'adds a slider input that can be used to indicate a number range for setting a minimum and maximum values',
	},
	{
		label: __('Phone Number'),
		type: 'TEL',
		desc: 'adds a text field for entering a telephone number. Can be configured to only accept input that matches a pattern',
	},
	{
		label: __('Dropdown'),
		type: 'SELECT',
		desc: __('adds a dropdown selector that accepts a single value'),
	},
	{
		label: __('Multi Select'),
		type: 'SELECT_MULTI',
		desc: __('adds a dropdown selector that accepts multiple values'),
	},
	{
		label: __('Toggle/Switch'),
		type: 'SWITCH',
		desc: __('adds a toggle or a switch to accept true or false value'),
	},
	{
		label: __('Multi Checkbox'),
		type: 'CHECKBOX_MULTI',
		desc: __('adds checkboxes that allow users to select zero or more options from those provided'),
	},
	{
		label: __('Country Selector'),
		type: 'SELECT_COUNTRY',
		desc: __('adds a dropdown selector populated with names of countries that are enabled for the site'),
	},
	{
		label: __('State Selector'),
		type: 'SELECT_STATE',
		desc: 'adds a dropdown selector populated with names of states/provinces for the countries that are enabled for the site',
	},
	{
		label: __('Button'),
		type: 'BUTTON',
		desc: __('adds a button to the form that can be used for triggering fucntionality (requires custom coding)'),
	},
	{
		label: __('Reset Button'),
		type: 'RESET',
		desc: __('adds a button that will reset the form back to its orginial state.'),
	},
];

export const ELEMENT_BLOCKS_INDEXED = R.indexBy(R.prop('type'), ELEMENT_BLOCKS);

export const ELEMENT_BLOCKS_OPTIONS = ELEMENT_BLOCKS.map<OptionsType[number]>(({ label, type: value }) => ({
	label,
	value,
}));
