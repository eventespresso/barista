import { useMemoStringify } from '@eventespresso/utils';
import { getGuids } from '@eventespresso/predicates';
import type { EntityId } from '@eventespresso/constants';
import useTickets from './useTickets';

const useTicketIds = (): EntityId[] => {
	const tickets = useTickets();

	return useMemoStringify(getGuids(tickets));
};

export default useTicketIds;
