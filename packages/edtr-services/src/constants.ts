import type { Ticket } from '../';
export const domain = 'eventEditor';

export const datesList = 'dates-list';

export const ticketsList = 'tickets-list';

export const TICKET_FIELDS_FOR_REM: Array<keyof Ticket> = ['id', 'name', 'description', 'quantity'];
