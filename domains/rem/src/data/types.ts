import type { Reducer, ReducerState } from 'react';

import type { AnyObject } from '@eventespresso/utils';
import type { Entity, EntityId } from '@eventespresso/data';
import type { TpcPriceModifier } from '@eventespresso/tpc';
import type { UpdateTicketInput } from '@eventespresso/edtr-services';

import type { DateFormShape } from '../ui/datetimeDetails/types';
import type { RemTicketFields } from '../ui/Tickets/types';
import type { Recurrence } from '../services/apollo';

export interface RemTicket extends Entity, RemTicketFields, Omit<UpdateTicketInput, 'prices' | 'id'> {
	prices?: Array<TpcPriceModifier>;
	isShared: boolean;
}

export type StartAndEndDate = {
	startDate: Date;
	endDate: Date;
};

export interface FormState {
	dateDetails: DateFormShape;
	exDates?: Array<string>;
	exRule: string;
	gDates?: string;
	rDates?: Array<string>;
	rRule: string;
	salesEndOffset?: string;
	salesStartOffset?: string;
	tickets: AnyObject<RemTicket>;
	isDirty: boolean;
	venue: EntityId;
}

export type DataActionType =
	| 'SET_R_RULE'
	| 'SET_EX_RULE'
	| 'ADD_R_DATE'
	| 'ADD_EX_DATE'
	| 'REMOVE_R_DATE'
	| 'REMOVE_EX_DATE'
	| 'SET_DATE_DETAILS'
	| 'SET_VENUE'
	| 'ADD_TICKET'
	| 'UPDATE_TICKET'
	| 'DELETE_TICKET'
	| 'RESET';

export interface DataAction extends Partial<FormState> {
	type: DataActionType;
	id?: EntityId;
	ticket?: Partial<RemTicket>;
	date?: string;
}

export type FormStateManagerHook = () => FormStateManager;

export interface FormStateManager extends FormState {
	addTicket: (ticket: DataAction['ticket']) => void;
	deleteTicket: (id: string) => void;
	getData: () => FormState;
	setDateDetails: (details: FormState['dateDetails']) => void;
	setVenue: (venue: EntityId) => void;
	setExRule: (exRule: FormState['exRule']) => void;
	setRRule: (rRule: FormState['rRule']) => void;
	addRDate: (date: string) => void;
	removeRDate: (date: string) => void;
	reset: () => void;
	addExDate: (date: string) => void;
	removeExDate: (date: string) => void;
	updateDateField: <K extends keyof DateFormShape>(field: K, value: DateFormShape[K]) => void;
	updateTicket: (id: string, details: DataAction['ticket']) => void;
}

export type FormStateReducer = Reducer<FormState, DataAction>;

export type StateInitializer = (arg: FormState) => ReducerState<FormStateReducer>;

export type SaveRecurrenceCallback = (formState: FormState) => Promise<Recurrence>;
