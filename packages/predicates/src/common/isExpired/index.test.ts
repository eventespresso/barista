import { formatISO } from 'date-fns';
import { add, sub } from '@eventespresso/dates';

import { isExpired } from './index';
import { nodes as tickets } from '@eventespresso/edtr-services/src/apollo/queries/tickets/test/data';
import { NOW as now } from '@eventespresso/constants';

const testCases = [
	// ticket is expired based on actual date
	{
		desc: 'returns true when ticket.isExpired is true, ignoreFlag is true, AND ticket end date is in the past',
		expired: true,
		endDateOccurs: 'past',
		ignoreFlag: true,
		result: true,
	},
	{
		desc: 'returns true when ticket.isExpired is true, ignoreFlag is false, AND ticket end date is in the past',
		expired: true,
		endDateOccurs: 'past',
		ignoreFlag: false,
		result: true,
	},
	// ticket is NOT expired based on actual date
	{
		desc: 'returns false when ticket.isExpired is true, ignoreFlag is true, BUT ticket end date is in the future',
		expired: true,
		endDateOccurs: 'future',
		ignoreFlag: true,
		result: false,
	},
	{
		desc: 'returns true when ticket.isExpired is true, ignoreFlag is false, BUT ticket end date is in the future',
		expired: true,
		endDateOccurs: 'future',
		ignoreFlag: false,
		result: true,
	},
	// ticket is expired based on actual date
	{
		desc: 'returns true when ticket.isExpired is false, ignoreFlag is true, BUT ticket end date is in the past',
		expired: false,
		endDateOccurs: 'past',
		ignoreFlag: true,
		result: true,
	},
	{
		desc: 'returns false when ticket.isExpired is false, ignoreFlag is false, BUT ticket end date is in the past',
		expired: false,
		endDateOccurs: 'past',
		ignoreFlag: false,
		result: false,
	},
	// ticket is NOT expired based on actual date
	{
		desc: 'returns false when ticket.isExpired is false, ignoreFlag is true, AND ticket end date is in the future',
		expired: false,
		endDateOccurs: 'future',
		ignoreFlag: true,
		result: false,
	},
	{
		desc: 'returns false when ticket.isExpired is false, ignoreFlag is true, AND ticket end date is in the future',
		expired: false,
		endDateOccurs: 'future',
		ignoreFlag: false,
		result: false,
	},
];

const modifyDate = (endDateOccurs: string): string =>
	endDateOccurs === 'future' ? formatISO(add('weeks', now, 1)) : formatISO(sub('weeks', now, 1));

describe('isExpired', () => {
	tickets.forEach((ticket) => {
		testCases.forEach(({ desc, expired, endDateOccurs, ignoreFlag, result }) => {
			const endDate = modifyDate(endDateOccurs);
			const newTicket = { ...ticket, endDate, isExpired: expired };
			it(desc, () => {
				expect(isExpired(newTicket, ignoreFlag)).toBe(result);
			});
		});
	});
});
