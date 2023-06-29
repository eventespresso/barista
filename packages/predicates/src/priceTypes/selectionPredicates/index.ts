import { allPass, find } from 'ramda';

import { isNotBasePrice, isNotDiscount, isNotPercent } from '../../prices';

import type { PriceType } from '@eventespresso/edtr-services';

// returns `true` if supplied object is of type `PriceType`
export const isPriceType = (object: PriceType): object is PriceType => {
	return object && 'baseType' in object;
};

// returns true if supplied price type is a flat fee (dollar) surcharge
export const isFlatFeeSurcharge = allPass([isNotBasePrice, isNotDiscount, isNotPercent]);

export const getDefaultPriceModifierType = (priceTypes: PriceType[]): PriceType => {
	return find<PriceType>(isFlatFeeSurcharge)(priceTypes);
};
