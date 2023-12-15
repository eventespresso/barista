import * as R from 'ramda';

import type { EntityFieldPred as EFP } from '@eventespresso/utils';

/**
 * @function
 * @param {Object} entity object
 * @return {boolean} true if datetime is cancelled
 */
export const isCancelled: EFP<'isCancelled', boolean> = R.propEq('isCancelled', true);

export const isNotCancelled: EFP<'isCancelled', boolean> = R.complement(isCancelled);
