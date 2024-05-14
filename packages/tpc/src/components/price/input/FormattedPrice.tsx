import { useCallback, useMemo } from 'react';

import { MoneyInputWrapper } from '@eventespresso/ui-components';
import { useMoneyDisplay, useConfig } from '@eventespresso/services';
import { parsedAmount } from '@eventespresso/utils';

import { useDataState } from '../../../data';
import { Factory } from '..';

import type { NumberProps } from '@eventespresso/ui-components';

/**
 * Used for displaying the total (formatted) price
 */
export const FormattedPrice = (props: NumberProps) => {
	const { ticket, updateTicketPrice } = useDataState();
	const { formatAmount } = useMoneyDisplay();
	const { currency } = useConfig();

	const defaultValue: string = useMemo(() => {
		const decimals = '0'.repeat(currency.decimalPlaces);
		return 0 + currency.decimalMark + decimals;
	}, [currency]);

	const value: string = useMemo(() => {
		return formatAmount(ticket?.price) || defaultValue;
	}, [ticket, formatAmount, defaultValue]);

	type OnChange = (string: string, number: number) => void;

	const onChange: OnChange = useCallback(
		(string, number) => {
			updateTicketPrice(Math.abs(parsedAmount(number)) || 0);
		},
		[updateTicketPrice]
	);

	const pattern: string = useMemo(() => {
		const mark = currency.decimalMark;
		const dp = currency.decimalPlaces;

		const integers = '[0-9]*?'; // lazy but greedy quantifier
		const separator = '\\' + mark;
		const decimals = `[0-9]{${dp}}`;

		return integers + separator + decimals;
	}, [currency]);

	return (
		<MoneyInputWrapper sign={currency?.sign} signB4={currency?.signB4} disabled={props.disabled}>
			<Factory
				{...props}
				_type='Number'
				name='ticket.price'
				aria-label={props['aria-label']}
				onChange={onChange}
				min={0}
				value={value}
				defaultValue={value}
				pattern={pattern}
			/>
		</MoneyInputWrapper>
	);
};
