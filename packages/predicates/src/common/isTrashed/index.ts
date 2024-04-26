import * as R from 'ramda';
import type { EntityFieldPred } from '../..';

/**
 * @function
 * @param {Object} entity object
 * @return {boolean} true if ticket is trashed
 */
export const isTrashed: EntityFieldPred<'isTrashed', boolean> = R.propEq('isTrashed', true);

export const isNotTrashed: EntityFieldPred<'isTrashed', boolean> = R.complement(isTrashed);
