import { useCallback, useMemo } from 'react';
import { sortBy, pathOr } from 'ramda';

import {
	EntityTableFilters as EntityTableFiltersService,
	EntityTableFiltersCbArgs as EntityTableFiltersServiceCbArgs,
} from '@eventespresso/registry';
import type { SubscriptionCallback } from '@eventespresso/registry';
import type { EntityListFilterStateManager } from '@eventespresso/services';
import type { Entity } from '@eventespresso/data';

import type { EntityTableFilters } from './types';
import { TableRow, RowType } from '../EspressoTable';

type ELFSM = EntityListFilterStateManager;

const useEntityTableFilters = <D extends string, L extends string, FS extends ELFSM, E extends Entity>(
	domain: D,
	listId: L
): EntityTableFilters<FS, E> => {
	type ETF = EntityTableFilters<FS, E>;

	const { getFilters } = useMemo(() => new EntityTableFiltersService<D, L, ELFSM, E>(domain, listId), [
		domain,
		listId,
	]);

	const getCallbackList = useCallback(
		(
			mappedCallbackList: ReturnType<typeof getFilters>
		): Array<SubscriptionCallback<EntityTableFiltersServiceCbArgs<ELFSM, E>, TableRow>> => {
			const subscriptions = sortBy(pathOr(10, ['options', 'priority']), Object.values(mappedCallbackList));
			return subscriptions.map(({ callback }) => callback);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	type GetFilters = ReturnType<typeof getFilters>;

	const applyCallbacks = useCallback(
		(row: TableRow, filterState: FS, type: RowType, entity: E, mappedCallbackList: GetFilters): TableRow => {
			let filteredRow = row;

			const callbacks = getCallbackList(mappedCallbackList);

			callbacks.forEach((callback) => {
				filteredRow = callback({ row: filteredRow, filterState, type, entity });
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
