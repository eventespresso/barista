import { TestCase, basePrice, fixedDiscount, fixedSurcharge, percentDiscount, percentSurcharge, tax } from './utils';

/**
 * `order` prop of the prices will be set based on their index in the array
 * starting with base price with order 1
 * If two or more prices should have the same order, place them in an array
 */
export const ticketTotalTestCases: Array<TestCase> = [
	{
		name: 'calculate total when there are no modifiers',
		prices: [basePrice(15.2)],
		total: 15.2,
	},
	{
		name: 'calculates total when base price amount is 0 (zero)',
		prices: [basePrice(0), fixedSurcharge(5), tax(8), tax(12)],
		total: 6.048,
	},
	{
		name: 'calculates total when base price amount is undefined',
		prices: [basePrice(undefined), fixedSurcharge(5), tax(8), tax(12)],
		total: 6.048,
	},
	{
		name: 'calculates total when base price amount is null',
		prices: [basePrice(null), fixedSurcharge(5), tax(8), tax(12)],
		total: 6.048,
	},
	{
		name: 'calculates the total when taxes have same order',
		// taxes have same order               see ▼               ▼
		prices: [basePrice(10), fixedSurcharge(5), [tax(8), tax(12)]],
		total: 18,
	},
	{
		name: 'calculates the total for all prices with different order',
		prices: [basePrice(10), fixedSurcharge(5), tax(8), tax(12)],
		total: 18.144,
	},
	{
		name: 'calculates the total for all modifiers with same order',
		// all the modifiers applied on base price
		prices: [basePrice(10), [fixedSurcharge(5), tax(8), tax(12)]],
		total: 17,
	},
	{
		name: 'returns the base price amount added to surcharge when there are no taxes',
		prices: [basePrice(10), fixedSurcharge(5)],
		total: 15,
	},
	{
		name: 'calculates the total when a surcharge is added after taxes',
		// here surcharge is not taxable
		prices: [basePrice(10), [tax(8), tax(12)], fixedSurcharge(5)],
		total: 17,
	},
	{
		name: 'returns base price amount minus discount when there are no taxes',
		prices: [basePrice(10), fixedDiscount(5)],
		total: 5,
	},
	{
		name: 'calculates the total when a fixed discount is added before taxes',
		prices: [basePrice(10), fixedDiscount(5), [tax(8), tax(12)]],
		total: 6,
	},
	{
		name: 'calculates the total when a fixed discount is added after taxes',
		prices: [basePrice(10), [tax(8), tax(12)], fixedDiscount(5)],
		total: 7,
	},
	{
		name: 'calculates the total when a percent discount is added before taxes',
		prices: [basePrice(10), percentDiscount(5), [tax(8), tax(12)]],
		total: 11.4,
	},
	{
		name: 'calculates the total when a percent discount is added after taxes',
		prices: [basePrice(10), [tax(8), tax(12)], percentDiscount(5)],
		total: 11.4,
	},
	{
		name: 'percent discount and percent surcharge SHOULD NOT cancel each other when in different order',
		prices: [basePrice(10), percentSurcharge(5), percentDiscount(5)],
		total: 9.975,
	},
	{
		name: 'percent discount and percent surcharge SHOULD cancel each other when in same order',
		prices: [basePrice(10), [percentSurcharge(5), percentDiscount(5)]],
		total: 10,
	},
	{
		name: 'fixed discount and fixed surcharge SHOULD cancel each other when in different order',
		prices: [basePrice(10), fixedSurcharge(5), fixedDiscount(5)],
		total: 10,
	},
	{
		name: 'fixed discount and fixed surcharge SHOULD cancel each other when in same order',
		prices: [basePrice(10), [fixedSurcharge(5), fixedDiscount(5)]],
		total: 10,
	},
	{
		name: 'when tax is 0, it makes no difference',
		prices: [basePrice(10), tax(0)],
		total: 10,
	},
	{
		name: 'when fixed surcharge is 0, it makes no difference',
		prices: [basePrice(10), fixedSurcharge(0)],
		total: 10,
	},
	{
		name: 'when fixed discount is 0, it makes no difference',
		prices: [basePrice(10), fixedDiscount(0)],
		total: 10,
	},
	{
		name: 'when percent discount is 0, it makes no difference',
		prices: [basePrice(10), percentDiscount(0)],
		total: 10,
	},
	{
		name: 'when percent surcharge is 0, it makes no difference',
		prices: [basePrice(10), percentSurcharge(0)],
		total: 10,
	},
	{
		name: 'when a modifier has no amount, it makes no difference',
		//                        no amount set ▼
		prices: [basePrice(10), percentSurcharge(), tax(5)],
		total: 10.5,
	},
];
