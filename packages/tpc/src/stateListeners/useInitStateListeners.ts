import { useCallback } from 'react';

import { useMoneyDisplay } from '@eventespresso/services';
import { getBasePrice } from '@eventespresso/predicates';

import { useDataState } from '../data';
import { calculateBasePrice, calculateTicketTotal } from '../utils';
import usePriceChangeListener from './usePriceChangeListener';
import usePriceTypeChangeListener from './usePriceTypeChangeListener';
import useTicketTotalChangeListener from './useTicketTotalChangeListener';

const useStateListeners = (): void => {
	const { reverseCalculate, updateTicketPrice, updatePrice, ticket, prices } = useDataState();
	const { formatAmount } = useMoneyDisplay();

	const updateBasePrice = useCallback(() => {
		const basePrice = getBasePrice(prices);

		const newBasePriceAmount = calculateBasePrice(ticket.price, prices);

		// avoid unnecessary update
		if (basePrice?.amount !== newBasePriceAmount) {
			updatePrice({ id: basePrice?.id, fieldValues: { amount: newBasePriceAmount } });
		}
	}, [prices, ticket.price, updatePrice]);

	const updateTicketTotal = useCallback(() => {
		let ticketTotal = calculateTicketTotal(prices);
		ticketTotal = parseFloat(formatAmount(ticketTotal));
		ticketTotal = isNaN(ticketTotal) ? 0 : ticketTotal;
		// avoid unnecessary update
		if (ticket.price !== ticketTotal) {
			updateTicketPrice(ticketTotal);
		}
	}, [formatAmount, prices, ticket.price, updateTicketPrice]);

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
