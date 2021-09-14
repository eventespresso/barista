import * as R from 'ramda';

import type { EntityFieldPred as EFP } from '@eventespresso/utils';

/**
 * @function
 * @param {Object} entity object
 * @return {boolean} true if ticket is trashed
 */
export const isTrashed: EFP<'isTrashed', boolean> = R.propEq('isTrashed', true);

export const isNotTrashed: EFP<'isTrashed', boolean> = R.complement(isTrashed);
