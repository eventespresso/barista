import { useMemo } from 'react';

import { isExpired, notTrashed } from '@eventespresso/predicates';
import { useFilterState } from '../filters';
import type { Ticket } from '@eventespresso/constants';

const useFilteredTickets = (allTickets: Array<Ticket>): Array<Ticket> => {
	const { showExpiredTickets, showTrashedTickets } = useFilterState();

	return useMemo(() => {
		let tickets = allTickets;
		if (!showExpiredTickets) {
			tickets = tickets.filter((ticket) => !isExpired(ticket));
		}

		if (!showTrashedTickets) {
			tickets = notTrashed(tickets);
		}

		return tickets;
	}, [allTickets, showExpiredTickets, showTrashedTickets]);
};

export default useFilteredTickets;
