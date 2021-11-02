import { is } from 'ramda';

import { isInfinite } from '@eventespresso/utils';
import type { Datetime } from '@eventespresso/edtr-services';

/**
 * @param {Object} date event object
 * @return {boolean} true if status property is valid
 */
const validFiniteCapacityLimit = ({ capacity }: Datetime): boolean => {
	return is(Number, capacity) && !isInfinite(capacity);
};

export default validFiniteCapacityLimit;
