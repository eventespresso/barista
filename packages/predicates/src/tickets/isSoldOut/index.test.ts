import isSoldOut from './index';
import { nodes as tickets } from '@eventespresso/edtr-services/src/apollo/queries/tickets/test/data';

const testCases = [
	{
		desc: 'returns the value of isSoldOut flag if it is true',
		sold: null,
		quantity: null,
		soldOut: true,
		result: true,
	},
	{
		desc: 'returns the value of isSoldOut flag if it is false',
		sold: null,
		quantity: null,
		soldOut: false,
		result: false,
	},
	{
		desc: 'returns true when isSoldOut is null AND sold is equal to quantity',
		sold: 10,
		quantity: 10,
		soldOut: null,
		result: true,
	},
	{
		desc: 'returns true when isSoldOut is null AND sold is greater than quantity',
		sold: 10,
		quantity: 5,
		soldOut: null,
		result: true,
	},
	{
		desc: 'returns false when isSoldOut is null BUT quantity is infinite',
		sold: 10,
		quantity: -1,
		soldOut: null,
		result: false,
	},
	{
		desc: 'returns false when isSoldOut is null AND sold is less than quantity',
		sold: 5,
		quantity: 10,
		soldOut: null,
		result: false,
	},
	{
		desc: 'returns true when isSoldOut is null BUT sold is equal to quantity',
		sold: 10,
		quantity: 10,
		soldOut: null,
		result: true,
	},
	{
		desc: 'returns true when isSoldOut is null BUT sold is greater than quantity',
		sold: 10,
		quantity: 5,
		soldOut: null,
		result: true,
	},
	{
		desc: 'returns `false` if isSoldOut is null and quantity is infinite (-1)',
		sold: 10,
		quantity: -1,
		soldOut: null,
		result: false,
	},
	{
		desc: 'returns `false` if isSoldOut is null and quantity is infinite (null)',
		sold: 10,
		quantity: null,
		soldOut: null,
		result: false,
	},
	{
		desc: 'returns `false` if isSoldOut is null and quantity is infinite (undefined)',
		sold: 10,
		quantity: undefined,
		soldOut: null,
		result: false,
	},
];

describe('ticket.isSoldOut', () => {
	testCases.forEach(({ desc, quantity, sold, soldOut, result }) => {
		const newTicket = {
			...tickets[0],
			isSoldOut: soldOut,
			quantity,
			sold,
		};
		it(desc, () => {
			expect(isSoldOut(newTicket)).toBe(result);
		});
	});
});
