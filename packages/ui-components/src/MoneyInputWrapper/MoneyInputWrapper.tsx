import classNames from 'classnames';

import { getCurrencySignCharacterCountClassName } from '@eventespresso/utils';
import { CurrencySign, InputWithLabel, PercentSign } from '..';
import type { MoneyInputWrapperProps } from './types';

import './style.scss';

export const MoneyInputWrapper: React.FC<MoneyInputWrapperProps> = ({
	children,
	disabled,
	isPercent = false,
	sign,
	signB4,
	...props
}) => {
	const characters = getCurrencySignCharacterCountClassName(sign);

	const label = isPercent ? (
		<PercentSign className='ee-money-field__label' />
	) : (
		<CurrencySign className='ee-money-field__label' sign={sign} />
	);
	const isLeftPositioned = signB4 && !isPercent;
	const labelPosition = isLeftPositioned ? 'left' : 'right';

	const className = classNames(
		'ee-money-field',
		characters,
		isPercent && 'ee-money-field--with-percent-sign',
		!isPercent && 'ee-money-field--with-currency-sign',
		`ee-money-field-sign--${signB4 ? 'before' : 'after'}`,
		props.className
	);

	return (
		<InputWithLabel className={className} disabled={disabled} label={label} labelPosition={labelPosition}>
			{children}
		</InputWithLabel>
	);
};
