import { useCallback, useMemo, useReducer } from 'react';

import type { FormStateManager, FormStateManagerHook } from './types';
import useDataReducer, { initialState } from './useFormStateReducer';
import useInitialState from './useInitialState';

type FSM = FormStateManager;

const useFormStateManager: FormStateManagerHook = () => {
	const initializer = useInitialState();
	const dataReducer = useDataReducer(initializer);
	const [state, dispatch] = useReducer(dataReducer, initialState, initializer);

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

	const addRDate: FSM['addRDate'] = useCallback((date) => {
		dispatch({
			type: 'ADD_R_DATE',
			date,
		});
	}, []);

	const addExDate: FSM['addExDate'] = useCallback((date) => {
		dispatch({
			type: 'ADD_EX_DATE',
			date,
		});
	}, []);

	const removeRDate: FSM['removeRDate'] = useCallback((date) => {
		dispatch({
			type: 'REMOVE_R_DATE',
			date,
		});
	}, []);

	const removeExDate: FSM['removeExDate'] = useCallback((date) => {
		dispatch({
			type: 'REMOVE_EX_DATE',
			date,
		});
	}, []);

	const setDateDetails: FSM['setDateDetails'] = useCallback((dateDetails) => {
		dispatch({
			type: 'SET_DATE_DETAILS',
			dateDetails,
		});
	}, []);

	const setVenue: FSM['setVenue'] = useCallback((venue) => {
		dispatch({
			type: 'SET_VENUE',
			venue,
		});
	}, []);

	const addTicket: FSM['addTicket'] = useCallback((ticket) => {
		dispatch({
			type: 'ADD_TICKET',
			ticket,
		});
	}, []);

	const updateTicket: FSM['updateTicket'] = useCallback((id, ticket) => {
		dispatch({
			type: 'UPDATE_TICKET',
			id,
			ticket,
		});
	}, []);

	const updateDateField: FSM['updateDateField'] = useCallback((field, value) => {
		dispatch({
			type: 'SET_DATE_DETAILS',
			dateDetails: { [field]: value },
		});
	}, []);

	const deleteTicket: FSM['deleteTicket'] = useCallback((id) => {
		dispatch({
			type: 'DELETE_TICKET',
			id,
		});
	}, []);

	const reset: FSM['reset'] = useCallback(() => {
		dispatch({ type: 'RESET' });
	}, []);

	return useMemo(
		() => ({
			...state,
			addExDate,
			addRDate,
			addTicket,
			deleteTicket,
			getData,
			removeExDate,
			removeRDate,
			setDateDetails,
			setVenue,
			setExRule,
			setRRule,
			updateDateField,
			updateTicket,
			reset,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[state]
	);
};

export default useFormStateManager;
