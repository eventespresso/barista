import { parsedAmount } from './';

import type { Amount } from './types';

export type FormatAmountFunction = (amount: Amount) => string;

/**
 * Function factory that formats the given input according the number of given decimal places
 */
export const formatAmount =
	(decimalPlaces: number): FormatAmountFunction =>
	(amount: Amount): string => {
		const newParsedAmount = parsedAmount(amount);
		// newParsedAmount may be NaN
		return isNaN(newParsedAmount) ? '' : newParsedAmount.toFixed(decimalPlaces);
	};
