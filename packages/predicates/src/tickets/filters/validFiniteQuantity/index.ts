import { is } from 'ramda';

import { isInfinite } from '@eventespresso/utils';
import type { Ticket } from '@eventespresso/edtr-services';

/**
 * @param {Object} ticket    event ticket object
 * @return {boolean} true if qty property is valid and NOT infinite
 */
const validFiniteQuantity = (ticket: Ticket): boolean => {
	const { quantity } = ticket;
	const isNumber = is(Number, quantity);

	return isNumber && !isInfinite(quantity) && Math.round(quantity) > 0;
};

export default validFiniteQuantity;
