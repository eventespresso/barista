import type { Ticket } from '@eventespresso/edtr-services';
import type { SimpleEntityRendererProps } from '@eventespresso/ui-components';

export interface SimpleTicketCardProps extends SimpleEntityRendererProps<Omit<Ticket, 'prices'>> {
	renderEndDate?: (ticket: Ticket) => string;
	renderStartDate?: (ticket: Ticket) => string;
	showAfterDetails?: boolean;
}
