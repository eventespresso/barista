import type { Entity } from '@eventespresso/data';
import type { PaginationState } from '@eventespresso/hooks';
import type { ListView } from '@eventespresso/ui-components';

export type BasicSortBy = 'name' | 'id';

export interface EntityListFilterState<SortBy = BasicSortBy> extends ListView, PaginationState {
	searchText: string;
	sortBy: SortBy;
	total: number;
}

export type EntityListFilterActionType =
	| 'SET_PAGE_NUMBER'
	| 'SET_PER_PAGE'
	| 'SET_SEARCH_TEXT'
	| 'TOGGLE_BULK_ACTIONS'
	| 'SET_SORT_BY'
	| 'SET_TOTAL'
	| 'SET_VIEW';

export interface EntityListFilterAction<SortBy = BasicSortBy> extends Partial<EntityListFilterState<SortBy>> {
	type: EntityListFilterActionType;
}

export interface EntityListFilterStateManager<SortBy = BasicSortBy> extends EntityListFilterState<SortBy> {
	getState: () => EntityListFilterState<SortBy>;
	setCardView: VoidFunction;
	setPageNumber: (page: number) => void;
	setPerPage: (newPageNumber: number, newPerPage: number) => void;
	setSearchText: (text: string) => void;
	setSortBy: (sortBy: SortBy) => void;
	setTableView: VoidFunction;
	setTotal: (total: number) => void;
}

export type EntityListFilterStateReducer<SortBy = BasicSortBy> = (
	state: EntityListFilterState<SortBy>,
	action: EntityListFilterAction<SortBy>
) => EntityListFilterState<SortBy>;

/***************************/
type ELFSM = EntityListFilterStateManager;
export type EntityFilterServiceHook = <D extends string, L extends string, E extends Entity, FS extends ELFSM>(
	domain: D,
	listId: L
) => EntityFilterService<E, FS>;

export interface EntityFilterService<E extends Entity, FS extends ELFSM> {
	applyFilters: (entityList: Array<E>, filterState: FS) => Array<E>;
	applySearches: (entityList: Array<E>, filterState: FS) => Array<E>;
	applySorters: (entityList: Array<E>, filterState: FS) => Array<E>;
}
