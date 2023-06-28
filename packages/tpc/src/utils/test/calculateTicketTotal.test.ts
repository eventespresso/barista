import { ticketTotalTestCases } from './ticketTotalData';
import { calculateTicketTotal } from '../';
import { convertToModifier, createPrices } from './utils';

describe('calculateTicketTotal', () => {
	ticketTotalTestCases.forEach(({ name, prices, total }) => {
		it(name, () => {
			const testPrices = createPrices(prices.map(convertToModifier));
			const calculatedTotal = calculateTicketTotal(testPrices);
			expect(calculatedTotal).toBe(total);
		});
	});
});
