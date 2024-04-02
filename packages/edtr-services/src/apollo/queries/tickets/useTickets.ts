import { useMemo } from 'react';
import { filter } from 'ramda';

import { useTicketsQuery } from '@eventespresso/data';
import { getCacheIds, TicketPred, isNotDefault } from '@eventespresso/predicates';
import useTicketQueryOptions from './useTicketQueryOptions';

import type { Ticket } from '@eventespresso/constants';
import type { TicketEdge } from '../../types';

const useTickets = (filterBy: TicketPred = isNotDefault): Array<Ticket> => {
	const options = useTicketQueryOptions();

	const { data } = useTicketsQuery<TicketEdge>(options);

	const nodes = data?.espressoTickets?.nodes || [];

	const cacheIds = getCacheIds(nodes);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useMemo(() => filter(filterBy, nodes), [cacheIds]);
};

export default useTickets;
