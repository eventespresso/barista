import { gql } from '@eventespresso/data';
import { TICKET_ATTRIBUTES } from '../../queries/tickets';
import { PRICE_ATTRIBUTES } from '../../queries/prices';

/**
 * The related prices for a ticket.
 * Can be used to fetch the default prices
 * created for a ticket on the server.
 */
export const TICKET_PRICES_ATTRIBUTE: any = gql`
	fragment ticketPricesAttribute on EspressoTicket {
		prices {
			nodes {
				...priceAttributes
			}
		}
	}
	${PRICE_ATTRIBUTES}
`;

export const CREATE_TICKET = gql`
	mutation CREATE_TICKET($input: CreateEspressoTicketInput!) {
		createEspressoTicket(input: $input) {
			espressoTicket {
				...ticketAttributes
				...ticketPricesAttribute # fetch default prices when a ticket is created.
			}
		}
	}
	${TICKET_ATTRIBUTES}
	${TICKET_PRICES_ATTRIBUTE}
`;

export const UPDATE_TICKET = gql`
	mutation UPDATE_TICKET($input: UpdateEspressoTicketInput!) {
		updateEspressoTicket(input: $input) {
			espressoTicket {
				...ticketAttributes
				...ticketPricesAttribute # fetch updated prices when a ticket is updated.
			}
		}
	}
	${TICKET_ATTRIBUTES}
	${TICKET_PRICES_ATTRIBUTE}
`;

export const DELETE_TICKET = gql`
	mutation DELETE_TICKET($input: DeleteEspressoTicketInput!) {
		deleteEspressoTicket(input: $input) {
			espressoTicket {
				...ticketAttributes
			}
		}
	}
	${TICKET_ATTRIBUTES}
`;

export const BULK_UPDATE_TICKETS = gql`
	mutation BULK_UPDATE_TICKETS($input: BulkUpdateEspressoTicketInput!) {
		bulkUpdateEspressoTicket(input: $input) {
			updated
			failed
		}
	}
`;

export { default as useTicketMutator } from './useTicketMutator';

export { default as useReorderTickets } from './useReorderTickets';

export { default as useBulkEditTickets } from './useBulkEditTickets';

export { default as useBulkDeleteTickets } from './useBulkDeleteTickets';

export * from './useUpdateTicketQtyByCapacity';

export * from './types';
