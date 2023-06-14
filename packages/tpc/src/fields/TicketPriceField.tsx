import { useCallback, useEffect, useMemo } from 'react';
import classNames from 'classnames';

import { formatAmount, sanitizeAmount } from '@eventespresso/utils';
import { useConfig } from '@eventespresso/services';
import { useDataState } from '../data';
import BaseField from './BaseField';
import { MoneyInputWithConfig } from './';
import type { BaseFieldProps, TicketPriceFieldProps } from './types';

type BFP = BaseFieldProps<string | number>;

const TicketPriceField: React.FC<TicketPriceFieldProps> = (props) => {
	const { currency } = useConfig();
	const inputFieldProps = useMemo(() => {
		const decimals = currency?.decimalPlaces ?? 2;
		const subunits = currency?.subunits ?? 100;
		return {
			min: 0,
			precision: decimals,
			step: 1 / subunits,
		};
	}, [currency]);

	const { ticket, updateTicketPrice } = useDataState();

	const format = useCallback((amount) => formatAmount(currency?.decimalPlaces)(amount), [currency]);
	// const { formatAmount } = useMoneyDisplay();

	// const format: BFP['format'] = useCallback((price) => formatAmount(price) ?? '', [formatAmount]);

	const getValue: BFP['getValue'] = useCallback(() => format(ticket?.price) || 0, [format, ticket?.price]);

	// const parse: BFP['parse'] = useCallback((price) => parseFloat(sanitizeAmount(price)), []);

	// const setValue: BFP['setValue'] = useCallback(
	// 	(value) => updateTicketPrice(Math.abs(parseFloat(sanitizeAmount(value))) || 0),
	// 	[updateTicketPrice]
	// );

	const className = classNames(props?.className, 'ee-input__price-field');

	// useEffect(() => {
	// 	const delayedFormat = setTimeout(() => {
	// 		updateTicketPrice(parseFloat(format(getValue())));
	// 	}, 500);
	// 	return () => window.clearTimeout(delayedFormat);
	// }, [format, getValue, updateTicketPrice]);

	return (
		<MoneyInputWithConfig disabled={props.disabled}>
			<BaseField
				{...props}
				className={className}
				format={format}
				formatOnBlur={false}
				getValue={getValue}
				inputFieldProps={inputFieldProps}
				name={'ticket.price'}
				parse={sanitizeAmount}
				setValue={updateTicketPrice}
				type='text'
				min={0}
			/>
		</MoneyInputWithConfig>
	);
};

export default TicketPriceField;
