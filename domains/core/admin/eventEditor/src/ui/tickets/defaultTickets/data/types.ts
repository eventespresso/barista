import type { Reducer, ReducerState } from 'react';

import type { AnyObject } from '@eventespresso/utils';
import type { Entity } from '@eventespresso/data';
import type { EntityId, Ticket } from '@eventespresso/constants';
import type { TpcPriceModifier } from '@eventespresso/tpc';
import type { UpdateTicketInput } from '@eventespresso/edtr-services';

export interface DefaultTicket extends Entity, Omit<UpdateTicketInput, 'prices' | 'id'>, Pick<Ticket, 'userId'> {
	deletedPrices?: Array<EntityId>;
	prices?: Array<TpcPriceModifier>;
	isNew?: boolean;
	isModified?: boolean;
}

export type StartAndEndDate = {
	startDate: Date;
	endDate: Date;
};

export interface DataState {
	deletedTickets: Array<EntityId>;
	isDirty: boolean;
	tickets: AnyObject<DefaultTicket>;
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
