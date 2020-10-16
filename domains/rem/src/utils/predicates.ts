import { filter, propEq } from 'ramda';

import { RemTicket } from '../data';
import { GeneratedDate } from '../ui/generatedDates';

// is a shared ticket ?
export const isShared = propEq('isShared', true);
export const isNotShared = propEq('isShared', false);

export const getSharedTickets = (tickets: Array<RemTicket>): Array<RemTicket> => {
	return filter<RemTicket>(isShared, tickets);
};

export const getNonSharedTickets = (tickets: Array<RemTicket>): Array<RemTicket> => {
	return filter<RemTicket>(isNotShared, tickets);
};

export const isGDate = ({ type }: { type: GeneratedDate['type'] }): boolean => type === 'gDate';

export const getGDates = (generatedDates: Array<GeneratedDate>): Array<GeneratedDate> => {
	return filter<GeneratedDate>(isGDate, generatedDates);
};
