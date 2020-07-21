import type { Reducer, ReducerState } from 'react';

import type { DatetimeBaseInput, Ticket } from '@eventespresso/edtr-services';

export interface FormState {
	dateDetails: DatetimeBaseInput;
	exDates?: string;
	exRule: string;
	gDates?: string;
	rDates?: string;
	rRule: string;
	salesEndOffset?: string;
	salesStartOffset?: string;
	tickets: Ticket[];
}

export type DataActionType = 'SET_R_RULE' | 'SET_EX_RULE' | 'SET_DATE_DETAILS' | 'ADD_TICKET' | 'SET_TICKETS' | 'RESET';

export interface DataAction extends Partial<FormState> {
	type: DataActionType;
	ticket?: Ticket;
}

export type FormStateManagerHook = () => FormStateManager;

export interface FormStateManager extends FormState {
	getData: () => FormState;
	setDateDetails: (details: FormState['dateDetails']) => void;
	setTickets: (tickets: FormState['tickets']) => void;
	addTicket: (ticket: DataAction['ticket']) => void;
	setExRule: (exRule: FormState['exRule']) => void;
	setRRule: (rRule: FormState['rRule']) => void;
	updateDateField: <K extends keyof DatetimeBaseInput>(field: K, value: DatetimeBaseInput[K]) => void;
}

export type FormStateReducer = Reducer<FormState, DataAction>;

export type StateInitializer = (arg: FormState) => ReducerState<FormStateReducer>;
