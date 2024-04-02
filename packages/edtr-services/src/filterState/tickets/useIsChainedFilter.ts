import { useCallback, useMemo } from 'react';
import { keys, pathOr, pickBy, hasPath } from 'ramda';

import { useRelations } from '@eventespresso/services';
import { entitiesWithGuIdInArray } from '@eventespresso/predicates';
import { useVisibleDatetimeIds } from '../../hooks';

import type { Ticket } from '@eventespresso/constants';

type IsChainedFilterCallback = (args: { isChained: boolean; tickets: Array<Ticket> }) => Array<Ticket>;
type IsChainedFilterDeps = any;

type IsChainedFilterTuple = [IsChainedFilterCallback, IsChainedFilterDeps];

const useIsChainedFilter = (): IsChainedFilterTuple => {
	const { getData } = useRelations();
	const [visibleDatetimeIds] = useVisibleDatetimeIds();

	const relatedTicketIds = useMemo(() => {
		return keys(
			pickBy((relations) => {
				return (
					hasPath(['datetimes'], relations) &&
					pathOr([], ['datetimes'], relations).some((id) => visibleDatetimeIds.includes(id))
				);
			}, getData().tickets)
		);
	}, [getData, visibleDatetimeIds]);

	const callback = useCallback<IsChainedFilterCallback>(
		({ isChained, tickets }) => {
			// bail early
			if (!isChained) {
				return tickets;
			}

			return entitiesWithGuIdInArray(tickets, relatedTicketIds);
		},

		[relatedTicketIds]
	);

	return useMemo(() => [callback, relatedTicketIds], [callback, relatedTicketIds]);
};

export default useIsChainedFilter;
