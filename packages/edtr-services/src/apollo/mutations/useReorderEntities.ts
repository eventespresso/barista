import { useCallback, useState, useMemo, useEffect } from 'react';
import { clone } from 'ramda';
import type { MutationResult } from '@apollo/client';

import { __ } from '@eventespresso/i18n';
import { gql, useMutation } from '@eventespresso/data';
import { useSystemNotifications } from '@eventespresso/toaster';
import { getGuids } from '@eventespresso/predicates';
import type { EntityId } from '@eventespresso/data';
import type { Datetime, Ticket } from '../types';

type Entity = Datetime | Ticket;

interface ReorderEntitiesProps<E extends Entity> {
	entityType: 'DATETIME' | 'TICKET';
	filteredEntities: Array<E>;
}

interface CallbackArgs<E extends Entity> {
	allEntities: Array<E>;
	newIndex: number;
	oldIndex: number;
}

type SortCallback<E extends Entity> = (args: CallbackArgs<E>) => Array<E>;

const REORDER_ENTITIES = gql`
	mutation REORDER_ENTITIES($input: ReorderEspressoEntitiesInput!) {
		reorderEspressoEntities(input: $input) {
			ok
		}
	}
`;

export interface ReorderEntities<E extends Entity> {
	allReorderedEntities: Array<E>;
	updateSortOrder: () => Promise<boolean>;
	result: MutationResult;
	sortEntities: SortCallback<E>;
	updateEntityList?: VoidFunction;
}

export const useReorderEntities = <E extends Entity>({
	entityType,
	filteredEntities,
}: ReorderEntitiesProps<E>): ReorderEntities<E> => {
	const toaster = useSystemNotifications();
	const [allEntityGuids, setAllEntityGuids] = useState<Array<EntityId>>([]);
	const [allReorderedEntities, setAllOrderedEntities] = useState<Array<E>>(filteredEntities);

	const [mutate, result] = useMutation(REORDER_ENTITIES);

	const updateSortOrder = useCallback(async () => {
		await mutate({
			variables: {
				input: {
					clientMutationId: 'REORDER_ENTITIES',
					entityIds: allEntityGuids,
					entityType,
				},
			},
		});
		toaster.success({ message: __('order updated') });
		return true;
	}, [allEntityGuids, entityType, mutate, toaster]);

	useEffect(() => {
		setAllOrderedEntities(filteredEntities);
	}, [filteredEntities]);

	const sortEntities = useCallback<SortCallback<E>>(
		({ allEntities: allEntitiesList, newIndex, oldIndex }) => {
			if (newIndex === oldIndex || newIndex < 0 || oldIndex < 0) {
				return;
			}

			const entityIds = clone(allReorderedEntities.map(({ id }) => id));
			let allEntities = clone(allEntitiesList);

			// remove entity from existing location in filtered list
			const [removed] = entityIds.splice(oldIndex, 1);

			// insert removed entity into new location in same list
			entityIds.splice(newIndex, 0, removed);

			// now loop thru entities in filtered list
			const entities = entityIds.map((entityId, index) => {
				// grab index of reordered entities in list of all entities
				const indexInAll = allEntities.findIndex((item) => item.id === entityId);
				// remove reordered entities from list of all entities
				const [entity] = allEntities.splice(indexInAll, 1);

				// reset the order property for all entities in filtered list
				return { ...entity, order: index + 1 };
			});

			// insert ordered entities at the beginning of the array
			// which means trashed ones will land up at the end
			allEntities = [...entities, ...allEntities];

			// but now we need to reset the order properties for ALL entities
			allEntities.map((entity, index) => {
				// add 1 so we don't end up with order: 0
				return { ...entity, order: index + 1 };
			});

			setAllOrderedEntities(entities);

			setAllEntityGuids(getGuids(allEntities));

			return allEntities;
		},
		[allReorderedEntities]
	);

	return useMemo(
		() => ({ allReorderedEntities, updateSortOrder, result, sortEntities }),
		[allReorderedEntities, updateSortOrder, result, sortEntities]
	);
};
