import classNames from 'classnames';

import { __ } from '@eventespresso/i18n';
import { parsedAmount } from '@eventespresso/utils';
import { useConfig } from '@eventespresso/services';
import { MoneyInputWrapper } from '@eventespresso/ui-components';

import { useDataState } from '../../../../data';
import { BaseField } from '../..';
import { useAmount } from '.';

import type { PriceModifierProps } from '../../../..';
import './styles.scss';

export const Amount: React.FC<PriceModifierProps> = ({ price }) => {
	const { reverseCalculate, isDisabled } = useDataState();
	const { getValue, setValue } = useAmount({ field: 'amount', price });
	const { currency } = useConfig();

	const hasError = Number(price?.amount ?? 0) === 0;
	const className = classNames(
		'ee-input__price-field',
		hasError && 'ee-input__price-field--has-error',
		price.isPercent
	);

	const disabled = isDisabled || (reverseCalculate && price.isBasePrice) || price.isDefault;

	const formatParse =
		(defaultValue = null) =>
		(amount: any) => {
			const parsedValue = parsedAmount(amount);
			return isNaN(parsedValue) ? defaultValue : parsedValue;
		};

	return (
		<MoneyInputWrapper
			sign={currency?.sign}
			signB4={currency?.signB4}
			disabled={disabled}
			isPercent={price.isPercent}
		>
			<BaseField
				aria-label={__('amount')}
				className={className}
				component='input'
				// because it can affect other tickets that have this price
				// default price amount should not be changeable
				disabled={disabled}
				format={formatParse('')}
				formatOnBlur
				getValue={getValue}
				min={0}
				name='amount'
				parse={formatParse()}
				placeholder={__('amount…')}
				setValue={setValue}
				type='number'
			/>
		</MoneyInputWrapper>
	);
};
