import { useCallback } from 'react';

import { useLazyCacheQuery } from '@eventespresso/data';
import { GET_TICKET } from './queries';

import type { EntityId, Ticket } from '@eventespresso/constants';
import type { TicketItem } from '../../types';

type GetTicket = (id: EntityId) => Ticket;

const useLazyTicket = (): GetTicket => {
	const getData = useLazyCacheQuery<TicketItem>();

	return useCallback<GetTicket>(
		(id) => {
			const data = getData({
				query: GET_TICKET,
				variables: {
					id,
				},
			});
			return data?.espressoTicket;
		},
		[getData]
	);
};

export default useLazyTicket;
