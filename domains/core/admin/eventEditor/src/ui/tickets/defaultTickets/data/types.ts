import type { Reducer, ReducerState } from 'react';

import type { Entity, EntityId } from '@eventespresso/data';
import type { TpcPriceModifier } from '@eventespresso/tpc';
import type { Ticket, UpdateTicketInput } from '@eventespresso/edtr-services';

// LATER: consolidate data types
export interface DefaultTicket extends Entity, Omit<UpdateTicketInput, 'prices' | 'id'>, Pick<Ticket, 'userId'> {
	deletedPrices?: Array<EntityId>;
	prices?: Array<TpcPriceModifier>;
	isNew?: boolean;
	isModified?: boolean;
}

export interface DataState {
	deletedTickets: Array<EntityId>;
	isDirty: boolean;
	tickets: Record<string, DefaultTicket>;
}

export type DataActionType = 'ADD_TICKET' | 'ADD_TICKET_TO_DELETED' | 'UPDATE_TICKET' | 'DELETE_TICKET' | 'RESET';

export interface DataAction extends Partial<DataState> {
	id?: EntityId;
	ticket?: Partial<DefaultTicket>;
	type: DataActionType;
}

export type DataStateManagerHook = () => DataStateManager;

export interface DataStateManager extends DataState {
	addTicket: (ticket: DataAction['ticket']) => void;
	deleteTicket: (id: string, isNew?: boolean) => void;
	getData: () => DataState;
	reset: () => void;
	updateTicket: (id: string, details: DataAction['ticket']) => void;
}

export type DataStateReducer = Reducer<DataState, DataAction>;

export type StateInitializer = (arg: DataState) => ReducerState<DataStateReducer>;
