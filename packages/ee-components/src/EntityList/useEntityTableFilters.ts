import { useCallback, useMemo } from 'react';
import { sortBy, pathOr } from 'ramda';

import {
	EntityTableFilters as EntityTableFiltersService,
	EntityTableFiltersCbArgs as EntityTableFiltersServiceCbArgs,
} from '@eventespresso/registry';
import type { SubscriptionCallback } from '@eventespresso/registry';
import type { EntityListFilterStateManager } from '@eventespresso/services';
import type { EntityId } from '@eventespresso/constants'
import { TableRow, RowType } from '@eventespresso/ui-components';

import type { EntityTableFilters } from './types';

type ELFSM = EntityListFilterStateManager;

const useEntityTableFilters = <D extends string, L extends string, FS extends ELFSM>(
	domain: D,
	listId: L
): EntityTableFilters<FS> => {
	type ETF = EntityTableFilters<FS>;

	const { getFilters } = useMemo(() => new EntityTableFiltersService<D, L, ELFSM>(domain, listId), [domain, listId]);

	type CallbackList = Array<SubscriptionCallback<EntityTableFiltersServiceCbArgs<ELFSM>, TableRow>>;

	const getCallbackList = useCallback(
		(mappedCallbackList: ReturnType<typeof getFilters>): CallbackList => {
			const subscriptions = sortBy(pathOr(10, ['options', 'priority']), Object.values(mappedCallbackList));
			return subscriptions.map(({ callback }) => callback);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	type GetFilters = ReturnType<typeof getFilters>;

	const applyCallbacks = useCallback(
		(
			row: TableRow,
			filterState: FS,
			type: RowType,
			entityId: EntityId,
			mappedCallbackList: GetFilters
		): TableRow => {
			let filteredRow = row;

			const callbacks = getCallbackList(mappedCallbackList);

			callbacks.forEach((callback) => {
				filteredRow = callback({ row: filteredRow, filterState, type, entityId });
			});

			return filteredRow;
		},
		[getCallbackList]
	);

	// avoid the callback being affected by change in other callbacks
	const filterIdsStr = Object.keys(getFilters()).join(':');
	const applyFilters = useCallback<ETF['applyFilters']>(
		(row, filterState, type, entity) => {
			return applyCallbacks(row, filterState, type, entity, getFilters());
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[applyCallbacks, filterIdsStr]
	);

	return useMemo(
		() => ({
			applyFilters,
		}),
		[applyFilters]
	);
};

export default useEntityTableFilters;
