import { useCallback } from 'react';

import { isBasePrice, sortByPriceOrderIdAsc, isDefaultTax } from '@eventespresso/predicates';
import { Price } from '@eventespresso/edtr-services';
import { uuid } from '@eventespresso/utils';

import { TpcPriceModifier } from '../types';
import usePriceToTpcModifier from './usePriceToTpcModifier';
import useDefaultBasePrice from './useDefaultBasePrice';
import { enforceBasePriceOrder } from '../utils';

type PrepTemplatePrices = (templatePrices: Array<Price>, addBasePrice?: boolean) => Array<TpcPriceModifier>;

/**
 * Custom hook to prepare prices for TPC that we added from a template ticket
 */
const usePrepTemplatePrices = (): PrepTemplatePrices => {
	const basePrice = useDefaultBasePrice();

	const convertPriceToTpcModifier = usePriceToTpcModifier();

	return useCallback(
		(templatePrices, addBasePrice = true) => {
			const prices = templatePrices.map((price, index) => {
				const priceModifier = convertPriceToTpcModifier(price);
				// if it's a default tax
				if (isDefaultTax(price)) {
					// return without cloning
					return priceModifier;
				}
				/**
				 * Lets not rely upon the order that comes form the sever-side data
				 * We need to ensure that base price has order 1.
				 * For Price modifiers, we will retain their order and increment it by 2,
				 * to make sure that there is no modifier of the same order as base price.
				 */
				const order = isBasePrice(price) ? 1 : (price.order || index) + 2;
				return {
					// clone it
					...priceModifier,
					id: uuid(),
					dbId: 0,
					isNew: true,
					// avoid default price getting duplicated
					isDefault: false,
					order,
				};
			});

			//sort'em
			const sortedPrices = enforceBasePriceOrder(sortByPriceOrderIdAsc(prices));

			if (!addBasePrice) {
				// if we're not going to add a base price,
				// then no need to check for one or do anything else
				return sortedPrices;
			}

			const hasBasePrice = sortedPrices.filter(isBasePrice).length;
			if (hasBasePrice) {
				// if we already have a basePrice, then we are all good
				return sortedPrices;
			}
			// need to add a base price...
			// setting the `isNew` flag to true will ensure the base price is created on submit
			// setting `order` as 1 to ensure it remains at the top
			return [{ ...basePrice, order: 1, isNew: true }, ...sortedPrices];
		},
		[basePrice, convertPriceToTpcModifier]
	);
};

export default usePrepTemplatePrices;
