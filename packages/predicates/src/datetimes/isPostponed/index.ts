import * as R from 'ramda';

import type { EntityFieldPred as EFP } from '@eventespresso/utils';

/**
 * @function
 * @param {Object} entity object
 * @return {boolean} true if datetime is postponed
 */
export const isPostponed: EFP<'isPostponed', boolean> = R.propEq('isPostponed', true);

export const isNotPostponed: EFP<'isPostponed', boolean> = R.complement(isPostponed);
