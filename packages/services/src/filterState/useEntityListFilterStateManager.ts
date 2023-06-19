import { useCallback, useEffect, useMemo, useReducer } from 'react';

import { useSessionStorageState } from '@eventespresso/storage';
import type { BasicSortBy, EntityListFilterState, EntityListFilterStateManager } from './types';
import useStateReducer from './useStateReducer';

// create a shorter generic to use at multiple places.
type ELFSM<SortBy = BasicSortBy> = EntityListFilterStateManager<SortBy>;

const useEntityListFilterStateManager = <SortBy = BasicSortBy>(
	defaultSortBy: SortBy,
	listId = '',
	defaultPerPage: number = 6
): ELFSM<SortBy> => {
	type FSM = ELFSM<SortBy>;

	const [view, setSessionView] = useSessionStorageState<FSM['view']>(`${listId}-view`, 'card');
	const [sortBy, setSessionSortBy] = useSessionStorageState<FSM['sortBy']>(`${listId}-sortBy`, defaultSortBy);
	const [perPage, setSessionPerPage] = useSessionStorageState<FSM['perPage']>(`${listId}-perPage`, defaultPerPage);

	const initialState = useMemo<EntityListFilterState<SortBy>>(
		() => ({
			pageNumber: 1,
			perPage,
			searchText: '',
			showBulkActions: false,
			sortBy,
			total: null,
			view,
		}),
		[perPage, sortBy, view]
	);
	const [state, dispatch] = useReducer(useStateReducer<SortBy>(), initialState);

	// Update `view` in session storage when it changes
	useEffect(() => {
		setSessionView(state.view);
	}, [state.view, setSessionView]);

	// Update `sortBy` in session storage when it changes
	useEffect(() => {
		setSessionSortBy(state.sortBy);
	}, [state.sortBy, setSessionSortBy]);

	// Update `perPage` in session storage when it changes
	useEffect(() => {
		setSessionPerPage(state.perPage);
	}, [state.perPage, setSessionPerPage]);

	const getState: FSM['getState'] = useCallback(() => state, [state]);

	const setSortBy: FSM['setSortBy'] = useCallback((sortBy) => {
		dispatch({
			type: 'SET_SORT_BY',
			sortBy,
		});
	}, []);

	const setPerPage: FSM['setPerPage'] = useCallback(
		(newPageNumber, newPerPage) => {
			// the pagination component will recalculate the page number
			// if it goes out of range after changing the perPage value,
			// so save that else we'll get no results returned
			if (newPageNumber && newPageNumber !== state.pageNumber) {
				setPageNumber(newPageNumber);
			}
			dispatch({
				type: 'SET_PER_PAGE',
				perPage: newPerPage,
			});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[state.pageNumber]
	);

	const setPageNumber: FSM['setPageNumber'] = useCallback((pageNumber) => {
		dispatch({
			type: 'SET_PAGE_NUMBER',
			pageNumber,
		});
	}, []);

	const setTotal: FSM['setTotal'] = useCallback((total) => {
		dispatch({
			type: 'SET_TOTAL',
			total,
		});
	}, []);

	const setCardView: FSM['setCardView'] = useCallback(() => {
		dispatch({
			type: 'SET_VIEW',
			view: 'card',
		});
	}, []);

	const setTableView: FSM['setTableView'] = useCallback(() => {
		dispatch({
			type: 'SET_VIEW',
			view: 'table',
		});
	}, []);

	const toggleBulkActions: FSM['toggleBulkActions'] = useCallback(() => {
		dispatch({
			type: 'TOGGLE_BULK_ACTIONS',
		});
	}, []);

	const setSearchText: FSM['setSearchText'] = useCallback((searchText) => {
		dispatch({
			searchText,
			type: 'SET_SEARCH_TEXT',
		});
	}, []);

	return useMemo(
		() => ({
			...state,
			getState,
			setCardView,
			setPageNumber,
			setPerPage,
			setSearchText,
			setSortBy,
			setTableView,
			setTotal,
			toggleBulkActions,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[state]
	);
};

export default useEntityListFilterStateManager;
