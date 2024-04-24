import type React from 'react';
import type { Entity } from '@eventespresso/data';
import type { BaseSubscriptionOptions, Subscriptions, ElementProps, UIRegistryInterface } from '../subscription';
import { EntityId } from '@eventespresso/constants';

export interface EntityCardDetailsSubscriptionsOptions<T extends string> {
	entityType?: T; // to limit the subscription only to specific entityType
}

export interface EntityCardDetailsSubscriptionCbArgs<T extends string, EP extends ElementProps>
	extends EntityCardDetailsSubscriptionsOptions<T> {
	entityId: EntityId;
	registry: EntityCardDetailsRegistry<EP>;
}

export interface EntityCardDetailsSubscriptionInterface {
	subscribe: EntityCardDetailsSubscribeFn;
	getSubscriptions: <T extends string, EP extends ElementProps>(
		options?: EntityCardDetailsSubscriptionsOptions<T>
	) => Subscriptions<EntityCardDetailsSubscriptionCbArgs<T, EP>, EntityCardDetailsSubscriptionsOptions<T>>;
}

export type EntityCardDetailsSubscribeFn = <T extends string, EP extends ElementProps>(
	cb: EntityCardDetailsSubscriptionCb<T, EP>,
	options?: EntityCardDetailsSubscriptionsOptions<T>
) => VoidFunction;

export type EntityCardDetailsSubscriptionCb<T extends string, EP extends ElementProps = ElementProps> = (
	args: EntityCardDetailsSubscriptionCbArgs<T, EP>
) => void;

/* UI related types */
export interface EntityCardDetailsOptions<D extends string, ET extends string> extends BaseSubscriptionOptions<D> {
	entityType: ET;
	entityId: string;
}

export type EntityCardDetailsRegistryHook = <D extends string, ET extends string, EP extends ElementProps>(
	options: EntityCardDetailsOptions<D, ET>
) => EntityCardDetailsRegistry<EP>;

export type EntityCardDetailsRegistry<EP extends ElementProps> = UIRegistryInterface<EP>;

export interface CardDetailsComponentProps<E extends Entity> {
	entity: E;
	[key: string]: any;
}

export type EntityCardDetailsItems = {
	[key: string]: React.ComponentType;
};
