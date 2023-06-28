import { parsedAmount } from '../';

const testCases = [
	{
		desc: 'checks for parsed amount to be a number',
		amount: 5,
		result: 5,
	},
	{
		desc: 'returns a numeric float for a numeric float',
		amount: 8.256,
		result: 8.256,
	},
	{
		desc: 'returns a numeric float for a string float',
		amount: '8.256',
		result: 8.256,
	},
	{
		desc: 'returns 0 for a non-numeric string',
		amount: 'carrot',
		result: 0,
	},
	{
		desc: 'returns 0 for an empty string',
		amount: '',
		result: 0,
	},
	{
		desc: 'returns 0 when amount is null',
		amount: null,
		result: 0,
	},
	{
		desc: 'returns 0 when amount is undefined',
		amount: undefined,
		result: 0,
	},
];

describe('formatAmount', () => {
	for (const testCase of testCases) {
		it(testCase.desc, () => {
			const result = parsedAmount(testCase.amount);
			expect(testCase.result).toBe(result);
		});
	}
});
