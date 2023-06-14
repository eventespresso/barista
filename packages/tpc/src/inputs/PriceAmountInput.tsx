import { useCallback, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { __ } from '@eventespresso/i18n';

import { formatAmount, sanitizeAmount } from '@eventespresso/utils';
import { useConfig } from '@eventespresso/services';
import { BaseField, MoneyInputWithConfig, usePriceAmount } from '../fields';
import { useDataState } from '../data';
import type { PriceModifierProps } from '../types';

import './styles.scss';

const PriceAmountInput: React.FC<PriceModifierProps> = ({ price }) => {
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

	const { reverseCalculate, isDisabled } = useDataState();
	const { getValue, setValue } = usePriceAmount({ field: 'amount', price });

	const hasError = Number(price?.amount ?? 0) <= 0;

	const className = classNames(
		'ee-input__price-field',
		hasError && 'ee-input__price-field--has-error',
		price.isPercent
	);

	// because it can affect other tickets that have this price,
	// default price amount should not be editable
	const disabled = isDisabled || (reverseCalculate && price.isBasePrice) || price.isDefault;

	// const formatParse =
	// 	(defaultValue = null) =>
	// 	(amount: number | string) => {
	// 		const moneyValue = amount ?? defaultValue;
	// 		console.log('%c PriceAmountInput::formatParse()', 'color: DodgerBlue; font-size: 12px;');
	// 		console.log('%c amount', 'color: DodgerBlue;', amount);
	// 		console.log('%c moneyValue', 'color: DodgerBlue;', moneyValue);
	// 		return sanitizeAmount(moneyValue);
	// 	};

	const format = useCallback((amount) => formatAmount(currency?.decimalPlaces)(amount), [currency]);

	useEffect(() => {
		setTimeout(() => {
			setValue(format(getValue()));
		}, 500);
		// return () => window.clearTimeout(delayedFormat);
	}, [format, getValue, setValue]);

	return (
		<MoneyInputWithConfig disabled={disabled} isPercent={price.isPercent}>
			<BaseField
				aria-label={__('amount')}
				className={className}
				component='input'
				disabled={disabled}
				format={format}
				formatOnBlur={false}
				getValue={getValue}
				inputFieldProps={inputFieldProps}
				name='amount'
				parse={sanitizeAmount}
				placeholder={__('amount…')}
				setValue={setValue}
				type='text'
			/>
		</MoneyInputWithConfig>
	);
};

export default PriceAmountInput;
