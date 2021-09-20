import { useCallback } from 'react';
import type { ExecutionResult } from 'graphql';

import { EntityId, useApolloClient } from '@eventespresso/data';
import { entitiesWithGuIdNotInArray, findEntityByGuid } from '@eventespresso/predicates';

import type { Datetime, DatetimeEdge, DatetimesList } from '../../types';
import { useDatetimes, useDatetimeQueryOptions, DEFAULT_DATETIME_LIST_DATA as DEFAULT_LIST_DATA } from '../../queries';
import { useUpdateDatetimeList } from '../../../hooks';
import useBulkDeleteEntities from '../useBulkDeleteEntities';
import { cacheNodesFromBulkDelete } from '../';
import useOnDeleteDatetime from './useOnDeleteDatetime';
import useDeleteRelatedTickets from './useDeleteRelatedTickets';
import { SINGULAR_ENTITY_NAME } from '../../../constants';

type Callback<R = void> = (entityIds: Array<EntityId>, deletePermanently?: boolean) => R;

const useBulkDeleteDatetimes = (): Callback<Promise<ExecutionResult>> => {
	const allDatetimes = useDatetimes();
	const queryOptions = useDatetimeQueryOptions();
	const updateDatetimeList = useUpdateDatetimeList();
	const onDeleteDatetime = useOnDeleteDatetime();

	const { cache } = useApolloClient();

	const bulkDelete = useBulkDeleteEntities({ entityType: 'DATETIME', typeName: SINGULAR_ENTITY_NAME.DATETIME });

	const deleteRelatedTickets = useDeleteRelatedTickets();

	const updateEntityList = useCallback<Callback<VoidFunction>>(
		(entityIds, deletePermanently) => async () => {
			// delete related tickets for each date
			for (const entityId of entityIds) {
				await deleteRelatedTickets(entityId, deletePermanently);
			}

			// Read the existing data from cache.
			let data: DatetimesList;
			try {
				data = cache.readQuery(queryOptions);
			} catch (error) {
				data = null;
			}
			const datetimes = data?.espressoDatetimes || DEFAULT_LIST_DATA;

			const findDatetime = findEntityByGuid(datetimes.nodes);
			const filteredDatetimes = { ...datetimes };
			let datetime: Datetime;
			// run onDelete handler for every deleted datetime
			for (const entityId of entityIds) {
				datetime = findDatetime(entityId);
				onDeleteDatetime({
					cache,
					datetimes: filteredDatetimes,
					datetime,
					deletePermanently,
				});
				filteredDatetimes.nodes = entitiesWithGuIdNotInArray(filteredDatetimes.nodes, [entityId]);
			}

			const nodes = cacheNodesFromBulkDelete(entityIds, allDatetimes, deletePermanently);

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
		},
		[allDatetimes, cache, deleteRelatedTickets, onDeleteDatetime, queryOptions, updateDatetimeList]
	);

	return useCallback(
		async (entityIds, deletePermanently) => {
			return await bulkDelete({
				entityIds,
				deletePermanently,
				updateEntityList: updateEntityList(entityIds, deletePermanently),
			});
		},
		[bulkDelete, updateEntityList]
	);
};

export default useBulkDeleteDatetimes;
