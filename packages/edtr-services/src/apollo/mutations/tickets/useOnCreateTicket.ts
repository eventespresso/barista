import { useCallback } from 'react';

import { useRelations } from '@eventespresso/services';
import { getGuids } from '@eventespresso/predicates';
import updatePriceCache from './updatePriceCache';
import useUpdateTicketCache from './useUpdateTicketCache';
import type { TicketMutationCallbackFn, TicketMutationCallbackFnArgs } from '../types';

const useOnCreateTicket = (): TicketMutationCallbackFn => {
	const { addRelation, updateRelations } = useRelations();

	const updateTicketCache = useUpdateTicketCache();

	const onCreateTicket = useCallback(
		({ cache, datetimeIds, ticket, tickets, prices }: TicketMutationCallbackFnArgs): void => {
			if (ticket.id) {
				const { nodes = [] } = tickets;
				const ticketIn = getGuids(nodes);
				const { id: ticketId } = ticket;

				// Update prices cache for the changed tickets,
				// to avoid refetching of prices.
				updatePriceCache({ cache, prices, ticketIn, ticketId, action: 'add' });

				// if related datetimes are passed
				if (datetimeIds?.length) {
					// Set relations with datetimes
					updateRelations({
						entity: 'tickets',
						entityId: ticketId,
						relation: 'datetimes',
						relationIds: datetimeIds,
					});
					datetimeIds.forEach((entityId: string) => {
						addRelation({
							entity: 'datetimes',
							entityId,
							relation: 'tickets',
							relationId: ticketId,
						});
					});
				}

				// Set relations with prices
				const priceIds = getGuids(prices?.nodes || []);
				if (priceIds.length) {
					updateRelations({
						entity: 'tickets',
						entityId: ticketId,
						relation: 'prices',
						relationIds: priceIds,
					});
					priceIds.forEach((entityId: string) => {
						addRelation({
							entity: 'prices',
							entityId,
							relation: 'tickets',
							relationId: ticketId,
						});
					});
				}
			}
			// Update ticket cache after price cache is updated.
			updateTicketCache({ cache, tickets, ticket, action: 'add' });
		},
		[addRelation, updateRelations, updateTicketCache]
	);

	return onCreateTicket;
};

export default useOnCreateTicket;
