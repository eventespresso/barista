import { useCallback, useMemo } from 'react';

import { useMutationWithFeedback, MutationType } from '@eventespresso/data';
import { useDatetimeQueryOptions, useDatetimes } from '../../queries';
import { BulkUpdateDatetimeInput, BULK_UPDATE_DATETIMES } from './';
import useOnUpdateDatetime from './useOnUpdateDatetime';
import { useUpdateDatetimeList } from '../../../hooks';
import { cacheNodesFromBulkInput, updateDatetimeFlags } from '../utils';
import type { DatetimeEdge, Datetime } from '../../types';
import { SINGULAR_ENTITY_NAME } from '../../../constants';

interface BulkEditDatetimes {
	updateEntities: (input: BulkUpdateDatetimeInput) => ReturnType<ReturnType<typeof useMutationWithFeedback>>;
}

const useBulkEditDatetimes = (): BulkEditDatetimes => {
	const allDatetimes = useDatetimes();
	const queryOptions = useDatetimeQueryOptions();
	const updateDatetimeList = useUpdateDatetimeList();
	const onUpdateDatetime = useOnUpdateDatetime();

	const updateDatetimes = useMutationWithFeedback({
		typeName: SINGULAR_ENTITY_NAME.DATETIME,
		mutationType: MutationType.Update,
		mutation: BULK_UPDATE_DATETIMES,
	});

	const updateEntityList = useCallback(
		(input: BulkUpdateDatetimeInput) => () => {
			const nodes = cacheNodesFromBulkInput(input, allDatetimes).map(updateDatetimeFlags);

			const espressoDatetimes: DatetimeEdge = {
				nodes,
				__typename: 'EspressoRootQueryDatetimesConnection',
			};
			updateDatetimeList({
				...queryOptions,
				data: {
					espressoDatetimes,
				},
			});
			// update entity relations
			input.uniqueInputs.forEach(({ tickets, ...updateInput }) => {
				onUpdateDatetime({ datetime: updateInput as Datetime, tickets });
			});
		},
		[allDatetimes, onUpdateDatetime, queryOptions, updateDatetimeList]
	);

	const updateEntities = useCallback<BulkEditDatetimes['updateEntities']>(
		(input) => {
			const variables = {
				input: {
					clientMutationId: 'BULK_UPDATE_DATETIMES',
					...input,
				},
			};
			return updateDatetimes({ variables, update: updateEntityList(input) });
		},
		[updateDatetimes, updateEntityList]
	);

	return useMemo(() => ({ updateEntities }), [updateEntities]);
};

export default useBulkEditDatetimes;
