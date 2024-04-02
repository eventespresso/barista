import type { Datetime } from '@eventespresso/constants';
import type { UpdateDatetimeInput } from '@eventespresso/edtr-services';

export const DATETIME_INPUT_FIELDS: Array<keyof UpdateDatetimeInput> = [
	'capacity',
	'description',
	'endDate',
	'event',
	'eventId',
	'isPrimary',
	'isTrashed',
	'name',
	'order',
	'parent',
	'reserved',
	'sold',
	'startDate',
	'tickets',
];

const OUTPUT_ONLY_FIELDS: Array<keyof Omit<Datetime, keyof UpdateDatetimeInput> | 'id'> = [
	'id',
	'isActive',
	'isExpired',
	'isSoldOut',
	'isUpcoming',
	'length',
	'status',
];

export const DATETIME_FIELDS = [...DATETIME_INPUT_FIELDS, ...OUTPUT_ONLY_FIELDS];
