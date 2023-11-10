import { compareAsc, parseISO } from 'date-fns';
import { compose, prop, sort, sortBy as sortByFn, toLower } from 'ramda';

import type { Ticket, SortBy } from '@eventespresso/edtr-services';

import { sortByOrder } from '../../common';

interface SortByProps {
	tickets: Ticket[];
	sortBy?: SortBy;
}

const sorters = ({ tickets, sortBy = 'date' }: SortByProps): Ticket[] => {
	let sorted;
	switch (sortBy) {
		case 'date':
			sorted = sort(({ startDate: dateLeft }, { startDate: dateRight }) => {
				return compareAsc(parseISO(dateLeft), parseISO(dateRight));
			}, tickets);
			break;
		case 'name':
			sorted = sortByFn(compose(toLower, prop('name')), tickets);
			break;
		case 'id':
			sorted = sortByFn(prop('dbId'), tickets);
			break;
		case 'order':
			sorted = sortByOrder(tickets);
			break;
	}
	// required tickets should always be displayed first
	return sorted.sort((a: Ticket, b: Ticket) => {
		if (a.isRequired && !b.isRequired) {
			return -1;
		}
		if (!a.isRequired && b.isRequired) {
			return 1;
		}
		return 0;
	});
};

export default sorters;
