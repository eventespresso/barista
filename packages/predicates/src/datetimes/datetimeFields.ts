import type { UpdateDatetimeInput, Datetime } from '@eventespresso/edtr-services';

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
	'status',
	'tickets',
];

const OUTPUT_ONLY_FIELDS: Array<keyof Omit<Datetime, keyof UpdateDatetimeInput> | 'id'> = [
	'id',
	'isActive',
	'isCancelled',
	'isPostponed',
	'isExpired',
	'isSoldOut',
	'isUpcoming',
	'length',
];

export const DATETIME_FIELDS = [...DATETIME_INPUT_FIELDS, ...OUTPUT_ONLY_FIELDS];
