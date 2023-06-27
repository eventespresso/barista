import { compose } from 'ramda';

import { ticketTotalTestCases } from './ticketTotalData';
import { basePriceTestCases } from './basePriceData';
import { calculateTicketTotal } from '../';
import { convertToModifier, createPrices, basePrice, defaultModifer, setOrder, createId } from './utils';

describe('calculateTicketTotal', () => {
	// lets reverse calculate ticket total from the base price test data
	basePriceTestCases.forEach(({ basePrice: basePriceAmount, name, prices, total }) => {
		const testPrices = createPrices(prices.map(convertToModifier));

		// to calculate the ticket total, we must have a base price
		const basePriceToUse = compose(
			// set the amount from the test data
			basePrice(basePriceAmount),
			// order has to be one
			setOrder(1),
			// of course, an id
			createId
		)(defaultModifer);

		const calculatedTotal = calculateTicketTotal([basePriceToUse, ...testPrices]);

		it('reverse calculates: ' + name, () => {
			expect(calculatedTotal).toBe(total);
		});
	});

	// now lets run the actual ticket total tests
	ticketTotalTestCases.forEach(({ name, prices, total }) => {
		it(name, () => {
			const testPrices = createPrices(prices.map(convertToModifier));
			const calculatedTotal = calculateTicketTotal(testPrices);
			expect(calculatedTotal).toBe(total);
		});
	});
});
