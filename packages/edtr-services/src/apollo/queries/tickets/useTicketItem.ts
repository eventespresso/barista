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

	const memoData: any = useMemoStringify(data?.espressoTicket);

	const convertStringToNumber = (visibility: string) => {
		switch (visibility) {
			case 'NONE':
				return '0';
			case 'PUBLIC':
				return '100';
			case 'MEMBERS_ONLY':
				return '200';
			case 'ADMINS_ONLY':
				return '300';
			case 'ADMIN_UI_ONLY':
				return '400';
			default:
				return '100';
		}
	};

	const item: any = {
		...memoData,
		visibility: convertStringToNumber(memoData.visibility),
	};

	return item;
};

export default useTicketItem;
