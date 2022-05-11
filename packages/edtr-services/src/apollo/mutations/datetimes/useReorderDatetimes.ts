import { useCallback, useMemo, useState } from 'react';

import { datetimesDroppableId } from '@eventespresso/constants';

import type { EntityId } from '@eventespresso/data';
import type { EntityTableProps } from '@eventespresso/ee-components';

import { ReorderEntities, useReorderEntities } from '../useReorderEntities';
import { useDatetimes, useDatetimeQueryOptions, useLazyDatetime } from '../../queries';
import { useUpdateDatetimeList } from '../../../hooks';
import { DatetimesFilterStateManager as DFSM } from '../../../filterState';
import type { Datetime, DatetimeEdge } from '../../types';

type SortResponder = EntityTableProps<DFSM>['onSort'];

interface ReorderDatetimes extends Pick<ReorderEntities<Datetime>, 'allReorderedEntities' | 'updateEntityList'> {
	sortResponder: SortResponder;
	updateEntityList: VoidFunction;
}

const useReorderDatetimes = (filteredEntityIds: Array<EntityId>): ReorderDatetimes => {
	const [allUpdatedEntities, setAllUpdatedEntities] = useState<Array<Datetime>>([]);
	const getDatetime = useLazyDatetime();

	const datetimes = useMemo(() => filteredEntityIds.map(getDatetime), [filteredEntityIds, getDatetime]);

	const { allReorderedEntities, updateSortOrder, sortEntities } = useReorderEntities<Datetime>({
		entityType: 'DATETIME',
		filteredEntities: datetimes,
	});
	const allEntities = useDatetimes();

	const queryOptions = useDatetimeQueryOptions();
	const updateDatetimeList = useUpdateDatetimeList();

	const updateEntityList = useCallback(async () => {
		const espressoDatetimes: DatetimeEdge = {
			nodes: allUpdatedEntities,
			__typename: 'EspressoRootQueryDatetimesConnection',
		};

		await updateSortOrder();

		updateDatetimeList({
			...queryOptions,
			data: {
				espressoDatetimes,
			},
		});
	}, [allUpdatedEntities, updateSortOrder, queryOptions, updateDatetimeList]);

	const sortResponder = useCallback<SortResponder>(
		({ destination, source }) => {
			const noDestination = !destination;
			const noChange = source?.index === destination?.index && destination?.droppableId === source?.droppableId;
			const notOurListOfInterest = destination?.droppableId !== datetimesDroppableId;

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

export default useReorderDatetimes;
