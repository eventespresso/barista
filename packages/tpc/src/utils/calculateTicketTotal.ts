import { reduce } from 'ramda';

import { getBasePrice, getPriceModifiers } from '@eventespresso/predicates';
import { sanitizeAmount, groupByProp } from '@eventespresso/utils';

import { DataState } from '../data';
import applyPriceModifiers from './applyPriceModifiers';

const calculateTicketTotal = (prices: DataState['prices']): number => {
	// if there is no wealth or a king, you know what happens
	if (!prices?.length || !getBasePrice(prices)) {
		return 0;
	}

	// lets honour the king of prices
	const basePrice = getBasePrice(prices);
	const basePriceAmount = parseFloat(sanitizeAmount(basePrice.amount));

	// if the battle lasts this far, pawns also matter
	const priceModifiers = getPriceModifiers(prices);

	// if there is no army, king has to fight alone
	if (!priceModifiers.length) {
		return basePriceAmount;
	}

	// lets divide them into teams based on ther `order`
	// Since the keys are numeric, it should be sorted by default
	const orderToPriceMap = groupByProp('order', priceModifiers);

	// final nail in the coffin
	const newTicketTotal = reduce(
		(currentTotal, pricesWithSameOrder) => {
			return applyPriceModifiers(currentTotal, pricesWithSameOrder);
		},
		basePriceAmount,
		Object.values(orderToPriceMap)
	);

	return newTicketTotal;
};

export default calculateTicketTotal;
