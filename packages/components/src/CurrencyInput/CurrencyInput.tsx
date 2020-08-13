import React, { useCallback } from 'react';
import classNames from 'classnames';

import { parsedAmount, useMoneyDisplay } from '@eventespresso/services';
import { InlineEditText } from '../InlineEditInput';

import type { CurrencyInputProps } from './types';

import './style.scss';

const nullFunc = (args?: any) => null;

const CurrencyInput: React.FC<CurrencyInputProps> = ({
	amount = 0,
	id = '',
	onChange = nullFunc,
	tag = 'p',
	wrapperProps = {},
	vertical,
}) => {
	const { formatAmount, beforeAmount, afterAmount } = useMoneyDisplay();
	const className = classNames('ee-currency-input', vertical && 'ee-currency-input--vertical');
	const before = beforeAmount ? <span className={'ee-currency-input__before-amount'}>{beforeAmount} </span> : '';
	const after = afterAmount ? <span className={'ee-currency-input__after-amount'}> {afterAmount}</span> : '';
	const formattedAmount = formatAmount(amount);
	const Wrapper = tag;

	const onChangeHandler = useCallback(
		(value: string) => {
			const newAmount = parsedAmount(value);
			if (newAmount !== amount) {
				onChange({ amount: newAmount, id });
			}
		},
		[amount, id, onChange]
	);

	return (
		<Wrapper {...wrapperProps} className={className}>
			{before}
			<InlineEditText
				as='span'
				fitText={false}
				key={id}
				onChangeValue={onChangeHandler}
				value={formattedAmount}
			/>
			{after}
		</Wrapper>
	);
};

export default CurrencyInput;
