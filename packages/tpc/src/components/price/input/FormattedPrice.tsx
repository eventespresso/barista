import { useCallback, useEffect, useMemo, useState } from 'react';

import { MoneyInputWrapper } from '@eventespresso/ui-components';
import { useMoneyDisplay, useConfig } from '@eventespresso/services';
import { parsedAmount } from '@eventespresso/utils';

import { useDataState } from '../../../data';
import { Factory } from '..';

import type { NumberProps } from '@eventespresso/ui-components';

/**
 * Used for displaying the total (formatted) price
 */
export const FormattedPrice = ({ value, ...props }: NumberProps) => {
	const { ticket, updateTicketPrice } = useDataState();
	const { formatAmount } = useMoneyDisplay();
	const { currency } = useConfig();

	const defaultValue: string = useMemo(() => {
		const decimals = '0'.repeat(currency.decimalPlaces);
		return 0 + currency.decimalMark + decimals;
	}, [currency]);

	const [isChanging, setIsChanging] = useState<boolean>(false);

	const [state, setState] = useState<string>(() => {
		return formatAmount(value) || defaultValue;
	});

	useEffect(() => {
		if (ticket.price && !isChanging) {
			setState(formatAmount(ticket.price));
		}
	}, [setState, formatAmount, ticket.price, isChanging]);

	type OnChange = (string: string, number: number) => void;

	const getValueFromString = useCallback((value: string): string => {
		if (value.includes('.')) {
			const [integers, decimals] = value.split('.');
			if (decimals.length > 6) {
				return integers + '.' + decimals.substring(0, 6);
			}
			return value;
		}
		return value;
	}, []);

	const onChange: OnChange = useCallback(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		(string, number) => {
			setState(getValueFromString(string));
			setIsChanging(true);
		},
		[getValueFromString, setState, setIsChanging]
	);

	const onBlur = useCallback(() => {
		updateTicketPrice(Math.abs(parsedAmount(state)));
		setState(formatAmount(state));
		setIsChanging(false);
	}, [updateTicketPrice, setState, formatAmount, state, setIsChanging]);

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
				onBlur={onBlur}
				min={0}
				value={state}
				pattern={pattern}
			/>
		</MoneyInputWrapper>
	);
};
