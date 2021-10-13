import * as R from 'ramda';

import type { Price, PriceType } from '@eventespresso/edtr-services';
import type { EntityId } from '@eventespresso/data';
import {
	findEntityByGuid,
	sortByPriceOrderIdAsc,
	getBasePrice,
	getPriceModifiers,
	isBasePrice,
} from '@eventespresso/predicates';

import type { TpcPriceModifier } from '../types';
import type { PriceToTpcModifier } from '../hooks/usePriceToTpcModifier';

// returns GUID for price modifier's related price type
export const getPriceModifierPriceTypeGuid = (price: TpcPriceModifier): EntityId => R.prop('priceType', price);

// returns price type for supplied price modifier if found in array of price types
export const getPriceType =
	(priceTypes: PriceType[]) =>
	(price: TpcPriceModifier): PriceType => {
		return findEntityByGuid(priceTypes)(getPriceModifierPriceTypeGuid(price));
	};

/**
 * returns a copy of price with price type properties applied
 */
export const updatePriceModifier = (price: TpcPriceModifier, priceType?: PriceType): TpcPriceModifier => {
	return {
		...price,
		isBasePrice: priceType?.isBasePrice,
		isDiscount: priceType?.isDiscount,
		isPercent: priceType?.isPercent,
		isTax: priceType?.isTax,
		priceType: priceType?.id,
	};
};

export const preparePricesForTpc = (
	prices: Array<Price>,
	convertPriceToTpcModifier: PriceToTpcModifier
): Array<TpcPriceModifier> => {
	//sort'em
	const sortedPrices = enforceBasePriceOrder(sortByPriceOrderIdAsc(prices));

	// convert to TPC price objects by adding "priceType"
	return sortedPrices.map(convertPriceToTpcModifier);
};

export const enforceBasePriceOrder = <T extends Price>(prices: Array<T>) => {
	const basePrice = getBasePrice(prices);

	// if the list doesn't have a base price
	// or base price is at 0 index
	if (!basePrice || isBasePrice(R.head(prices))) {
		// no need to change anything
		return prices;
	}
	const priceModifiers = getPriceModifiers(prices);

	// place base price at the beginning
	return [basePrice, ...priceModifiers];
};
