import { useCallback } from 'react';

import type { Ticket } from '@eventespresso/constants';
import { useDataState } from '../../data';

type Callback = (ticket: Ticket) => string;

const useColClassName = (): Callback => {
	const { hasNoAssignedDates } = useDataState();

	return useCallback<Callback>(
		(ticket) => {
			const isOrphan = hasNoAssignedDates({ ticketId: ticket.id });
			return isOrphan ? 'no-assignments' : '';
		},
		[hasNoAssignedDates]
	);
};

export default useColClassName;
