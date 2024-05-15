import { useCallback, useMemo } from 'react';
import classNames from 'classnames';

import { __ } from '@eventespresso/i18n';
import { useConfig } from '@eventespresso/services';
import { MoneyInputWrapper } from '@eventespresso/ui-components';

import { useDataState } from '../../../..';
import { Factory } from '../..';
import { useInputFilter } from '..';
import { useAmount } from '.';

import type { NumberInputProps } from '@eventespresso/adapters';
import type { PriceModifierProps } from '../../../..';
import './styles.scss';

export const Amount: React.FC<PriceModifierProps> = ({ price }) => {
	const { reverseCalculate, isDisabled } = useDataState();
	const { getValue, setValue } = useAmount({ field: 'amount', price });
	const { currency } = useConfig();
	const inputFilter = useInputFilter();

	const value = useMemo(() => getValue(), [getValue]);

	const hasError = useMemo<boolean>(() => {
		return Number(price?.amount ?? 0) === 0;
	}, [price]);

	const className = useMemo(
		() => classNames('ee-input__price-field', hasError && 'ee-input__price-field--has-error', price.isPercent),
		[price, hasError]
	);

	// because it can affect other tickets that have this price
	// default price amount should not be changeable
	const disabled = useMemo<boolean>(() => {
		return isDisabled || (reverseCalculate && price.isBasePrice) || price.isDefault;
	}, [isDisabled, reverseCalculate, price]);

	const onChange = useCallback<On.Change>(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		(string, number) => {
			setValue(inputFilter(string));
		},
		[setValue, inputFilter]
	);

	const onBlur = useCallback<On.Blur>(
		({ currentTarget: { value } }) => {
			setValue(value);
		},
		[setValue]
	);

	return (
		<MoneyInputWrapper
			sign={currency?.sign}
			signB4={currency?.signB4}
			disabled={disabled}
			isPercent={price.isPercent}
		>
			<Factory
				_type='Number'
				name={__('amount')}
				aria-label={__('amount')}
				className={className}
				disabled={disabled}
				min={0}
				placeholder={__('amount…')}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			/>
		</MoneyInputWrapper>
	);
};

module On {
	export type Change = NumberInputProps['onChange'];
	export type Blur = NumberInputProps['onBlur'];
}
