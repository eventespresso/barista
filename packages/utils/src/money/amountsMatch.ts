import { sanitizeAmount } from './';

/**
 * returns true if the two supplied values are equal after being parsed as floats
 *
 * @param {number|string} amount1
 * @param {number|string} amount2
 * @return {boolean}
 */
export const amountsMatch = (amount1: number | string, amount2: number | string): boolean => {
	return parseFloat(sanitizeAmount(amount1)) === parseFloat(sanitizeAmount(amount2));
};
