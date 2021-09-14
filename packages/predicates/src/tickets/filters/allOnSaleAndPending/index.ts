import { anyPass, filter } from 'ramda';

import isOnSale from '../../isOnSale';
import isPending from '../../isPending';
import type { TicketFilterFn } from '../types';

const allOnSaleAndPending: TicketFilterFn = (tickets) => {
	const isOnSaleOrIsPending = anyPass<any>([isOnSale, isPending]);
	const onSaleAndPending = filter(isOnSaleOrIsPending, tickets);
	return onSaleAndPending;
};

export default allOnSaleAndPending;
