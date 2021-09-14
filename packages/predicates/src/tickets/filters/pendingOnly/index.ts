import * as R from 'ramda';

import isPending from '../../isPending';
import type { TicketFilterFn } from '../types';

const pendingOnly: TicketFilterFn = (tickets) => {
	return R.filter(isPending, tickets);
};

export default pendingOnly;
