import { useCallback } from 'react';

import useUpdateTicketCache from './useUpdateTicketCache';
import type { TicketMutationCallbackFn, TicketMutationCallbackFnArgs } from '../types';
import { useRelations } from '@eventespresso/services';

const useOnUpdateTicket = (): TicketMutationCallbackFn => {
	const { addRelation, removeRelation, updateRelations } = useRelations();

	const updateTicketCache = useUpdateTicketCache();

	const onUpdateTicket = useCallback(
		({ proxy, tickets, ticket, datetimeIds, priceIds }: TicketMutationCallbackFnArgs): void => {
			if (ticket.id && datetimeIds && datetimeIds.length) {
				const { id: ticketId } = ticket;

				// make sure to remove ticket from
				// all existing relations
				removeRelation({
					entity: 'tickets',
					entityId: ticketId,
					relation: 'datetimes',
				});

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

			if (ticket.id && priceIds && priceIds.length) {
				const { id: ticketId } = ticket;

				// make sure to remove ticket from
				// all existing relations
				removeRelation({
					entity: 'tickets',
					entityId: ticketId,
					relation: 'prices',
				});

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
				// Update ticket cache.
				updateTicketCache({ proxy, tickets, ticket, action: 'update' });
			}
		},
		[addRelation, removeRelation, updateRelations, updateTicketCache]
	);

	return onUpdateTicket;
};

export default useOnUpdateTicket;
