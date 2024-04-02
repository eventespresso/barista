import { useMemoStringify } from '@eventespresso/utils';
import { getGuids } from '@eventespresso/predicates';
import type { EntityId } from '@eventespresso/constants'

import useDefaultTickets from './useDefaultTickets';

const useDefaultTicketIds = (): EntityId[] => {
	const tickets = useDefaultTickets();

	return useMemoStringify(getGuids(tickets));
};

export default useDefaultTicketIds;
