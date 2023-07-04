import { allPass, anyPass, complement, filter, find, includes, isNil, isEmpty, ObjPred, propEq } from 'ramda';

import { PRICE_FIELDS, PRICE_INPUT_FIELDS } from '../priceFields';
import { isDefault } from '../../common';

import type { Price } from '@eventespresso/edtr-services';
import type { BoolField, EntityFieldPred } from '@eventespresso/utils';

// is a base price ?
export const isBasePrice: EntityFieldPred<'isBasePrice', boolean> = propEq('isBasePrice', true);
export const isNotBasePrice: EntityFieldPred<'isBasePrice', boolean> = propEq('isBasePrice', false);

// is shared ?
export const isShared: EntityFieldPred<'isShared', boolean> = propEq('isShared', true);
export const isNotShared: EntityFieldPred<'isShared', boolean> = propEq('isShared', false);

// is a discount ?
export const isDiscount: EntityFieldPred<'isDiscount', boolean> = propEq('isDiscount', true);
export const isNotDiscount: EntityFieldPred<'isDiscount', boolean> = propEq('isDiscount', false);

// is a percent based modifier ?
export const isPercent: EntityFieldPred<'isPercent', boolean> = propEq('isPercent', true);
export const isNotPercent: EntityFieldPred<'isPercent', boolean> = propEq('isPercent', false);

// is a tax ?
export const isTax: EntityFieldPred<'isTax', boolean> = propEq('isTax', true);
export const isNotTax: EntityFieldPred<'isTax', boolean> = propEq('isTax', false);

export const isSharedOrDefault = anyPass<Record<'isShared' | 'isDefault', boolean>>([isShared, isDefault]);
export const isNotSharedOrDefault: EntityFieldPred<'isShared' | 'isDefault', boolean> = complement(isSharedOrDefault);

// returns `true` if supplied object is of type `Price`
export const isPrice = (object: Price): object is Price => {
	return object && 'amount' in object && 'isBasePrice' in object;
};

// the following return `true` if price satisfies predicate
export const isPriceField: ObjPred = (value, field) => includes(field, PRICE_FIELDS);

// the following return `true` if price satisfies predicate
export const isPriceInputField: ObjPred = (value, field) => includes(field, PRICE_INPUT_FIELDS);

// is a default tax ?
export const isDefaultTax: EntityFieldPred<'isDefault' | 'isTax', boolean> = allPass([isDefault, isTax]);

// returns price if found in array of prices
export const getBasePrice = <P extends BoolField<'isBasePrice'>>(prices: Array<P>): P => find<P>(isBasePrice)(prices);

// returns array of prices that satisfy predicate
export const getTaxes = <P extends BoolField<'isTax'>>(prices: Array<P>): Array<P> => filter<P>(isTax, prices);

// returns array of price modifiers
export const getPriceModifiers = <P extends BoolField<'isBasePrice'>>(prices: Array<P>): Array<P> =>
	filter<P>(isNotBasePrice, prices);

// returns array of non tax price modifiers
export const getNonTaxModifiers = <P extends BoolField<'isTax'>>(prices: Array<P>): Array<P> =>
	filter<P>(isNotTax, prices);

// returns array of default taxes
export const getDefaultTaxes = <P extends BoolField<'isDefault' | 'isTax'>>(prices: Array<P>): Array<P> =>
	filter<P>(isDefaultTax, prices);

// returns array of default prices
export const getDefaultPrices = <P extends BoolField<'isDefault'>>(prices: Array<P>): Array<P> =>
	filter<P>(isDefault, prices);

// returns true if any price in array does not have a set amount
export const hasEmptyPrices = <P extends Record<'amount', number>>(prices: Array<P>): boolean => {
	return prices.length && prices.some(({ amount }) => anyPass([isNil, isEmpty])(amount));
};

// returns true if array of prices contains at least one price
export const hasPrices = (prices: Price[]) => {
	return !isEmpty(filter(isPrice, prices));
};

// returns true if array of prices contains at least one non base price
export const priceHasPriceModifiers = (prices: Price[]) => {
	const modifiers = getPriceModifiers(prices);
	return !isEmpty(modifiers);
};
