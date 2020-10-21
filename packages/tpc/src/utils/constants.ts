import { Ticket } from '@eventespresso/edtr-services';
import { __ } from '@eventespresso/i18n';

// 'name' is only required for modal title
export const TICKET_FIELDS_TO_USE: Array<keyof Partial<Ticket>> = [
	'id',
	'isTaxable',
	'name',
	'price',
	'reverseCalculate',
];
export const SOLD_TICKET_ERROR_MESSAGE = __(
	'Ticket price modifications are blocked for Tickets that have already been sold to registrants, because doing so would negatively affect internal accounting for the event. If you still need to modify ticket prices, then create a copy of those tickets, edit the prices for the new tickets, and then archive the old tickets.'
);
