import { prop, sortBy, complement, flip, includes, propSatisfies } from 'ramda';

/**
 * Sorts the given list by order prop of the objects
 */
export function sortByOrder<E extends Record<'order', number>>(list: Array<E>): Array<E> {
	return sortBy(prop('order'), list);
}

/**
 * Sets the order prop of the items in the list based on the index.
 * startIndex can be used to avoid order getting set to 0
 */
export function setOrderByIndex<E extends Record<'order', number>>(list: Array<E>, startIndex = 1): Array<E> {
	return list.map((item, index) => {
		return { ...item, order: index + startIndex };
	});
}

/**
 * Predecate that returns true if the section status is not default or shared.
 */
export const isNotSharedOrDefault = propSatisfies(complement(flip(includes)(['shared', 'default'])), 'status');
