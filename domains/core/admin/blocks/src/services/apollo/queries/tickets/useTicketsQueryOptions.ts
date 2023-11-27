import { useMemo } from 'react';

import type { QueryHookOptions } from '@eventespresso/data';

import { TicketsList } from '@blocksServices/apollo/types';
import { GET_TICKETS } from './queries';

const useTicketsQueryOptions = (datetime?: string): QueryHookOptions<TicketsList> => {
	return useMemo<QueryHookOptions<TicketsList>>(
		() => ({
			query: GET_TICKETS,
			variables: {
				first: 250,
				where: {
					datetime,
				},
			},
			fetchPolicy: 'cache-first',
		}),
		[datetime]
	);
};

export default useTicketsQueryOptions;
