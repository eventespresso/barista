import * as R from 'ramda';

import type { Datetime } from '@eventespresso/constants';

/**
 * @function
 * @param {Object} entity object
 * @return {boolean} true if datetime has a status of DTB (TDB: to be determined)
 */
export const isTBD = (date: Datetime): boolean => R.propEq('status', 'TO_BE_DETERMINED', date);

export const isNotTBD = (date: Datetime): boolean => R.complement(isTBD)(date);
