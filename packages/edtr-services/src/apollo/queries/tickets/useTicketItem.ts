import { useMemo } from 'react';

import { useCacheQuery, CacheQueryOptions } from '@eventespresso/data';
import { useMemoStringify } from '@eventespresso/hooks';

import { GET_TICKET } from './queries';
import type { Ticket, TicketItem } from '../../types';
import type { EntityItemProps } from '../types';

const useTicketItem = ({ id }: EntityItemProps): Ticket => {
	const options = useMemo<CacheQueryOptions>(
		() => ({
			query: GET_TICKET,
			variables: {
				id,
			},
			returnPartialData: true, // avoid console warnings if data not present
		}),
		[id]
	);
	const { data } = useCacheQuery<TicketItem>(options);

	return useMemoStringify(data?.espressoTicket);
};

export default useTicketItem;
