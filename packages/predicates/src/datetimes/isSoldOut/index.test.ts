import isSoldOut from './index';
import { nodes as datetimes } from '@eventespresso/edtr-services/src/apollo/queries/datetimes/test/data';

const testCases = [
	{
		desc: 'returns the value of isSoldOut flag if it is true',
		sold: null,
		capacity: null,
		soldOut: true,
		result: true,
	},
	{
		desc: 'returns the value of isSoldOut flag if it is false',
		sold: null,
		capacity: null,
		soldOut: false,
		result: false,
	},
	{
		desc: 'returns true when isSoldOut is null AND sold is equal to capacity',
		sold: 10,
		capacity: 10,
		soldOut: null,
		result: true,
	},
	{
		desc: 'returns true when isSoldOut is null AND sold is greater than capacity',
		sold: 10,
		capacity: 5,
		soldOut: null,
		result: true,
	},
	{
		desc: 'returns false when isSoldOut is null BUT capacity is infinite',
		sold: 10,
		capacity: -1,
		soldOut: null,
		result: false,
	},
	{
		desc: 'returns false when isSoldOut is null AND sold is less than capacity',
		sold: 5,
		capacity: 10,
		soldOut: null,
		result: false,
	},
	{
		desc: 'returns true when isSoldOut is null BUT sold is equal to capacity',
		sold: 10,
		capacity: 10,
		soldOut: null,
		result: true,
	},
	{
		desc: 'returns true when isSoldOut is null BUT sold is greater than capacity',
		sold: 10,
		capacity: 5,
		soldOut: null,
		result: true,
	},
	{
		desc: 'returns `false` if isSoldOut is null and capacity is infitine (-1)',
		sold: 10,
		capacity: -1,
		soldOut: null,
		result: false,
	},
	{
		desc: 'returns `false` if isSoldOut is null and capacity is infitine (null)',
		sold: 10,
		capacity: null,
		soldOut: null,
		result: false,
	},
	{
		desc: 'returns `false` if isSoldOut is null and capacity is infitine (undefined)',
		sold: 10,
		capacity: undefined,
		soldOut: null,
		result: false,
	},
];

describe('datetime.isSoldOut', () => {
	testCases.forEach(({ desc, capacity, sold, soldOut, result }) => {
		const newDatetime = {
			...datetimes[0],
			isSoldOut: soldOut,
			capacity,
			sold,
		};
		it(desc, () => {
			expect(isSoldOut(newDatetime)).toBe(result);
		});
	});
});
