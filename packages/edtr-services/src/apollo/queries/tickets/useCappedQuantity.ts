import { useCallback } from 'react';
import * as R from 'ramda';

import { EntityId } from '@eventespresso/data';
import { useRelations } from '@eventespresso/services';
import { minDateCapacity, ticketQuantityFromCapacity } from '@eventespresso/predicates';

import { useDatetimes } from '../datetimes';

type GetCappedQuantity = (args: {
	capacity?: number;
	quantity: number;
	relatedDateIds?: Array<EntityId>;
	ticketId?: EntityId;
}) => number;

/**
 * Returns a callback to get the quantity cap for a ticket
 * based on the related dates capacity
 */
export const useCappedQuantity = () => {
	const allDates = useDatetimes();

	const { getRelations } = useRelations();

	return useCallback<GetCappedQuantity>(
		// at least one of `relatedDateIds` and `ticketId` must be passed
		({ capacity, quantity, ticketId, relatedDateIds = [] }) => {
			const dateIdsToUse = relatedDateIds?.length
				? relatedDateIds
				: getRelations({
						entity: 'tickets',
						entityId: ticketId,
						relation: 'datetimes',
				  });
			const minimumCapacity = !R.isNil(capacity) ? capacity : minDateCapacity(allDates)(dateIdsToUse);

			return ticketQuantityFromCapacity(minimumCapacity)(quantity);
		},
		[allDates, getRelations]
	);
};
