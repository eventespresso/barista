import { __ } from '@eventespresso/i18n';

import { TpcTicket } from '../data';

// 'name' is only required for modal title
export const TICKET_FIELDS_TO_USE: Array<keyof TpcTicket> = ['id', 'name', 'price', 'reverseCalculate'];

export const SOLD_TICKET_ERROR_MESSAGE = __(
	'Ticket price modifications are blocked for Tickets that have already been sold to registrants, because doing so would negatively affect internal accounting for the event. If you still need to modify ticket prices, then create a copy of those tickets, edit the prices for the new tickets, and then trash the old tickets.'
);

export const TPC_PRICE_DECIMAL_PLACES = 6;
