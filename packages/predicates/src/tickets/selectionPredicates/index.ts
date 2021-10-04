import { assoc, includes, map, ObjPred, when } from 'ramda';

import { TICKET_FIELDS, TICKET_INPUT_FIELDS } from '../ticketFields';
import { entityHasGuid } from '.././../common';
import { EntityId } from '@eventespresso/data';
import { parseInfinity, AnyObject } from '@eventespresso/utils';
import type { Ticket } from '@eventespresso/edtr-services';

interface UpdateTicketPriceForTicketProps {
	amount: number;
	guid: EntityId;
	tickets: Ticket[];
}

interface UpdateTicketReverseCalculateProps {
	guid: EntityId;
	reverseCalculate: boolean;
	tickets: Ticket[];
}

export const isTicketField: ObjPred = (value, field) => includes(field, TICKET_FIELDS);

export const isTicketInputField: ObjPred = (value, field) => includes(field, TICKET_INPUT_FIELDS);

export const updateTicketPrice = (amount: number): ((obj: Ticket) => Ticket) => {
	return assoc<number, keyof Ticket>('price', amount);
};

export const updateReverseCalculate = (reverseCalculate: boolean): ((obj: Ticket) => Ticket) => {
	return assoc<boolean, keyof Ticket>('reverseCalculate', reverseCalculate);
};

export const updateTicketPriceForTicket = ({ amount, guid, tickets }: UpdateTicketPriceForTicketProps): Ticket[] => {
	return map(when(entityHasGuid(guid), updateTicketPrice(amount)), tickets);
};

export const updateTicketReverseCalculate = ({
	tickets,
	guid,
	reverseCalculate,
}: UpdateTicketReverseCalculateProps): Ticket[] => {
	return map(when(entityHasGuid(guid), updateReverseCalculate(reverseCalculate)), tickets);
};

/**
 * Given a list of items, it filters out the duplicates
 * the item with minimum quantity is retained
 */
export const uniqTicketsByMinQty = <T extends Pick<Partial<Ticket>, 'id' | 'quantity'>>(list: Array<T>): Array<T> => {
	// create an object with key as `item.id` and value as `item`
	const items = list.reduce<AnyObject<T>>((acc, item) => {
		if (!(item.id in acc)) {
			return { ...acc, [item.id]: item };
		}

		const nonNegativeExistingQty = parseInfinity(acc[item.id].quantity, Infinity);
		const nonNegativeNewQty = parseInfinity(item.quantity, Infinity);

		// if new quantity is less than existing one
		if (nonNegativeNewQty < nonNegativeExistingQty) {
			// we will replace the existing item with the new one
			return { ...acc, [item.id]: item };
		}

		// otherwise all good
		return acc;
	}, {});

	return Object.values(items);
};

export const ticketQuantityFromCapacity =
	(capacity: number) =>
	(quantity: number): number => {
		// capacity is expected to be a number.
		const nonNegativeDateCapacity = parseInfinity(capacity, Infinity);

		// Make sure that the non negative ticket quantity value is compared with
		// a non negative datetime capacity value in Math.min()
		const nonNegativeTicketQuantity = parseInfinity(quantity, Infinity);

		return parseInfinity(Math.min(nonNegativeDateCapacity, nonNegativeTicketQuantity));
	};
