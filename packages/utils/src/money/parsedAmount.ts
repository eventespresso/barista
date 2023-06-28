import type { Amount } from './types';

/**
 * returns amount parsed as a float (if not already a number)
 *
 * @param {number|string} amount
 * @return {number}
 */
export const parsedAmount = (amount: Amount): number => {
	if (typeof amount === 'number') return amount;
	const float = Number.parseFloat(amount);
	if (Number.isNaN(float)) return 0;
	return float;
};
