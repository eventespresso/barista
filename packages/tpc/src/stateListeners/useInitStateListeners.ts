import { useCallback } from 'react';

import { parsedAmount, isEqualJson } from '@eventespresso/utils';
import { useMoneyDisplay } from '@eventespresso/services';
import { useDataState } from '../data';
import { calculateBasePrice, calculateTicketTotal } from '../utils';
import usePriceChangeListener from './usePriceChangeListener';
import usePriceTypeChangeListener from './usePriceTypeChangeListener';
import useTicketTotalChangeListener from './useTicketTotalChangeListener';

const useStateListeners = (): void => {
	const { getData, reverseCalculate, setPrices, updateTicketPrice, ticket, prices } = useDataState();
	const { formatAmount } = useMoneyDisplay();

	const updateBasePrice = useCallback(() => {
		const newPrices = calculateBasePrice(getData());
		// avoid unnecessary update
		if (!isEqualJson(prices, newPrices)) {
			setPrices(newPrices);
		}
	}, [getData, prices, setPrices]);

	const updateTicketTotal = useCallback(() => {
		let ticketTotal = calculateTicketTotal(getData());
		ticketTotal = parsedAmount(formatAmount(ticketTotal));
		ticketTotal = isNaN(ticketTotal) ? 0 : ticketTotal;
		// avoid unnecessary update
		if (ticket.price !== ticketTotal) {
			updateTicketPrice(ticketTotal);
		}
	}, [formatAmount, getData, ticket.price, updateTicketPrice]);

	const calculatePrice = useCallback(() => {
		if (reverseCalculate) {
			updateBasePrice();
		} else {
			updateTicketTotal();
		}
	}, [reverseCalculate, updateBasePrice, updateTicketTotal]);

	// Subscribe to price related changes.
	usePriceChangeListener(calculatePrice);
	// Subscribe to price priceType changes
	usePriceTypeChangeListener();
	// Subscribe to ticket price changes
	useTicketTotalChangeListener(calculatePrice);
};

export default useStateListeners;
