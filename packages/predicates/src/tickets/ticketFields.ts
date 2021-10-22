import type { UpdateTicketInput, Ticket } from '@eventespresso/edtr-services';

export const TICKET_INPUT_FIELDS: Array<keyof UpdateTicketInput> = [
	'datetimes',
	'description',
	'endDate',
	'isDefault',
	'isRequired',
	'isTrashed',
	'max',
	'min',
	'name',
	'order',
	'parent',
	'price',
	'prices',
	'quantity',
	'reserved',
	'reverseCalculate',
	'sold',
	'startDate',
	'uses',
	'visibility',
	'wpUser',
];

const OUTPUT_ONLY_FIELDS: Array<keyof Omit<Ticket, keyof UpdateTicketInput> | 'id'> = [
	'cacheId',
	'dbId',
	'id',
	'isExpired',
	'isFree',
	'isOnSale',
	'isPending',
	'isSoldOut',
	'registrationCount',
	'userId',
];

export const TICKET_FIELDS = [...TICKET_INPUT_FIELDS, ...OUTPUT_ONLY_FIELDS];
