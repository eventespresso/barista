import type React from 'react';
import type { BaseSubscriptionOptions, Subscriptions, ElementProps } from '../subscription';
import type ModalRegistry from './ModalRegistry';

// LATER: extract specific type constraint for for 'T' (modalType)
export interface ModalSubscriptionsOptions<T extends string> {
	modalType?: T; // to limit the subscription only to specific modalType
}

export interface ModalSubscriptionCbArgs<T extends string, EP extends ElementProps = ElementProps>
	extends ModalSubscriptionsOptions<T> {
	registry: ModalRegistry<string, T, EP>;
}

export interface ModalSubscriptionInterface {
	subscribe: ModalSubscribeFn;
	getSubscriptions: <T extends string>(
		options?: ModalSubscriptionsOptions<T>
	) => Subscriptions<ModalSubscriptionCbArgs<T>, ModalSubscriptionsOptions<T>>;
}

export type ModalSubscribeFn = <T extends string>(
	cb: ModalSubscriptionCb<T>,
	options?: ModalSubscriptionsOptions<T>
) => VoidFunction;

export type ModalSubscriptionCb<T extends string, EP extends ElementProps = ElementProps> = (
	args: ModalSubscriptionCbArgs<T, EP>
) => void;

/* UI related types */
export interface ModalArgs<D extends string, MT extends string> extends BaseSubscriptionOptions<D> {
	modalType?: MT;
	path?: Array<string>;
}

export interface ModalProps {
	className?: string;
	optionItems: Array<React.ReactNode>;
}
