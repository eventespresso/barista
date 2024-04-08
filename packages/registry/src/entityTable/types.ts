import type { TableRow } from '@eventespresso/ui-components';
import type { EntityId } from '@eventespresso/constants';
import type { EntityListFilterStateManager } from '@eventespresso/services';
import type { SubscribeFn, SubscriptionCallback, Subscriptions } from '../subscription';

export type EntityTableFiltersType = 'entityTableFilter';

type ELFSM = EntityListFilterStateManager<any>;

export interface EntityTableFiltersSubscriptionsBaseOptions<L extends string> {
	listId?: L; // to limit the subscription only to specific listId
}

export interface EntityTableFiltersCbArgs<FS extends ELFSM> {
	row: TableRow;
	filterState: FS;
	type: 'body' | 'footer' | 'header';
	entityId: EntityId;
}

type EntityTableFiltersSubList<L extends string, FS extends ELFSM> = Subscriptions<
	EntityTableFiltersCbArgs<FS>,
	EntityTableFiltersFnOptions<L>,
	TableRow
>;

export interface EntityTableFiltersInterface<L extends string, FS extends ELFSM> extends EntityTableFiltersFns<L, FS> {
	getFilters: (listId?: L) => EntityTableFiltersSubList<L, FS>;
}

export interface EntityTableFiltersFns<L extends string, FS extends ELFSM> {
	registerFilter: EntityTableFiltersRegistryFn<L, FS>;
}

interface EntityTableFiltersFnOptions<L extends string> extends EntityTableFiltersSubscriptionsBaseOptions<L> {
	type: string;
}

export type EntityTableFiltersRegistryFn<L extends string, FS extends ELFSM> = (
	callback: SubscriptionCallback<EntityTableFiltersCbArgs<FS>>,
	priority?: number,
	listId?: L
) => ReturnType<SubscribeFn>;
