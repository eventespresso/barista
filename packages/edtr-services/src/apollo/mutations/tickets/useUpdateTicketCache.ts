import { useCallback } from 'react';
import { findIndex, update } from 'ramda';

import { WriteQueryOptions } from '@eventespresso/data';
import { entityHasGuid } from '@eventespresso/predicates';

import { useTicketQueryOptions } from '../../queries';
import type { CacheUpdaterFn, CacheUpdaterFnArgs } from '../types';
import { TicketsList } from '../..';
import type { Ticket } from '@eventespresso/constants';

const useUpdateTicketCache = (): CacheUpdaterFn => {
	const queryOptions = useTicketQueryOptions();

	const updateTicketCache = useCallback(
		({ cache, tickets, ticket, action }: CacheUpdaterFnArgs): void => {
			const { nodes = [] } = tickets;
			let newNodes: Array<Ticket> = [],
				ticketIndex: number;
			switch (action) {
				case 'add':
					newNodes = [...nodes, ticket];
					break;
				case 'update':
					// find the index of the ticket to update
					ticketIndex = findIndex(entityHasGuid(ticket.id), nodes);
					// if ticket exists
					if (ticketIndex >= 0) {
						newNodes = update(ticketIndex, ticket, nodes);
					}
					break;
				case 'remove':
					newNodes = nodes.filter(({ id }) => id !== ticket.id);
					break;
				default:
					newNodes = nodes;
					break;
			}

			// write the data to cache without
			// mutating the cache directly
			const writeOptions: WriteQueryOptions = {
				...queryOptions,
				data: {
					espressoTickets: {
						...tickets,
						nodes: newNodes,
					},
				},
			};
			cache.writeQuery<TicketsList>(writeOptions);
		},
		[queryOptions]
	);

	return updateTicketCache;
};

export default useUpdateTicketCache;
