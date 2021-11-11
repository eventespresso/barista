import { useCallback } from 'react';
import * as R from 'ramda';

import { useRelations } from '@eventespresso/services';
import { MutationType, InternalRefetchQueriesInclude } from '@eventespresso/data';

import { GET_DATETIME } from '../../queries';
import { TicketCommonInput } from './types';

type AffectedDatesQueries = (args: {
	input: TicketCommonInput;
	mutationType?: MutationType;
}) => InternalRefetchQueriesInclude;

/**
 * Returns the queries of the affected dates as a result of ticket mutations.
 */
const useAffectedDatesQueries = (): AffectedDatesQueries => {
	const { getRelations } = useRelations();

	return useCallback(
		({ input, mutationType = MutationType.Update }) => {
			// if we have an id and related datetimes or if it's a delete mutation
			if ((input.id && input.datetimes) || mutationType === MutationType.Delete) {
				const oldDatetimeIds = getRelations({
					entity: 'tickets',
					entityId: input.id,
					relation: 'datetimes',
				});

				// These are the datetime ids which were removed or added for the ticket.
				// It removes the ids that were present before as well as afterwards.
				const affectedDatetimeIds = R.difference(
					R.union(oldDatetimeIds, input.datetimes || []),
					R.intersection(oldDatetimeIds, input.datetimes || [])
				);

				return affectedDatetimeIds.map<InternalRefetchQueriesInclude[number]>((id) => ({
					query: GET_DATETIME,
					variables: { id },
				}));
			}
		},
		[getRelations]
	);
};

export default useAffectedDatesQueries;
