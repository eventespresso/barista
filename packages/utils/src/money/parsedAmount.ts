import type { Amount } from './types';

const NON_NUMERIC_REGEX = /[^\d.-]+/g;

/**
 * returns amount parsed as a float (if not already a number)
 *
 * @param {number|string} amount
 * @return {number}
 */
export const parsedAmount = (amount: Amount): number => {
	if (typeof amount === 'number') {
		return amount;
	}
	const float = amount.replace(NON_NUMERIC_REGEX, '') as unknown;
	if (Number.isNaN(float)) {
		 return 0;
	}
	return float as number;
};
