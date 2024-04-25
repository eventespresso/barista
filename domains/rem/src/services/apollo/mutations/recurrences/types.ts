import type { EntityId } from '@eventespresso/data';
import type { Recurrence } from '../../types';

// LATER: what do these prefixes mean?
export interface RecurrenceBaseInput {
	datetimes?: Array<EntityId>;
	dateDuration?: string;
	exDates?: string;
	exRule?: string;
	gDates?: string;
	name?: string;
	rDates?: string;
	rRule?: string;
}

export type CreateRecurrenceInput = RecurrenceBaseInput;

export interface UpdateRecurrenceInput extends RecurrenceBaseInput {
	id?: EntityId;
}

export interface DeleteRecurrenceInput {
	id?: EntityId;
}

export interface RecurrenceCommonInput extends RecurrenceBaseInput, DeleteRecurrenceInput {}

export type RecurrenceMutationResult = {
	espressoRecurrence: Recurrence;
};

export type CreateRecurrenceResult = {
	createEspressoRecurrence: RecurrenceMutationResult;
};

export type UpdateRecurrenceResult = {
	updateEspressoRecurrence: RecurrenceMutationResult;
};

export type DeleteRecurrenceResult = {
	deleteEspressoRecurrence: RecurrenceMutationResult;
};
