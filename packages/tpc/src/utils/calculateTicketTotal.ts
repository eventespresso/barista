import { reduce } from 'ramda';

import { getBasePrice, getPriceModifiers } from '@eventespresso/predicates';
import { parsedAmount, groupByProp } from '@eventespresso/utils';

import { DataState } from '../data';
import applyParallelModifiers from './applyParallelModifiers';

const calculateTicketTotal = (prices: DataState['prices']): number => {
	// if there is no wealth or a king, you know what happens
	if (!prices?.length || !getBasePrice(prices)) {
		return 0;
	}

	// lets honour the king of prices
	const basePrice = getBasePrice(prices);
	const basePriceAmount = parsedAmount(basePrice.amount);

	// if the king has no value, it's not good for the "story"
	if (!basePriceAmount) {
		return 0;
	}

	// if the battle lasts this far, pawns also matter
	const priceModifiers = getPriceModifiers(prices);

	// lets divide them into teams based on ther `order`
	// Since the keys are numberic, it should be sorted by default
	const orderToPriceMap = groupByProp('order', priceModifiers);

	// final nail in the coffin
	const newTicketTotal = reduce(
		(currentTotal, pricesWithSameOrder) => {
			return applyParallelModifiers(currentTotal, pricesWithSameOrder);
		},
		basePriceAmount,
		Object.values(orderToPriceMap)
	);

	return newTicketTotal;
};

export default calculateTicketTotal;
