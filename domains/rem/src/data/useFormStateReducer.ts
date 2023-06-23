import { useCallback } from 'react';
import * as R from 'ramda';

import { uuid } from '@eventespresso/utils';

import { FormStateReducer, StateInitializer, FormState } from './types';

export const initialState: FormState = {
	rRule: '',
	exRule: '',
	rDates: [],
	exDates: [],
	dateDetails: {},
	tickets: {},
	isDirty: false,
	venue: '',
};

const useFormStateReducer = (initializer: StateInitializer): FormStateReducer => {
	return useCallback<FormStateReducer>(
		(state, action) => {
			const { date, rRule, exRule, dateDetails, id, ticket, type, venue } = action;
			let ticketId: string, newState: FormState;

			switch (type) {
				case 'SET_R_RULE':
					return { ...state, rRule };
				case 'SET_EX_RULE':
					return { ...state, exRule };
				case 'ADD_R_DATE':
					newState = {
						...state,
						rDates: [...state.rDates, date],
					};
					break;

				case 'ADD_EX_DATE':
					newState = {
						...state,
						exDates: [...state.exDates, date],
					};
					break;

				case 'REMOVE_R_DATE':
					newState = {
						...state,
						rDates: R.without([date], state.rDates),
					};
					break;

				case 'REMOVE_EX_DATE':
					newState = {
						...state,
						exDates: R.without([date], state.exDates),
					};
					break;

				case 'SET_DATE_DETAILS':
					newState = {
						...state,
						dateDetails,
					};
					break;

				case 'SET_VENUE':
					newState = {
						...state,
						venue,
					};
					break;

				case 'ADD_TICKET':
				case 'UPDATE_TICKET':
					// use id to update and uuid to add new
					ticketId = id || uuid();
					// we need to make the id inside ticket and in tickets object same
					newState = R.assocPath(['tickets', ticketId], { ...ticket, id: ticketId }, state);
					break;

				case 'DELETE_TICKET':
					newState = {
						...state,
						tickets: R.omit([id], state.tickets),
					};
					break;

				case 'RESET':
					return initializer(initialState);

				default:
					throw new Error('Unexpected action');
			}

			return { ...newState, isDirty: true };
		},
		[initializer]
	);
};

export default useFormStateReducer;
