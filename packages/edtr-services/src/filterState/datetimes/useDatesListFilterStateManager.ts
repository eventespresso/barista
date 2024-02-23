import { useCallback, useMemo } from 'react';

import { useEntityListFilterStateManager } from '@eventespresso/services';
import { DatetimeSalesFilters, DatetimeStatusFilters } from '@eventespresso/predicates';
import { useSessionStorageReducer } from '@eventespresso/storage';

import type { DatetimesFilterState, DatetimesFilterStateManager } from './types';
import { DisplayStartOrEndDate, SortBy } from '../types';
import { datesList } from '../../constants';
import reducer from './reducer';

type FSM = DatetimesFilterStateManager;
type DFS = DatetimesFilterState;

const initialState: DFS = {
	displayStartOrEndDate: DisplayStartOrEndDate.start,
	sales: DatetimeSalesFilters.all,
	status: DatetimeStatusFilters.activeUpcoming,
	recurrence: '',
};

type ResetPageNumber = <K extends keyof DFS>(filter: K, value: DFS[K]) => void;

const useDatesListFilterStateManager = (): FSM => {
	const [state, dispatch] = useSessionStorageReducer('dates-list-filter-state', reducer, initialState);

	const entityFilterState = useEntityListFilterStateManager<SortBy>('order', datesList);

	const { setPageNumber } = entityFilterState;

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

	const setRecurrence: FSM['setRecurrence'] = useCallback(
		(recurrence) => {
			resetPageNumber('recurrence', recurrence);

			dispatch({
				type: 'SET_RECURRENCE',
				recurrence,
			});
		},
		[dispatch, resetPageNumber]
	);

	return useMemo(
		() => ({
			...state,
			...entityFilterState,
			setDisplayStartOrEndDate,
			setSales,
			setStatus,
			setRecurrence,
		}),
		[state, entityFilterState, setDisplayStartOrEndDate, setSales, setStatus, setRecurrence]
	);
};

export default useDatesListFilterStateManager;
