import { useCallback } from 'react';

import { entitiesWithGuIdInArray } from '@eventespresso/predicates';
import { useRelations } from '@eventespresso/services';

import { usePrices } from '../prices';
import type { EntityId, Price } from '@eventespresso/constants';

type GetTicketPrices = (ticketId: EntityId) => Array<Price>;
/**
 * A custom react hook for retrieving the related prices
 * for the given `ticket` identified by `ticket.id`
 *
 * @param {string|string[]}  ticketId ticket.id
 */
const useTicketPrices = (): GetTicketPrices => {
	const prices = usePrices();
	const { getRelations } = useRelations();

	return useCallback<GetTicketPrices>(
		(ticketId) => {
			const relatedPricesIds = getRelations({
				entity: 'tickets',
				entityId: ticketId,
				relation: 'prices',
			});

			return entitiesWithGuIdInArray(prices, relatedPricesIds);
		},
		[getRelations, prices]
	);
};

export default useTicketPrices;
