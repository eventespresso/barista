import { useMemo } from 'react';
import gql from 'graphql-tag';

import type { FetchQueryResult, QueryOptions } from '@eventespresso/data';
import { useTicketsQuery } from '@eventespresso/data';
import type { TicketsList } from '../types';

export const GET_TICKETS: any = gql`
	query GET_TICKETS($first: Int, $where: EspressoRootQueryTicketsConnectionWhereArgs) {
		espressoTickets(first: $first, where: $where) {
			nodes {
				id
				dbId
				name
			}
		}
	}
`;

const useTickets = (datetime?: string): FetchQueryResult<TicketsList> => {
	const queryOptions = useMemo<QueryOptions<TicketsList>>(
		() => ({
			query: GET_TICKETS,
			variables: {
				first: 100,
				where: { datetime },
			},
			fetchPolicy: 'cache-first',
		}),
		[datetime]
	);
	return useTicketsQuery(queryOptions);
};

export default useTickets;
