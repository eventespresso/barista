import { useCallback, useMemo, useState } from 'react';

import { ticketDroppableId } from '@eventespresso/constants';
import type { EntityId } from '@eventespresso/data';
import type { EntityTableProps } from '@eventespresso/ee-components';

import { ReorderEntities, useReorderEntities } from '../useReorderEntities';
import { TicketsFilterStateManager as TFSM } from '../../../filterState';
import { useTickets, useTicketQueryOptions, useLazyTicket } from '../../queries';
import { useUpdateTicketList } from '../../../hooks';
import type { Ticket, TicketEdge } from '../../types';

type SortResponder = EntityTableProps<TFSM>['onSort'];

interface ReorderTickets extends Pick<ReorderEntities<Ticket>, 'allReorderedEntities' | 'updateEntityList'> {
	sortResponder: SortResponder;
}

const useReorderTickets = (filteredEntityIds: Array<EntityId>): ReorderTickets => {
	const [allUpdatedEntities, setAllUpdatedEntities] = useState<Array<Ticket>>([]);
	const getTicket = useLazyTicket();
	const filteredTickets = useMemo(() => filteredEntityIds.map(getTicket), [filteredEntityIds, getTicket]);

	const { allReorderedEntities, updateSortOrder, sortEntities } = useReorderEntities<Ticket>({
		entityType: 'TICKET',
		filteredEntities: filteredTickets,
	});

	const allEntities = useTickets();

	const queryOptions = useTicketQueryOptions();
	const updateTicketList = useUpdateTicketList();
	const updateEntityList = useCallback(async () => {
		const espressoTickets: TicketEdge = {
			nodes: allUpdatedEntities,
			__typename: 'EspressoRootQueryTicketsConnection',
		};

		await updateSortOrder();

		updateTicketList({
			...queryOptions,
			data: {
				espressoTickets,
			},
        });

	}, [allUpdatedEntities, updateSortOrder, queryOptions, updateTicketList]);

	const sortResponder = useCallback<SortResponder>(
		({ destination, source }) => {
			const noDestination = !destination;
			const noChange = source?.index === destination?.index && destination?.droppableId === source?.droppableId;
			const notOurListOfInterest = destination?.droppableId !== ticketDroppableId;

			if (noDestination || noChange || notOurListOfInterest) {
				return;
			}

			const allSortedEntities = sortEntities({
				allEntities,
				newIndex: destination.index,
				oldIndex: source.index,
			});

			setAllUpdatedEntities(allSortedEntities);
		},
		[allEntities, sortEntities]
	);

	return useMemo(
		() => ({ allReorderedEntities, sortResponder, updateEntityList }),
		[allReorderedEntities, sortResponder, updateEntityList]
	);
};

export default useReorderTickets;
