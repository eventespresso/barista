import * as R from 'ramda';

import type { Datetime } from '@eventespresso/edtr-services';
import type { EntityFieldPred as EFP } from '@eventespresso/utils';

/**
 * @function
 * @param {Object} entity object
 * @return {boolean} true if datetime is postponed
 */
export const isPostponed = (date: Datetime): boolean => {
	return R.propEq('isPostponed', true, date) || R.propEq('status', 'POSTPONED', date);
};

export const isNotPostponed: EFP<'isPostponed', boolean> = R.complement(isPostponed);
