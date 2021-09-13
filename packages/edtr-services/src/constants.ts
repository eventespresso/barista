import type { Ticket } from '@eventespresso/edtr-services';
import { __ } from '@eventespresso/i18n';

export const domain = 'eventEditor';

export const datesList = 'dates-list';

export const ticketsList = 'tickets-list';

export const TICKET_FIELDS_FOR_TPC: Array<keyof Ticket> = [
	'id',
	'name',
	'description',
	'price',
	'quantity',
	'reverseCalculate',
	'visibility',
];

/**
 * Translated singular entity names
 */
export const SINGULAR_ENTITY_NAME = {
	DATETIME: __('datetime'),
	EVENT: __('event'),
	TICKET: __('ticket'),
	PRICE: __('price'),
	PRICE_TYPE: __('price type'),
};
