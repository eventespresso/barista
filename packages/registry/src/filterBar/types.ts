import type React from 'react';
import type { Entity } from '@eventespresso/data';
import type { EntityListFilterStateManager } from '@eventespresso/services';
import type {
	BaseSubscriptionOptions,
	ServiceRegistry,
	SubscribeFn,
	SubscriptionCallback,
	Subscriptions,
	UIRegistryInterface,
	ElementProps,
} from '../subscription';

export enum FilterBarServiceType {
	UI = 'entityListFilterBarUI',
	FILTER = 'entityListFilterBarFilter',
}

type ELFSM = EntityListFilterStateManager<any>;

export interface FilterBarSubscriptionsBaseOptions<L extends string> {
	listId?: L; // to limit the subscription only to specific listId
}

export interface FilterBarSubscriptionCbArgs<FS extends ELFSM, L extends string>
	extends FilterBarSubscriptionsBaseOptions<L> {
	registry: FilterBarUIRegistry<FS>;
}

export interface FilterBarUISubscriptionInterface {
	subscribe: FilterBarUISubscribeFn;
	getSubscriptions: <FS extends ELFSM, L extends string>(
		options?: FilterBarSubscriptionsBaseOptions<L>
	) => Subscriptions<FilterBarSubscriptionCbArgs<FS, L>, FilterBarSubscriptionsBaseOptions<L>>;
}

export type FilterBarUISubscribeFn = <FS extends ELFSM, L extends string>(
	cb: FilterBarUISubscriptionCb<FS, L>,
	options?: FilterBarSubscriptionsBaseOptions<L>
) => VoidFunction;

export type FilterBarUISubscriptionCb<FS extends ELFSM, L extends string> = (
	args: FilterBarSubscriptionCbArgs<FS, L>
) => void;

export interface FilterBarUIOptions<D extends string, L extends string> extends BaseSubscriptionOptions<D> {
	listId: L;
}

export interface FilterBarUIComponentProps<FS extends ELFSM> extends ElementProps {
	filterState: FS;
}

export type FilterBarUIRegistry<FS extends ELFSM> = UIRegistryInterface<FilterBarUIComponentProps<FS>>;

export interface FilterBarUIElementsHookOptions<FS extends ELFSM, D extends string, L extends string>
	extends BaseSubscriptionOptions<D>,
		FilterBarSubscriptionsBaseOptions<L>,
		Partial<FilterBarUIComponentProps<FS>> {}

export type FilterBarUIElementsHook = <FS extends ELFSM, D extends string, L extends string>(
	options: FilterBarUIElementsHookOptions<FS, D, L>
) => Array<React.ReactNode>;

/*****************************/

export interface FilterBarServiceCbArgs<E extends Entity, FS extends ELFSM> {
	entityList: Array<E>;
	filterState: FS;
}

type FilterBarServiceSubList<L extends string, E extends Entity, FS extends ELFSM> = Subscriptions<
	FilterBarServiceCbArgs<E, FS>,
	FilterBarServiceFnOptions<L>,
	Array<E>
>;

export interface FilterBarServiceInterface<L extends string, E extends Entity, FS extends ELFSM>
	extends FilterBarServiceFns<L, E, FS> {
	getFilters: (listId?: L) => FilterBarServiceSubList<L, E, FS>;
	getSearches: (listId?: L) => FilterBarServiceSubList<L, E, FS>;
	getSorters: (listId?: L) => FilterBarServiceSubList<L, E, FS>;
}

export interface FilterBarServiceFns<L extends string, E extends Entity, FS extends ELFSM> {
	registerFilter: FilterBarServiceRegistryFn<L, E, FS>;
	registerSorter: FilterBarServiceRegistryFn<L, E, FS>;
	registerSearch: FilterBarServiceRegistryFn<L, E, FS>;
}

export type FilterBarServiceCb<FS extends ELFSM, L extends string> = (args: FilterBarSubscriptionCbArgs<FS, L>) => void;

interface FilterBarServiceFnOptions<L extends string> extends FilterBarSubscriptionsBaseOptions<L> {
	type: string;
}

export type FilterBarServiceFn = <FS extends ELFSM, L extends string>(
	cb: FilterBarUISubscriptionCb<FS, L>,
	options?: FilterBarServiceFnOptions<L>
) => VoidFunction;

export type FilterBarServiceRegistryFn<L extends string, E extends Entity, FS extends ELFSM> = (
	callback: SubscriptionCallback<FilterBarServiceCbArgs<E, FS>>,
	priority?: number,
	listId?: L
) => ReturnType<SubscribeFn>;

export interface FilterBarServiceRegistry extends ServiceRegistry, FilterBarServiceFns<string, null, null> {}
