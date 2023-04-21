import status from './status';
import type { Ticket } from '@eventespresso/edtr-services';

const getBackgroundColorClassName = (ticket: Ticket): string => {
	return `ee-status-bg--${status(ticket)}`;
};

export default getBackgroundColorClassName;
