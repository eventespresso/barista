import { useCallback, useEffect, useMemo, useReducer } from 'react';
import * as R from 'ramda';

import type { FormStateManager, FormStateManagerHook } from './types';
import { useFormStateReducer, initialState } from './useFormStateReducer';
import { useInitialState } from './useInitialState';
import { sortByOrder, isNotSharedOrDefault } from '../utils';

type FSM = FormStateManager;

export const useFormStateManager: FormStateManagerHook = ({ onChange, ...props }) => {
	const initializer = useInitialState(props);
	const reducer = useFormStateReducer(initializer);
	const [state, dispatch] = useReducer(reducer, initialState, initializer);

	useEffect(() => {
		onChange?.(state);
	}, [onChange, state]);

	const getData = useCallback<FSM['getData']>(() => state, [state]);

	const getSections = useCallback<FSM['getSections']>(() => {
		const sections = Object.values(state.sections).filter(isNotSharedOrDefault);
		return sortByOrder(sections);
	}, [state.sections]);

	const getElements = useCallback<FSM['getElements']>(
		({ sectionId }) => {
			let elements = Object.values(state.elements);
			if (sectionId) {
				elements = elements.filter(R.propEq('belongsTo', sectionId));
			}
			return sortByOrder(elements);
		},
		[state.elements]
	);

	const addSection = useCallback<FSM['addSection']>(({ section, afterId }) => {
		dispatch({
			type: 'ADD_SECTION',
			afterId,
			section,
		});
	}, []);

	const copySection = useCallback<FSM['copySection']>(({ id, section }) => {
		dispatch({
			type: 'COPY_SECTION',
			id,
			section,
		});
	}, []);

	const moveSection = useCallback<FSM['moveSection']>(({ id, index }) => {
		dispatch({
			type: 'MOVE_SECTION',
			id,
			index,
		});
	}, []);

	const updateSection = useCallback<FSM['updateSection']>(({ id, section }) => {
		dispatch({
			type: 'UPDATE_SECTION',
			id,
			section,
		});
	}, []);

	const deleteSection = useCallback<FSM['deleteSection']>(({ id }) => {
		dispatch({
			type: 'DELETE_SECTION',
			id,
		});
	}, []);

	const addElement = useCallback<FSM['addElement']>(({ element }) => {
		dispatch({
			type: 'ADD_ELEMENT',
			element,
		});
	}, []);

	const copyElement = useCallback<FSM['copyElement']>(({ id }) => {
		dispatch({
			type: 'COPY_ELEMENT',
			id,
		});
	}, []);

	const moveElement = useCallback<FSM['moveElement']>(({ id, index, sectionId }) => {
		dispatch({
			type: 'MOVE_ELEMENT',
			id,
			index,
			sectionId,
		});
	}, []);

	const updateElement = useCallback<FSM['updateElement']>(({ id, element }) => {
		dispatch({
			type: 'UPDATE_ELEMENT',
			id,
			element,
		});
	}, []);

	const deleteElement = useCallback<FSM['deleteElement']>(({ id }) => {
		dispatch({
			type: 'DELETE_ELEMENT',
			id,
		});
	}, []);

	const isElementOpen = useCallback<FSM['isElementOpen']>(({ id }) => id === state.openElement, [state.openElement]);

	const toggleOpenElement = useCallback<FSM['toggleOpenElement']>(({ openElement }) => {
		dispatch({
			type: 'TOGGLE_OPEN_ELEMENT',
			openElement,
		});
	}, []);

	const reset = useCallback<FSM['reset']>(() => {
		dispatch({ type: 'RESET' });
	}, []);

	return useMemo<FSM>(
		() => ({
			...state,
			addElement,
			addSection,
			copyElement,
			copySection,
			deleteElement,
			deleteSection,
			getData,
			getElements,
			getSections,
			isElementOpen,
			moveElement,
			moveSection,
			reset,
			toggleOpenElement,
			updateElement,
			updateSection,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[state]
	);
};
