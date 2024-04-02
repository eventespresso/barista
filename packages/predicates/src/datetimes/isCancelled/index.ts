import * as R from 'ramda';

import type { Datetime } from '@eventespresso/constants';
import type { EntityFieldPred as EFP } from '@eventespresso/utils';

/**
 * @function
 * @param {Object} entity object
 * @return {boolean} true if datetime is cancelled
 */
export const isCancelled = (date: Datetime): boolean => {
	return R.propEq('isCancelled', true, date) || R.propEq('status', 'CANCELLED', date);
};

export const isNotCancelled: EFP<'isCancelled', boolean> = R.complement(isCancelled);
