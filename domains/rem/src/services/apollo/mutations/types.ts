import type { ApolloCache } from '@apollo/client';

import type { Entity as BaseEntity } from '@eventespresso/data';
import type { Recurrence, RecurrenceEdge } from '../types';

export interface MutationCallbackFnArgs {
	cache?: ApolloCache<any>;
}

interface CommonArgs {
	deletePermanently?: boolean;
}

/* Recurrence specific */
export interface RecurrenceMutationCallbackFnArgs extends MutationCallbackFnArgs, CommonArgs {
	recurrence: Recurrence;
	recurrences?: RecurrenceEdge;
	datetimeId?: string;
	datetimeIds?: string[];
}
export type RecurrenceMutationCallbackFn = (args: RecurrenceMutationCallbackFnArgs) => void;

export enum TypeName {
	Recurrence = 'Recurrence',
}

export type OnUpdateFnOptions<Entity = BaseEntity> = {
	cache: ApolloCache<any>;
	entity: Entity;
};

/* Generic cache updater */
export interface CacheUpdaterFnArgs extends MutationCallbackFnArgs {
	action: 'add' | 'update' | 'remove';
	recurrence?: Recurrence;
	recurrences?: RecurrenceEdge;
}

export type CacheUpdaterFn = (args: CacheUpdaterFnArgs) => void;
