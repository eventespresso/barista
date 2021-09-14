import { useCallback, useMemo } from 'react';
import { identity } from 'ramda';

import { useMutationWithFeedback, MutationType } from '@eventespresso/data';
import { useSystemNotifications } from '@eventespresso/toaster';
import type { TicketPred } from '@eventespresso/predicates';

import type { TicketEdge, Ticket } from '../../types';
import { useTicketQueryOptions, useTickets } from '../../queries';
import { useUpdateTicketList } from '../../../hooks';
import { BulkUpdateTicketInput, BULK_UPDATE_TICKETS } from './';
import { SINGULAR_ENTITY_NAME } from '../../../constants';
import { cacheNodesFromBulkInput, updateTicketFlags } from '../utils';
import useOnUpdateTicket from './useOnUpdateTicket';

interface BulkEditTickets {
	updateEntities: (input: BulkUpdateTicketInput) => ReturnType<ReturnType<typeof useMutationWithFeedback>>;
}

const useBulkEditTickets = (): BulkEditTickets => {
	// ensure that bulk edit preserves default tickets
	const allTickets = useTickets(identity as TicketPred);
	const queryOptions = useTicketQueryOptions();
	const toaster = useSystemNotifications();
	const updateTicketList = useUpdateTicketList();
	const onUpdateTicket = useOnUpdateTicket();

	const updateTickets = useMutationWithFeedback({
		typeName: SINGULAR_ENTITY_NAME.TICKET,
		mutationType: MutationType.Update,
		mutation: BULK_UPDATE_TICKETS,
		toaster,
	});

	const updateEntityList = useCallback(
		(input: BulkUpdateTicketInput) => () => {
			const nodes = cacheNodesFromBulkInput(input, allTickets).map(updateTicketFlags);

			const espressoTickets: TicketEdge = {
				nodes,
				__typename: 'EspressoRootQueryTicketsConnection',
			};
			updateTicketList({
				...queryOptions,
				data: {
					espressoTickets,
				},
			});
			// update entity relations
			input.uniqueInputs.forEach(({ datetimes, prices, ...updateInput }) => {
				onUpdateTicket({ ticket: updateInput as Ticket, datetimeIds: datetimes, priceIds: prices });
			});
		},
		[allTickets, onUpdateTicket, queryOptions, updateTicketList]
	);

	const updateEntities = useCallback<BulkEditTickets['updateEntities']>(
		(input) => {
			const variables = {
				input: {
					clientMutationId: 'BULK_UPDATE_TICKETS',
					...input,
				},
			};
			return updateTickets({ variables, update: updateEntityList(input) });
		},
		[updateTickets, updateEntityList]
	);

	return useMemo(() => ({ updateEntities }), [updateEntities]);
};

export default useBulkEditTickets;
