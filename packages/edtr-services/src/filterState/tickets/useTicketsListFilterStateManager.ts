import { useCallback, useEffect, useMemo, useState } from 'react';

import { DisplayStartOrEndDate, SortBy } from '../types';
import { ticketsList } from '../../constants';
import { useEntityListFilterStateManager } from '@eventespresso/services';
import { useVisibleDatetimeIds } from '../../hooks';
import { useSessionStorageReducer } from '@eventespresso/storage';
import { TicketsSalesFilters, TicketsStatusFilters } from '@eventespresso/predicates';

import reducer from './reducer';
import type { TicketsFilterState, TicketsFilterStateManager } from './types';

type FSM = TicketsFilterStateManager;
type TFS = TicketsFilterState;

const initialState: TicketsFilterState = {
	displayStartOrEndDate: DisplayStartOrEndDate.start,
	isChained: true,
	sales: TicketsSalesFilters.all,
	status: TicketsStatusFilters.onSaleAndPending,
};
type ResetPageNumber = <K extends keyof TFS>(filter: K, value: TFS[K]) => void;

const useTicketsListFilterStateManager = (): FSM => {
	const [state, dispatch] = useSessionStorageReducer('ticket-list-filter-state', reducer, initialState);

	const [visibleDatesStr, setVisibleDatesStr] = useState('');

	const [visibleDatetimeIds] = useVisibleDatetimeIds();

	const entityFilterState = useEntityListFilterStateManager<SortBy>('order', ticketsList);

	const { setPageNumber } = entityFilterState;

	// subscribe to visible dates for isChained
	useEffect(() => {
		if (state.isChained) {
			setVisibleDatesStr(visibleDatetimeIds.join(':'));
		}
	}, [state.isChained, visibleDatetimeIds]);

	const resetPageNumber = useCallback<ResetPageNumber>(
		(filter, value) => {
			if (value !== state[filter]) {
				setPageNumber(1);
			}
		},
		[setPageNumber, state]
	);

	const setDisplayStartOrEndDate: FSM['setDisplayStartOrEndDate'] = useCallback(
		(displayStartOrEndDate) => {
			dispatch({
				type: 'SET_DISPLAY_START_OR_END_DATE',
				displayStartOrEndDate,
			});
		},
		[dispatch]
	);

	const setSales: FSM['setSales'] = useCallback(
		(sales) => {
			resetPageNumber('sales', sales);

			dispatch({
				type: 'SET_SALES',
				sales,
			});
		},
		[dispatch, resetPageNumber]
	);

	const setStatus: FSM['setStatus'] = useCallback(
		(status) => {
			resetPageNumber('status', status);
			dispatch({
				type: 'SET_STATUS',
				status,
			});
		},
		[dispatch, resetPageNumber]
	);

	const toggleIsChained: FSM['toggleIsChained'] = useCallback(() => {
		dispatch({
			type: 'TOGGLE_IS_CHAINED',
		});
	}, [dispatch]);

	return useMemo(
		() => ({
			...state,
			...entityFilterState,
			setDisplayStartOrEndDate,
			setSales,
			setStatus,
			toggleIsChained,
			visibleDatesStr,
		}),
		[entityFilterState, visibleDatesStr, setDisplayStartOrEndDate, setSales, toggleIsChained, state, setStatus]
	);
};

export default useTicketsListFilterStateManager;
