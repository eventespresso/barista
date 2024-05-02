import { ParsedAmount } from '.';
import type { Amount } from './types';

/**
 * returns amount parsed as a float (if not already a number)
 *
 * @param {number|string} amount
 * @param {boolean} what value to return if number cannot be parsed i.e. NaN condition
 * @return {number}
 */
export const parsedAmount = (amount: Amount, fallback: number = 0): number => {
	return new ParsedAmount().parse(amount, fallback);
};
