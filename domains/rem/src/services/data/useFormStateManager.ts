import { useCallback, useMemo, useReducer, useEffect } from 'react';

import type { FormStateManager, FormStateManagerHook } from './types';
import useDataReducer, { initialState } from './useFormStateReducer';
import useInitialState from './useInitialState';

type FSM = FormStateManager;

const useFormStateManager: FormStateManagerHook = (datetime) => {
	const initializer = useInitialState(datetime);
	const dataReducer = useDataReducer(initializer);
	const [state, dispatch] = useReducer(dataReducer, initialState, initializer);

	// temporary
	useEffect(() => {
		console.log('REM form state', state);
	}, [state]);

	const getData: FSM['getData'] = useCallback(() => state, [state]);

	const setRRule: FSM['setRRule'] = useCallback((rRule) => {
		dispatch({
			type: 'SET_R_RULE',
			rRule,
		});
	}, []);

	const setExRule: FSM['setExRule'] = useCallback((exRule) => {
		dispatch({
			type: 'SET_EX_RULE',
			exRule,
		});
	}, []);

	const setDateDetails: FSM['setDateDetails'] = useCallback((dateDetails) => {
		dispatch({
			type: 'SET_DATE_DETAILS',
			dateDetails,
		});
	}, []);

	const setTicketDetails: FSM['setTicketDetails'] = useCallback((dateDetails) => {
		dispatch({
			type: 'SET_TICKET_DETAILS',
			dateDetails,
		});
	}, []);

	const updateDateField: FSM['updateDateField'] = useCallback((field, value) => {
		dispatch({
			type: 'SET_DATE_DETAILS',
			dateDetails: { [field]: value },
		});
	}, []);

	return useMemo(
		() => ({
			...state,
			getData,
			setDateDetails,
			setExRule,
			setRRule,
			setTicketDetails,
			updateDateField,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[state]
	);
};

export default useFormStateManager;
