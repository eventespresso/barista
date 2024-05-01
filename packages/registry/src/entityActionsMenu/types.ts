import type React from 'react';
import type { Entity } from '@eventespresso/data';
import type { BaseSubscriptionOptions, Subscriptions, ElementProps, UIRegistryInterface } from '../subscription';

// LATER: use more appropriate types (more narrow) instead of generic ones
export interface EntityActionsSubscriptionsOptions<T extends string> {
	entityType?: T; // to limit the subscription only to specific entityType
}

export interface EntityActionsSubscriptionCbArgs<E extends Entity, T extends string, EP extends ElementProps>
	extends EntityActionsSubscriptionsOptions<T> {
	entity: E;
	registry: EntityActionsMenuRegistry<EP>;
}

export interface EntityActionsSubscriptionInterface {
	subscribe: EntityActionsSubscribeFn;
	getSubscriptions: <E extends Entity, T extends string, EP extends ElementProps>(
		options?: EntityActionsSubscriptionsOptions<T>
	) => Subscriptions<EntityActionsSubscriptionCbArgs<E, T, EP>, EntityActionsSubscriptionsOptions<T>>;
}

export type EntityActionsSubscribeFn = <E extends Entity, T extends string, EP extends ElementProps>(
	cb: EntityActionsSubscriptionCb<E, T, EP>,
	options?: EntityActionsSubscriptionsOptions<T>
) => VoidFunction;

export type EntityActionsSubscriptionCb<E extends Entity, T extends string, EP extends ElementProps = ElementProps> = (
	args: EntityActionsSubscriptionCbArgs<E, T, EP>
) => void;

/* UI related types */
export interface EntityActionsMenuOptions<D extends string, ET extends string> extends BaseSubscriptionOptions<D> {
	entityType: ET;
	entityId: string;
}

export type EntityActionsMenuRegistryHook = <D extends string, ET extends string, EP extends ElementProps>(
	options: EntityActionsMenuOptions<D, ET>
) => EntityActionsMenuRegistry<EP>;

export type EntityActionsMenuRegistry<EP extends ElementProps> = UIRegistryInterface<EP>;

export interface ActionsMenuComponentProps<E extends Entity> {
	entity: E;
	[key: string]: any;
}

export type EntityMenuItems = {
	[key: string]: React.ComponentType;
};
