import {
	addAction,
	addFilter,
	applyFilters,
	doAction,
	doingAction,
	doingFilter,
	removeAction,
	removeFilter,
} from '@wordpress/hooks';

export { addAction, addFilter, applyFilters, doAction, doingAction, doingFilter, removeAction, removeFilter };

export type ActionObject = {
	// action/filter name => array of arguments
	[name: string]: Array<any>;
};

type FilterCallback<T extends Array<any>> = (firstArg?: T[0], ...args: [...OmitFirstFromArray<T>]) => T[0];
type ActionCallback<T extends Array<any>> = (...args: [...T]) => void;

export type Hooks<Actions extends ActionObject, Filters extends ActionObject> = {
	addFilter: <K extends keyof Filters>(
		name: K,
		namespace: string,
		callback: FilterCallback<Filters[K]>,
		priority?: number
	) => void;
	addAction: <K extends keyof Actions>(
		name: K,
		namespace: string,
		callback: ActionCallback<Actions[K]>,
		priority?: number
	) => void;
	doingAction: <K extends keyof Actions>(name: K) => boolean;
	doingFilter: <K extends keyof Actions>(name: K) => boolean;
	removeAction: <K extends keyof Actions>(name: K, namespace: string) => number;
	removeFilter: <K extends keyof Filters>(name: K, namespace: string) => number;
	applyFilters: <K extends keyof Filters>(
		name: K,
		firstArg: Filters[K][0],
		...args: [...OmitFirstFromArray<Filters[K]>]
	) => Filters[K][0];
	doAction: <K extends keyof Actions>(
		name: K,
		firstArg?: Actions[K][0],
		...args: [...OmitFirstFromArray<Actions[K]>]
	) => void;
};

export const getHooks = <A extends ActionObject, F extends ActionObject>(): Hooks<A, F> => {
	return {
		addAction,
		addFilter,
		applyFilters,
		doAction,
		doingAction,
		doingFilter,
		removeAction,
		removeFilter,
	} as Hooks<A, F>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
type OmitFirstFromArray<T extends any[]> = T extends [infer A, ...infer R] ? R : never;
