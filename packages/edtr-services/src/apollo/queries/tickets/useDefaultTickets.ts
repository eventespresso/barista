import { isDefault } from '@eventespresso/predicates';
import useTickets from './useTickets';

import type { Ticket } from '@eventespresso/constants';

const useDefaultTickets = (): Array<Ticket> => {
	return useTickets(isDefault);
};

export default useDefaultTickets;
