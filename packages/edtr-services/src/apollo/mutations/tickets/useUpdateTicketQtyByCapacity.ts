import { useCallback, useMemo } from 'react';

import { parseInfinity, isInfinite } from '@eventespresso/utils';
import { entitiesWithGuIdInArray, uniqTicketsByMinQty, ticketQuantityFromCapacity } from '@eventespresso/predicates';
import { EntityId } from '@eventespresso/data';

import { useTickets, useRelatedTickets } from '../../queries';
import useBulkEditTickets from './useBulkEditTickets';

import type { UpdateTicketInput } from './types';
import type { Datetime } from '../../types';

type UpdateTicketQtyByCapacity = {
	/**
	 * Given a datetime and/or `ticketIdsToUpdate`, it generates bulk edit input with updated ticket quantities
	 */
	createBulkQtyUpdateInput: (datetime: Datetime, ticketIdsToUpdate?: Array<EntityId>) => Array<UpdateTicketInput>;
	/**
	 * Given unique inputs of a bulk edit mutation, it performes the actual mutation
	 * removing the duplicate entries in the input by retaining the tickets with minimum quantity
	 */
	doQtyBulkUpdate: (uniqInputs: Array<UpdateTicketInput>) => Promise<void>;
};

export const useUpdateTicketQtyByCapacity = (): UpdateTicketQtyByCapacity => {
	const tickets = useTickets();
	const getRelatedTickets = useRelatedTickets();
	const { updateEntities: bulkEditTickets } = useBulkEditTickets();

	const createBulkQtyUpdateInput = useCallback<UpdateTicketQtyByCapacity['createBulkQtyUpdateInput']>(
		(datetime, ticketIdsToUpdate = []) => {
			// If `ticketIdsToUpdate` is passed, we will give preference to it.
			// Otherwise we will try to update the previous related tickets
			const ticketsToUpdate = ticketIdsToUpdate?.length
				? entitiesWithGuIdInArray(tickets, ticketIdsToUpdate)
				: getRelatedTickets({ entity: 'datetimes', entityId: datetime.id });
			console.log('ticketsToUpdate', ticketsToUpdate);

			const capacity = parseInfinity(datetime.capacity, Infinity);

			const getTicketQuantityFromCapacity = ticketQuantityFromCapacity(capacity);

			const uniqueInputs = ticketsToUpdate
				.map<UpdateTicketInput>(({ id, quantity }) => {
					const nonNegativeTicketQuantity = parseInfinity(quantity, Infinity);

					console.log({ capacity, nonNegativeTicketQuantity });

					// if capacity is infinite or it's more than ticket quantity
					if (isInfinite(capacity) || capacity >= nonNegativeTicketQuantity) {
						// no need to update the ticket quantity
						return null;
					}
					const newQuantity = getTicketQuantityFromCapacity(quantity);

					return { id, quantity: newQuantity };
				})
				.filter(Boolean);
			console.log('uniqueInputs', uniqueInputs);

			return uniqueInputs;
		},
		[getRelatedTickets, tickets]
	);

	const doQtyBulkUpdate = useCallback<UpdateTicketQtyByCapacity['doQtyBulkUpdate']>(
		async (uniqInputs) => {
			if (uniqInputs.length) {
				// remove duplicate entries, if any
				const uniqueInputs = uniqTicketsByMinQty(uniqInputs);
				// perform the bulk update
				await bulkEditTickets({ uniqueInputs });
			}
		},
		[bulkEditTickets]
	);

	return useMemo(() => ({ createBulkQtyUpdateInput, doQtyBulkUpdate }), [createBulkQtyUpdateInput, doQtyBulkUpdate]);
};
