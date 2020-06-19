import { useCallback } from 'react';

import { usePrices } from '@eventespresso/edtr-services';
import { useDataState } from '../data';
import { getDefaultTaxes, sortByPriceOrderIdAsc, getGuids } from '@eventespresso/predicates';
import usePriceToTpcModifier from './usePriceToTpcModifier';

const useAddDefaultTaxes = (): VoidFunction => {
	const allPrices = usePrices();
	const defaultTaxPrices = getDefaultTaxes(allPrices);

	const { prices, setPrices } = useDataState();

	const convertPriceToTpcModifier = usePriceToTpcModifier();

	return useCallback(() => {
		const priceIds = getGuids(prices);

		// Filter out the taxes that have already been added
		const newTpcDefaultTaxPrices = defaultTaxPrices.filter((price) => !priceIds.includes(price.id));
		const newTpcDefaultTaxPriceModifiers = newTpcDefaultTaxPrices.map(convertPriceToTpcModifier);

		const newPrices = [...prices, ...newTpcDefaultTaxPriceModifiers];

		//sort'em
		const sortedPrices = sortByPriceOrderIdAsc(newPrices);

		setPrices(sortedPrices);
	}, [convertPriceToTpcModifier, defaultTaxPrices, prices, setPrices]);
};

export default useAddDefaultTaxes;
