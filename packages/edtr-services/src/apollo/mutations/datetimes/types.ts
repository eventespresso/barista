import type { EntityId } from '@eventespresso/data';
import type { Datetime } from '../../types';
import { BulkUpdateInput } from '../types';

import type { MutationFunction } from '@eventespresso/data';

export interface DatetimeBaseInput {
	capacity?: number;
	description?: string;
	endDate?: string | Date;
	event?: EntityId;
	eventId?: number;
	isPrimary?: boolean;
	isTrashed?: boolean;
	name?: string;
	order?: number;
	parent?: string;
	reserved?: number;
	sold?: number;
	startDate?: string | Date;
	tickets?: Array<EntityId>;
	venue?: string;
}

export type CreateDatetimeInput = DatetimeBaseInput;

export interface UpdateDatetimeInput extends DatetimeBaseInput {
	id?: EntityId;
}

export interface DeleteDatetimeInput {
	id?: EntityId;
	deletePermanently?: boolean;
}

export interface DatetimeCommonInput extends DatetimeBaseInput, DeleteDatetimeInput {}

export type DatetimeMutationResult = {
	espressoDatetime: Datetime;
};

export type CreateDatetimeResult = {
	createEspressoDatetime: DatetimeMutationResult;
};

export type UpdateDatetimeResult = {
	updateEspressoDatetime: DatetimeMutationResult;
};

export type DeleteDatetimeResult = {
	deleteEspressoDatetime: DatetimeMutationResult;
};

export type BulkUpdateDatetimeInput = BulkUpdateInput<UpdateDatetimeInput>;

export interface DatetimeMutator {
	createEntity: MutationFunction<CreateDatetimeResult, CreateDatetimeInput>;
	updateEntity: MutationFunction<UpdateDatetimeResult, UpdateDatetimeInput>;
	deleteEntity: MutationFunction<DeleteDatetimeResult, DeleteDatetimeInput>;
}
