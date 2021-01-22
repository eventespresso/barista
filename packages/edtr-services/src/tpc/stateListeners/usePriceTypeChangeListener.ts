import { useEffect, useRef, useState } from 'react';
import { assocPath } from 'ramda';

import type { AnyObject } from '@eventespresso/utils';

import useTPCDataState from '../data/useTPCDataState';
import { useUpdatePriceTypeForPrice } from '../utils';
import type { StateChangeListenerHook } from './types';

const usePriceTypeChangeListener: StateChangeListenerHook = () => {
	const { getData, prices, updatePrice } = useTPCDataState();

	const updatePriceTypeForPrice = useUpdatePriceTypeForPrice();

	/**
	 * To store the previous values of priceTypes for all prices
	 * {
	 *     [price.id]: price.priceType
	 * }
	 */
	const priceTypeMapping = useRef<AnyObject<string>>({});

	const [priceTypesStr, setPriceTypesStr] = useState('');

	useEffect(() => {
		// To avoid triggering the change on every render
		// convert to JSON to only trigger when the value changes
		const newPriceTypesStr = JSON.stringify(prices.map((price) => price.priceType));
		if (newPriceTypesStr === priceTypesStr) {
			return;
		}

		setPriceTypesStr(newPriceTypesStr);

		const newPriceTypeMapping = prices.reduce((acc, price) => {
			return assocPath([price.id], price.priceType, acc);
		}, {});
		// id of the price whose priceType has changed
		let priceTypeChangedForPriceId = '';
		// loop through all the new priceType mappings to
		// get the id of the price whose price type changed
		for (const [priceId, newPriceType] of Object.entries<string>(newPriceTypeMapping)) {
			const prevPriceType = priceTypeMapping?.current?.[priceId] || '';
			if (prevPriceType && prevPriceType !== newPriceType) {
				priceTypeChangedForPriceId = priceId;
				break;
			}
		}
		// Make sure we got the price ID
		if (priceTypeChangedForPriceId) {
			// Update the fields for the price
			const updatedPrice = updatePriceTypeForPrice(priceTypeChangedForPriceId, getData());
			// If we are lucky
			if (updatedPrice) {
				const { id, ...fieldValues } = updatedPrice;
				// Update the price in state
				updatePrice({ id, fieldValues });
			}
		}
		// Make sure to update the mapping
		priceTypeMapping.current = newPriceTypeMapping;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [prices]);
};

export default usePriceTypeChangeListener;
