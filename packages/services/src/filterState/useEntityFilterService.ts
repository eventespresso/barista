import { useCallback, useMemo } from 'react';
import { sortBy, pathOr } from 'ramda';

import type { Entity } from '@eventespresso/data';
import { FilterBarService, FilterBarServiceCbArgs } from '@eventespresso/registry';
import type { SubscriptionCallback } from '@eventespresso/registry';
import type { EntityFilterService, EntityListFilterStateManager } from './types';

type ELFSM = EntityListFilterStateManager;

const useEntityFilterService = <D extends string, L extends string, E extends Entity, FS extends ELFSM>(
	domain: D,
	listId: L
): EntityFilterService<E, FS> => {
	type EFS = EntityFilterService<E, FS>;

	const { getFilters, getSearches, getSorters } = useMemo(
		() => new FilterBarService<D, L, E, ELFSM>(domain, listId),
		[domain, listId]
	);

	type CallbackList = Array<SubscriptionCallback<FilterBarServiceCbArgs<E, ELFSM>, E[]>>;

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
		(entityList: Array<E>, filterState: FS, mappedCallbackList: GetFilters): Array<E> => {
			let filteredEntities = entityList;

			const callbacks = getCallbackList(mappedCallbackList);

			callbacks.forEach((callback) => {
				filteredEntities = callback({ entityList: filteredEntities, filterState });
			});

			return filteredEntities;
		},
		[getCallbackList]
	);

	// avoid the callback being affected by change in other callbacks
	const filterIdsStr = Object.keys(getFilters()).join(':');
	const applyFilters = useCallback<EFS['applyFilters']>(
		(entityList, filterState) => {
			return applyCallbacks(entityList, filterState, getFilters());
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[applyCallbacks, filterIdsStr]
	);

	// avoid the callback being affected by change in other callbacks
	const searchIdsStr = Object.keys(getSearches()).join(':');
	const applySearches = useCallback<EFS['applySearches']>(
		(entityList, filterState) => {
			return applyCallbacks(entityList, filterState, getSearches());
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[applyCallbacks, searchIdsStr]
	);

	// avoid the callback being affected by change in other callbacks
	const sorterIdsStr = Object.keys(getSorters()).join(':');
	const applySorters = useCallback<EFS['applySorters']>(
		(entityList, filterState) => {
			return applyCallbacks(entityList, filterState, getSorters());
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[applyCallbacks, sorterIdsStr]
	);

	return useMemo(
		() => ({
			applyFilters,
			applySearches,
			applySorters,
		}),
		[applyFilters, applySearches, applySorters]
	);
};

export default useEntityFilterService;
