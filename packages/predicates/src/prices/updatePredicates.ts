import { assoc, map, pickBy, when } from 'ramda';

import type { Price } from '@eventespresso/edtr-services';
import { sanitizeAmount } from '@eventespresso/utils';
import { isPriceField } from './selectionPredicates';
import { entityHasGuid } from '../common';

type updatePriceArrayProps<T extends Price> = {
	amount: number;
	guid?: string;
	prices?: T[];
	type?: string;
};

/**
 * returns object with properties that match those of a Price entity
 *
 * @param {Price} price
 */
export const copyPriceFields = <T>(price: T, predicate = isPriceField): T => pickBy(predicate, price);

/**
 * updates the price amount
 *
 * @param {number} amount
 */
export const updatePriceAmount =
	<T extends Price>(amount: number) =>
	(price: T): T =>
		assoc<number, T, string>('amount', parseFloat(sanitizeAmount(amount || 0)), price);

/**
 * updates the price type
 *
 * @param {string} type
 */
export const updatePriceType =
	<T extends Price>(type: string) =>
	(price: T): T =>
		assoc<string, T, string>('priceType', type, price);

/**
 * given an array of prices, finds and updates price type for price matching the supplied GUID
 *
 * @param {price[]} prices
 * @param {string} guid
 * @param {string} type
 */
export const updatePriceTypeForPrice = <T extends Price>({ prices, guid, type }: updatePriceArrayProps<T>): T[] =>
	map(when(entityHasGuid(guid), updatePriceType(type)), prices);

/**
 * given an array of prices, finds and updates price amount for price matching the supplied GUID
 *
 * @param {price[]} prices
 * @param {string} guid
 * @param {string} amount
 */
export const updatePriceAmountForPrice = <T extends Price>({ prices, guid, amount }: updatePriceArrayProps<T>): T[] =>
	map(when(entityHasGuid(guid), updatePriceAmount(amount)), prices);
