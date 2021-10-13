import { useCallback } from 'react';

import { usePrices } from '@eventespresso/edtr-services';
import { getDefaultTaxes, sortByPriceOrderIdAsc, getGuids } from '@eventespresso/predicates';

import usePricesPollInterval from './usePricesPollInterval';
import { useDataState } from '../data';
import usePriceToTpcModifier from './usePriceToTpcModifier';
import { enforceBasePriceOrder } from '../utils';

const useAddDefaultTaxes = (): VoidFunction => {
	const allPrices = usePrices();
	const defaultTaxPrices = getDefaultTaxes(allPrices);

	const { prices, setPrices } = useDataState();
	const [, setPricesPollInterval] = usePricesPollInterval();

	const convertPriceToTpcModifier = usePriceToTpcModifier();

	return useCallback(() => {
		// disable polling.
		setPricesPollInterval(0);

		const priceIds = getGuids(prices);

		// Filter out the taxes that have already been added
		const newTpcDefaultTaxPrices = defaultTaxPrices.filter((price) => !priceIds.includes(price.id));
		const newTpcDefaultTaxPriceModifiers = newTpcDefaultTaxPrices.map(convertPriceToTpcModifier);

		const newPrices = [...prices, ...newTpcDefaultTaxPriceModifiers];

		//sort'em
		const sortedPrices = enforceBasePriceOrder(sortByPriceOrderIdAsc(newPrices));

		setPrices(sortedPrices);
	}, [convertPriceToTpcModifier, defaultTaxPrices, prices, setPrices, setPricesPollInterval]);
};

export default useAddDefaultTaxes;
