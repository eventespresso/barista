import { calculateBasePrice } from '../';
import { basePriceTestCases } from './basePriceData';
import { convertToModifier, createPrices } from './utils';

describe('calculateBasePrice', () => {
	basePriceTestCases.forEach(({ basePrice, name, prices, total }) => {
		it(name, () => {
			const testPrices = createPrices(prices.map(convertToModifier));
			const calculatedPrice = calculateBasePrice(total, testPrices);
			expect(calculatedPrice).toBe(basePrice);
		});
	});
});
