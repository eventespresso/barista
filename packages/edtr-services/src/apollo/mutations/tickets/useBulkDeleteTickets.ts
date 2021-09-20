import { useCallback } from 'react';
import { assocPath, pathOr } from 'ramda';
import type { ExecutionResult } from 'graphql';

import { EntityId, useApolloClient } from '@eventespresso/data';
import { entitiesWithGuIdNotInArray, findEntityByGuid } from '@eventespresso/predicates';

import type { Ticket, TicketsList } from '../../types';
import { useTickets, useTicketQueryOptions, DEFAULT_TICKET_LIST_DATA as DEFAULT_LIST_DATA } from '../../queries';
import { useUpdateTicketList } from '../../../hooks';
import useBulkDeleteEntities from '../useBulkDeleteEntities';
import { cacheNodesFromBulkDelete } from '../';
import { SINGULAR_ENTITY_NAME } from '../../../constants';
import useOnDeleteTicket from './useOnDeleteTicket';

type Callback<R = void> = (args: {
	entityIds: Array<EntityId>;
	deletePermanently?: boolean;
	deleteRemotely?: boolean;
	relatedDatetimeIds?: Array<EntityId>;
}) => R;

const useBulkDeleteTickets = (): Callback<Promise<ExecutionResult | void>> => {
	const allTickets = useTickets();
	const queryOptions = useTicketQueryOptions();
	const updateTicketList = useUpdateTicketList();
	const onDeleteTicket = useOnDeleteTicket();
	const { cache } = useApolloClient();

	const bulkDelete = useBulkDeleteEntities({ entityType: 'TICKET', typeName: SINGULAR_ENTITY_NAME.TICKET });

	const updateEntityList = useCallback<Callback<VoidFunction>>(
		({ entityIds, deletePermanently, relatedDatetimeIds }) =>
			() => {
				// Read the existing data from cache.
				let data: TicketsList;
				try {
					data = cache.readQuery(queryOptions);
				} catch (error) {
					data = null;
				}
				const tickets = data?.espressoTickets || DEFAULT_LIST_DATA;

				const findTicket = findEntityByGuid(tickets.nodes);
				const filteredTickets = { ...tickets };
				let ticket: Ticket;
				// run onDelete handler for every deleted ticket
				for (const entityId of entityIds) {
					ticket = findTicket(entityId);
					onDeleteTicket({
						cache,
						tickets: filteredTickets,
						ticket,
						deletePermanently,
					});
					filteredTickets.nodes = entitiesWithGuIdNotInArray(filteredTickets.nodes, [entityId]);
				}

				const nodes = cacheNodesFromBulkDelete(entityIds, allTickets, deletePermanently);

				let options: typeof queryOptions;
				// if bulk delete is done as a result of deletion of related date(s)
				if (relatedDatetimeIds.length) {
					const path = ['variables', 'where', 'datetimeIn'];
					// this is the current value for datetimeIn
					const datetimeIn = pathOr([], path, queryOptions);
					// remove the related dates from query options
					// to make sure ticket list is updated
					const finalDatetimeIn = datetimeIn.filter((id) => !relatedDatetimeIds.includes(id));
					// update query options
					options = assocPath(path, finalDatetimeIn, queryOptions);
				}

				updateTicketList({
					...queryOptions,
					...options,
					data: {
						espressoTickets: {
							...tickets,
							nodes,
						},
					},
				});
			},
		[allTickets, cache, onDeleteTicket, queryOptions, updateTicketList]
	);

	return useCallback(
		async ({ entityIds, deletePermanently, deleteRemotely = true, relatedDatetimeIds = [] }) => {
			const updateTheEntityList = updateEntityList({ entityIds, deletePermanently, relatedDatetimeIds });
			// if we need to send a remote request
			if (deleteRemotely) {
				return await bulkDelete({
					entityIds,
					deletePermanently,
					updateEntityList: updateTheEntityList,
				});
			}
			updateTheEntityList();
		},
		[bulkDelete, updateEntityList]
	);
};

export default useBulkDeleteTickets;
