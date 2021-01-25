import type { Reducer, ReducerState } from 'react';

import type { AnyObject } from '@eventespresso/utils';
import type { Entity, EntityId } from '@eventespresso/data';
import type { SalesDates } from '@eventespresso/ee-components';
import type { TicketSalesFields, TPCPriceModifier, UpdateTicketInput } from '@eventespresso/edtr-services';

import type { DateFormShape } from '../ui/datetimeDetails/types';
import type { Recurrence } from '../services/apollo';

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
}

export type DataActionType =
	| 'SET_R_RULE'
	| 'SET_EX_RULE'
	| 'ADD_R_DATE'
	| 'ADD_EX_DATE'
	| 'REMOVE_R_DATE'
	| 'REMOVE_EX_DATE'
	| 'SET_DATE_DETAILS'
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

export interface RemTicketFields extends Partial<TicketSalesFields>, Partial<SalesDates> {
	ticketSalesDates?: SalesDates;
	ticketSalesStart?: TicketSalesFields;
	ticketSalesEnd?: TicketSalesFields;
	isShared?: boolean;
}

export interface RemTicket extends Entity, RemTicketFields, Omit<UpdateTicketInput, 'prices' | 'id'> {
	prices?: Array<TPCPriceModifier>;
	isShared: boolean;
}

export type SaveRecurrenceCallback = (formState: FormState) => Promise<Recurrence>;

export type StateInitializer = (arg: FormState) => ReducerState<FormStateReducer>;
