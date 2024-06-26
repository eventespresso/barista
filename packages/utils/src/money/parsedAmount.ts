import type { Amount } from './types';

/**
 * Parse given input as float or return as is if already a float
 */
export const parsedAmount = (amount: Amount): number => {
	if (typeof amount === 'number') return amount;
	const float = Number.parseFloat(amount);
	if (Number.isNaN(float)) return 0;
	return float;
};
