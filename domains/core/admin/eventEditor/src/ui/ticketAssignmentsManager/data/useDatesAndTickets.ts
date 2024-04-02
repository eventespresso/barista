import { Datetime, Ticket } from '@eventespresso/constants';
import { useDatetimes, useTickets } from '@eventespresso/edtr-services';
import { useMemoStringify } from '@eventespresso/utils';

import { DatesAndTickets } from '../types';
import { useTAMContext } from '../context';
import useFilteredDatetimes from './useFilteredDatetimes';
import useFilteredTickets from './useFilteredTickets';

const useDatesAndTickets = (): DatesAndTickets => {
	const { assignmentType, entity } = useTAMContext();
	const allDates = useDatetimes();
	const allTickets = useTickets();

	const filteredDatetimes = useFilteredDatetimes(allDates);
	const filteredTickets = useFilteredTickets(allTickets);

	let datetimes: Array<Datetime>, tickets: Array<Ticket>;

	switch (assignmentType) {
		case 'forAll':
			datetimes = filteredDatetimes;
			tickets = filteredTickets;
			break;
		case 'forDate':
			datetimes = [entity as Datetime];
			tickets = filteredTickets;
			break;
		case 'forTicket':
			datetimes = filteredDatetimes;
			tickets = [entity as Ticket];
			break;
	}

	return useMemoStringify({ datetimes, tickets });
};

export default useDatesAndTickets;
