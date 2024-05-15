import { useMemo } from 'react';

import { formatAmount } from '@eventespresso/utils';
import { useConfig } from '../config';
import type { FormatAmountFunction } from '@eventespresso/utils';
import type { Type as ConfigType } from '@eventespresso/config';

export interface MoneyDisplay {
	/** the currency sign if the currency displays it before the amount (or '') */
	afterAmount: string;
	/** the currency sign if the currency displays it before the amount (or '') */
	beforeAmount: string;
	/** the full currency config object */
	currency: ConfigType.Currency;
	/** function for formatting the amount using the correct number of decimal places for the currency */
	formatAmount: FormatAmountFunction;
}

export const useMoneyDisplay = (): MoneyDisplay => {
	const { currency } = useConfig();

	const afterAmount = currency.signB4 ? '' : currency.sign;
	const beforeAmount = currency.signB4 ? currency.sign : '';
	const formatMoney = formatAmount(currency.decimalPlaces);

	return useMemo(
		() => ({
			afterAmount,
			beforeAmount,
			currency: currency,
			formatAmount: formatMoney,
		}),
		[afterAmount, beforeAmount, currency, formatMoney]
	);
};

export default useMoneyDisplay;
