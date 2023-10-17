import type { Amount } from './types';

const NON_NUMERIC_REGEX = /[^\d.-]+/g;

/**
 * returns amount parsed as a float (if not already a number)
 *
 * @param {number|string} amount
 * @param {boolean} what value to return if number cannot be parsed i.e. NaN condition
 * @return {number}
 */
export const parsedAmount = (amount: Amount, fallback: number = 0): number => {
	if (amount === null) {
		return fallback;
	}
	if (typeof amount === 'number') {
		return amount;
	}
	const parsedStr = amount.replace(NON_NUMERIC_REGEX, '');
	if (Number.isNaN(parsedStr)) {
		return fallback;
	}
	return Number.parseFloat(parsedStr);
};
