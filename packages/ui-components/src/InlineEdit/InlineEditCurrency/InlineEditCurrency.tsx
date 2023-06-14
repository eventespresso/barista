import { useCallback } from 'react';

import classNames from 'classnames';

import { formatAmount as defaultFormatAmount, sanitizeAmount } from '@eventespresso/utils';
import { InlineEditText } from '../InlineEditInput';

import type { InlineEditCurrencyProps } from './types';

import './style.scss';

const nullFunc = () => null;

export const InlineEditCurrency: React.FC<InlineEditCurrencyProps> = ({
	amount = 0,
	afterAmount,
	beforeAmount,
	formatAmount = defaultFormatAmount(2), // default is supplied for SB only
	id = '',
	isEditDisabled,
	onChange = nullFunc,
	tag = 'div',
	wrapperProps,
	vertical,
	tooltip,
}) => {
	const className = classNames('ee-currency-input', vertical && 'ee-currency-input--vertical');
	const before = beforeAmount ? <span className={'ee-currency-input__before-amount'}>{beforeAmount} </span> : '';
	const after = afterAmount ? <span className={'ee-currency-input__after-amount'}> {afterAmount}</span> : '';
	const formattedAmount = formatAmount(amount);
	const Wrapper = tag;

	const onChangeHandler = useCallback(
		(value: string) => {
			const newAmount = sanitizeAmount(value);
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
				isDisabled={isEditDisabled}
				key={id}
				onChange={onChangeHandler}
				tooltip={tooltip}
				value={formattedAmount}
			/>
			{after}
		</Wrapper>
	);
};
