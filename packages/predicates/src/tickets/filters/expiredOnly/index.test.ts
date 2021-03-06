import { formatISO, parseISO } from 'date-fns';

import expiredOnly from './index';
import { nodes as tickets } from '@eventespresso/edtr-services/src/apollo/queries/tickets/test/data';
import { diff, add } from '@eventespresso/dates';
import { NOW as now } from '@eventespresso/constants';

describe('expiredOnly', () => {
	it('should return an empty array if tickets are not expired', () => {
		const updatedTickets = tickets.map((ticket) => {
			const endDate = formatISO(add('weeks', now, 1));
			return { ...ticket, endDate, isExpired: false };
		});
		const filteredTickets = expiredOnly(updatedTickets);
		expect(filteredTickets).toEqual([]);
	});

	it('should return an array of expired tickets if ticket`s end date is past now', () => {
		const filteredTickets = expiredOnly(tickets);
		filteredTickets.forEach((ticket) => {
			const endDate = parseISO(ticket.endDate);
			const result = diff('minutes', endDate, now) < 0;
			expect(result).toBe(true);
		});
	});
});
