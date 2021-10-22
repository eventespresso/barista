import type { EntityId } from '@eventespresso/data';
import type { Ticket, TicketVisibility } from '../../';
import { BulkUpdateInput } from '../types';

export interface TicketBaseInput {
	datetimes?: Array<EntityId>;
	description?: string;
	endDate?: string | Date;
	isDefault?: boolean;
	isRequired?: boolean;
	isTrashed?: boolean;
	max?: number;
	min?: number;
	name?: string;
	order?: number;
	parent?: string;
	price?: number;
	prices?: Array<EntityId>;
	quantity?: number;
	reserved?: number;
	reverseCalculate?: boolean;
	row?: number;
	sold?: number;
	startDate?: string | Date;
	uses?: number;
	visibility?: TicketVisibility;
	wpUser?: number;
}

export type CreateTicketInput = TicketBaseInput;

export interface UpdateTicketInput extends TicketBaseInput {
	id?: EntityId;
}

export interface DeleteTicketInput {
	id?: EntityId;
	deletePermanently?: boolean;
}

export interface TicketCommonInput extends TicketBaseInput, DeleteTicketInput {}

export type TicketMutationResult = {
	espressoTicket: Ticket;
};

export type CreateTicketResult = {
	createEspressoTicket: TicketMutationResult;
};

export type UpdateTicketResult = {
	updateEspressoTicket: TicketMutationResult;
};

export type DeleteTicketResult = {
	deleteEspressoTicket: TicketMutationResult;
};

export type BulkUpdateTicketInput = BulkUpdateInput<UpdateTicketInput>;
