import { getTicketStatusBgColorClassName } from './getTicketStatusBgColorClassName';
import type { Ticket } from '@eventespresso/edtr-services';

export const getTicketBackgroundColorClassName = (ticket: Ticket): string => {
	return `ee-status-bg--${getTicketStatusBgColorClassName(ticket)}`;
};
