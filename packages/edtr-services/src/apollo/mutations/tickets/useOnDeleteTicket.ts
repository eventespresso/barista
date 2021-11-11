import { useCallback } from 'react';

import { useRelations } from '@eventespresso/services';
import { getGuids, hasTempId } from '@eventespresso/predicates';
import updatePriceCache from './updatePriceCache';
import useUpdateTicketCache from './useUpdateTicketCache';
import type { TicketMutationCallbackFn, TicketMutationCallbackFnArgs } from '../types';

const useOnDeleteTicket = (): TicketMutationCallbackFn => {
	const { dropRelations, removeRelation } = useRelations();

	const updateTicketCache = useUpdateTicketCache();

	const onDeleteTicket = useCallback(
		({ cache, tickets, ticket, deletePermanently }: TicketMutationCallbackFnArgs): void => {
			const action = deletePermanently ? 'remove' : 'update';
			if (!hasTempId(ticket) && deletePermanently) {
				const { nodes = [] } = tickets;
				const ticketIn = getGuids(nodes);
				const { id: ticketId } = ticket;

				// Update prices cache for the changed tickets,
				// to avoid refetching of prices.
				updatePriceCache({ cache, ticketIn, ticketId, action });

				// Remove the ticket from all datetime relations
				removeRelation({
					entity: 'tickets',
					entityId: ticketId,
					relation: 'datetimes',
				});
				// Remove the ticket from all price relations
				removeRelation({
					entity: 'tickets',
					entityId: ticketId,
					relation: 'prices',
				});
				// Drop all the relations for the ticket
				dropRelations({
					entity: 'tickets',
					entityId: ticketId,
				});
			}
			// Update ticket cache after price cache is updated.
			updateTicketCache({ cache, tickets, ticket: { ...ticket, isTrashed: true }, action });
		},
		[dropRelations, removeRelation, updateTicketCache]
	);

	return onDeleteTicket;
};

export default useOnDeleteTicket;
