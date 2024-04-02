import { useCallback } from 'react';

import { entitiesWithGuIdInArray } from '@eventespresso/predicates';
import { useRelations } from '@eventespresso/services';
import useTickets from './useTickets';

import type { Ticket } from '@eventespresso/constants';
import type { RelatedEntitiesHook } from '../types';

const useRelatedTickets = (): RelatedEntitiesHook<Ticket, 'tickets'> => {
	const tickets = useTickets();
	const { getRelations } = useRelations();

	return useCallback(
		({ entity, entityId }) => {
			const relatedTicketIds = getRelations({
				entity,
				entityId,
				relation: 'tickets',
			});

			return entitiesWithGuIdInArray(tickets, relatedTicketIds);
		},
		[getRelations, tickets]
	);
};

export default useRelatedTickets;
