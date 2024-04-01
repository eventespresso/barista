import classNames from 'classnames';
import { __ } from '@eventespresso/i18n';
import { useState, useCallback } from 'react';

import { useMoneyDisplay } from '@eventespresso/services';
import { parsedAmount } from '@eventespresso/utils';
import { BaseField, MoneyInputWithConfig, usePriceAmount } from '../fields';
import { useDataState } from '../data';
import type { PriceModifierProps } from '../types';
import type { BaseFieldProps, FieldValue } from '../fields/types';

import './styles.scss';

type Event = React.FocusEvent<HTMLInputElement>;

const PriceAmountInput: React.FC<PriceModifierProps> = ({ price }) => {
	const { formatAmount: formatMoneyAmount } = useMoneyDisplay();
	const { reverseCalculate, isDisabled } = useDataState();
	const { getValue, setValue } = usePriceAmount({ field: 'amount', price });
	const [format, setFormat] = useState(true);

	const hasError = Number(price?.amount ?? 0) === 0;
	const className = classNames(
		'ee-input__price-field',
		hasError && 'ee-input__price-field--has-error',
		price.isPercent
	);

	const getPrevValue = useCallback((): string | number => {
		const value = getValue();
		if (typeof value === 'boolean') {
			return 0;
		}
		return value;
	}, [getValue]);

	const parseValue: BaseFieldProps['parse'] = useCallback(
		(value) => {
			// get previous value
			const prevValue = getPrevValue();
			// fallback to 0 if cannot parse previous amount
			const prevAmount = parsedAmount(prevValue, 0);
			// fallback to previous amount if cannot parse value
			return parsedAmount(value, prevAmount);
		},
		[getPrevValue]
	);

	const formatValue: BaseFieldProps['format'] = useCallback(
		(value) => {
			const v = typeof value !== 'boolean' ? value : 0;
			return formatMoneyAmount(v);
		},
		[formatMoneyAmount]
	);

	const makePositive = useCallback((input: number): number => {
		return input > 0 ? input : input * -1;
	}, []);

	const onBlur: BaseFieldProps['onBlur'] = useCallback(
		(event) => {
			const rawValue = event.currentTarget.value;
			const parsedValue = parseValue(rawValue, 'amount');
			const formattedValue = formatValue(parsedValue, 'amount');
			const positiveValue = makePositive(formattedValue);
			setValue(positiveValue);
			setFormat(true);
		},
		[parseValue, formatValue, makePositive, setValue, setFormat]
	);

	const onFocus = useCallback((event: Event): void => {
		event.currentTarget.select();
	}, []);

	const onFocusCapture = useCallback((): void => {
		setValue(formatValue(getValue(), 'amount'));
		setFormat(false);
	}, [formatValue, getValue, setValue, setFormat]);

	const getFormattedValue = useCallback((): FieldValue => {
		const raw = getValue();
		if (format) {
			return formatValue(raw, 'amount');
		}
		return raw;
	}, [format, getValue, formatValue]);

	const disabled = isDisabled || (reverseCalculate && price.isBasePrice) || price.isDefault;

	return (
		<MoneyInputWithConfig disabled={disabled} isPercent={price.isPercent}>
			<BaseField
				aria-label={__('amount')}
				className={className}
				component='input'
				type='number'
				// because it can affect other tickets that have this price
				// default price amount should not be changeable
				disabled={disabled}
				getValue={getFormattedValue}
				setValue={setValue}
				onBlur={onBlur}
				onFocusCapture={onFocusCapture}
				onChangeValue={setValue}
				min={0}
				name='amount'
				placeholder={__('amount…')}
				onFocus={onFocus}
			/>
		</MoneyInputWithConfig>
	);
};

export default PriceAmountInput;
