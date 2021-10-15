import { __ } from '@eventespresso/i18n';
import type { Datetime, Ticket } from '@eventespresso/edtr-services';

export const DATE_FORMAT = 'YYYY-MM-DD';
export const TIME_FORMAT = 'hh:mm a';
export const DATE_TIME_FORMAT = DATE_FORMAT + ' ' + TIME_FORMAT;

export const PATTERN_TYPE_RECURRENCE = 'recurrence';

export const PATTERN_TYPE_EXCLUSION = 'exclusion';

export const RRULE_FREQUENCIES = {
	DAILY: 'DAILY',
	WEEKLY: 'WEEKLY',
	MONTHLY: 'MONTHLY',
};

export const RRULE_FREQUENCY_LABELS = {
	DAILY: __('Daily'),
	WEEKLY: __('Weekly'),
	MONTHLY: __('Monthly'),
};

export const RRULE_DAYS = {
	MO: 'MO',
	TU: 'TU',
	WE: 'WE',
	TH: 'TH',
	FR: 'FR',
	SA: 'SA',
	SU: 'SU',
};

export const RRULE_DAY_LABELS = {
	MO: __('Monday'),
	TU: __('Tuesday'),
	WE: __('Wednesday'),
	TH: __('Thursday'),
	FR: __('Friday'),
	SA: __('Saturday'),
	SU: __('Sunday'),
};

export const DATE_FIELDS_TO_USE: Array<keyof Datetime> = ['id', 'name', 'description', 'capacity'];
export const TICKET_FIELDS_TO_USE: Array<keyof Ticket> = ['id', 'name', 'description', 'quantity'];

/* The namespace to use for actions/filters */
export const NAMESPACE = 'rem';

export const R_DATE_LIMIT = 20;
