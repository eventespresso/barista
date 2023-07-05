import { useCallback } from 'react';

import { useTicketMutator } from '@eventespresso/edtr-services';
import { useMutateTicket } from '@eventespresso/tpc';

import type { DataState } from './types';

type UseSubmitForm = (dataState: DataState) => () => Promise<void>;

const useSubmitForm: UseSubmitForm = ({ deletedTickets, tickets }) => {
	const mutateTicket = useMutateTicket(true);
	const { deleteEntity: deleteTicket } = useTicketMutator();

	return useCallback(async () => {
		await Promise.all(Object.values(tickets).map(mutateTicket));

		if (deletedTickets.length) {
			await Promise.all(deletedTickets.map((id) => deleteTicket({ id, deletePermanently: true })));
		}
	}, [deleteTicket, deletedTickets, mutateTicket, tickets]);
};

export default useSubmitForm;
