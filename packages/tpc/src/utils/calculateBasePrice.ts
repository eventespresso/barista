import { reduceRight } from 'ramda';

import { getPriceModifiers } from '@eventespresso/predicates';
import { formatAmount, sanitizeAmount, groupByProp } from '@eventespresso/utils';
import { DataState } from '../data';
import undoPriceModifiers from './undoPriceModifiers';
import { TPC_PRICE_DECIMAL_PLACES } from './constants';

const calculateBasePrice = (ticketTotal: number, prices: DataState['prices']): number => {
	const parsedTicketTotal = parseFloat(sanitizeAmount(ticketTotal));

	if (!parsedTicketTotal) {
		return 0;
	}

	const priceModifiers = getPriceModifiers(prices || []);

	// if there are no modifiers, return ticket total
	if (!prices?.length) {
		return parsedTicketTotal;
	}

	// Since the keys are numeric, it should be sorted in ASC by default
	const orderToPriceMap = groupByProp('order', priceModifiers);

	const newBasePriceAmount = reduceRight(
		(pricesWithSameOrder, currentTotal) => {
			return undoPriceModifiers(currentTotal, pricesWithSameOrder);
		},
		ticketTotal,
		Object.values(orderToPriceMap)
	);

	// Save the price up to 6 decimals places
	return parseFloat(formatAmount(TPC_PRICE_DECIMAL_PLACES)(newBasePriceAmount));
};

export default calculateBasePrice;
