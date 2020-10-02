import { identity, sortBy } from 'ramda';

import { GET_TICKETS } from '../tickets';
import { EntityId, TicketsList, TicketsQueryArgs, CacheQueryOptions } from '@eventespresso/data';
import { TicketEdge } from '../../';
import useDatetimeIds from '../datetimes/useDatetimeIds';
import { useMemoStringify } from '@eventespresso/hooks';

type DatetimesQueryOptions = CacheQueryOptions<TicketsList<TicketEdge>, TicketsQueryArgs>;

const useTicketQueryOptions = (datetimeIn: EntityId[] = []): DatetimesQueryOptions => {
	const datetimeIds = useDatetimeIds();

	let newDatetimeIn = datetimeIn.length ? datetimeIn : datetimeIds;

	// Sort the IDs list which may be out of order,
	// thus changing the key used to access Apollo Cache
	newDatetimeIn = sortBy(identity, newDatetimeIn);

	const options: DatetimesQueryOptions = {
		query: GET_TICKETS,
		variables: {
			where: {
				datetimeIn: newDatetimeIn,
			},
		},
	};

	return useMemoStringify(options, newDatetimeIn);
};

export default useTicketQueryOptions;
