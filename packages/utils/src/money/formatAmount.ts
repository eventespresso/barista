import { sanitizeAmount } from './';

import type { Amount } from './types';

export type FormatAmountFunction = (amount: Amount) => string;

/**
 * returns a function that when supplied a value for the number of decimal places used by a currency,
 * returns a second function that can be passed an amount which will then be appropriately formatted
 *
 * @param {number} decimalPlaces
 * @return {Function}
 */
export const formatAmount =
	(decimalPlaces: number): FormatAmountFunction =>
	(amount: Amount): string => {
		const sanitizedAmount = parseFloat(sanitizeAmount(amount));
		return sanitizedAmount.toFixed(decimalPlaces);
	};
