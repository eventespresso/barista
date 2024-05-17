import { useCallback, useEffect, useMemo, useState } from 'react';
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

	const [localState, setState] = useState<string>(getValue.asString());
	const [focus, setFocus] = useState<boolean>(false);

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
			setState(inputFilter(string));
		},
		[inputFilter, setState]
	);

	const onBlur = useCallback<On.Blur>(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		(event) => {
			setFocus(false);
			// use 'localState' as opposed to 'event' due to filtering by 'useInputFilter' by 'onChange'
			setValue(localState);
		},
		[setFocus, setValue, localState]
	);

	const onFocus = useCallback<On.Focus>(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		(event) => {
			setFocus(true);
		},
		[setFocus]
	);

	useEffect(() => {
		// condition 1: if field is disabled it is VALID to set local state because price is being updated *outsidate*
		// condition 2: when NOT focusing we know that user has finished changing the value so we can update the local state
		if (isDisabled || !focus) {
			setState(price.amount.toString());
		}
	}, [isDisabled, price.amount, focus, setState]);

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
				value={localState}
				onChange={onChange}
				onBlur={onBlur}
				onFocus={onFocus}
			/>
		</MoneyInputWrapper>
	);
};

module On {
	export type Change = NumberInputProps['onChange'];
	export type Blur = NumberInputProps['onBlur'];
	export type Focus = React.FocusEventHandler<HTMLInputElement>;
}
