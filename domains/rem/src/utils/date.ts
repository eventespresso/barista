import { add, sub } from '@eventespresso/dates';
import { TicketSatesFields } from '../ui/Tickets/types';

import type { IntervalType } from '@eventespresso/dates';
import type { StartAndEndDate } from '@eventespresso/types';

export const computeDatetimeEndDate = (startDate: Date, unit: IntervalType, duration: number): Date => {
	return add(unit, startDate, duration);
};

/**
 * computes the ticket start or end date based upon the start and end date of datetime
 */
export const computeTicketDate = (
	startAndEndDate: StartAndEndDate.Type.DateObject,
	ticketSales: TicketSatesFields
): Date => {
	const { position, startOrEnd, unit, unitValue } = ticketSales || {};
	const { startDate, endDate } = startAndEndDate || {};
	switch (true) {
		case startOrEnd === 'start' && position === 'before':
			return sub(unit, startDate, unitValue);
		// if they want to sell tickets after the date has started ¯\_(ツ)_/¯
		// Ever been to a football/cricket game?
		case startOrEnd === 'start' && position === 'after':
			return add(unit, startDate, unitValue);
		// hurry up, event is about to end, don't miss the left over stuff
		case startOrEnd === 'end' && position === 'before':
			return sub(unit, endDate, unitValue);
		// OK, the date has ended, just in case you are still interested to invest
		case startOrEnd === 'end' && position === 'after':
			return add(unit, endDate, unitValue);
	}
};
