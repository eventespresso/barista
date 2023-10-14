import { parsedAmount } from './';

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
		const newParsedAmount = parsedAmount(amount);
		// newParsedAmount may be NaN
		const stringAmount = Number.isNaN(newParsedAmount) ? '' : newParsedAmount + '';
		// lame, but we have to convert to string in order to use parseFloat
		const floatAmount = Number.parseFloat(stringAmount);
		return floatAmount.toFixed(decimalPlaces);
	};
