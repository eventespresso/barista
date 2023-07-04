import { allPass, isEmpty, find } from 'ramda';

import { getPriceModifiers, isNotBasePrice, isNotDiscount, isNotPercent } from '../../prices';

import type { PriceType } from '@eventespresso/edtr-services';

// returns `true` if supplied object is of type `PriceType`
export const isPriceType = (object: PriceType): object is PriceType => {
	return object && 'baseType' in object;
};

// returns true if supplied price type is a flat fee (dollar) surcharge
export const isFlatFeeSurcharge = allPass([isNotBasePrice, isNotDiscount, isNotPercent]);

export const getDefaultPriceModifierType = (priceTypes: PriceType[]): PriceType | null => {
	const priceType = find<PriceType>(isFlatFeeSurcharge)(priceTypes);
	return priceType ? priceType : null;
};

export const priceTypeHasPriceModifiers = (PriceTypes: PriceType[]) => {
	const modifiers = getPriceModifiers(PriceTypes);
	return !isEmpty(modifiers);
};
