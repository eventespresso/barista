import { useCallback } from 'react';

import { useSiteDateToUtcISO } from '@eventespresso/services';
import type { EntityId } from '@eventespresso/constants';
import { useMutateTicket } from '@eventespresso/tpc';

import type { RemTicket, StartAndEndDate } from './types';
import { computeTicketDate } from '../utils';

type Callback = (
	tickets: Array<RemTicket>,
	areSharedTickets?: boolean,
	// these are the start and end dates of the related datetime
	startAndEndDate?: StartAndEndDate
) => Promise<Array<EntityId>>;

type MutateTicketsArgs = {
	incrementProgress?: VoidFunction;
};

const useMutateTickets = ({ incrementProgress }: MutateTicketsArgs): Callback => {
	const mutateTicket = useMutateTicket();
	const toUtcISO = useSiteDateToUtcISO();

	// Async to make sure that prices are handled before updating the ticket.
	return useCallback(
		async (tickets, areSharedTickets, dates) => {
			return await Promise.all(
				tickets.map(async (ticket) => {
					const startDate = toUtcISO(
						areSharedTickets
							? ticket.ticketSalesDates.startDate
							: computeTicketDate(dates, ticket.ticketSalesStart)
					);
					const endDate = toUtcISO(
						areSharedTickets
							? ticket.ticketSalesDates.endDate
							: computeTicketDate(dates, ticket.ticketSalesEnd)
					);
					const input = { ...ticket, startDate, endDate, isNew: true };
					const ticketId = await mutateTicket(input);
					incrementProgress?.();
					return ticketId;
				})
			);
		},
		[incrementProgress, mutateTicket, toUtcISO]
	);
};

export default useMutateTickets;
