import { useCallback } from 'react';
import * as R from 'ramda';

import { useRelations } from '@eventespresso/services';

import { useRefreshDatetimes } from '../../queries';
import type { TicketMutationCallbackFnArgs } from '../types';

type UpdateDatesCache = (args: TicketMutationCallbackFnArgs) => void;

/**
 * Updates the dates list cache by updating the dates affected by related tickets.
 */
const useUpdateDatesCache = (): UpdateDatesCache => {
	const { getRelations } = useRelations();
	const refreshDatetimes = useRefreshDatetimes();

	return useCallback(
		({ datetimeIds, ticket }) => {
			const oldDatetimeIds = getRelations({
				entity: 'tickets',
				entityId: ticket.id,
				relation: 'datetimes',
			});

			// These are the datetime ids which were removed or added for the ticket.
			// It removes the ids that were present before as well as afterwards.
			const affectedDatetimeIds = R.difference(
				R.union(oldDatetimeIds, datetimeIds),
				R.intersection(oldDatetimeIds, datetimeIds)
			);

			refreshDatetimes(affectedDatetimeIds);
		},
		[getRelations, refreshDatetimes]
	);
};

export default useUpdateDatesCache;
