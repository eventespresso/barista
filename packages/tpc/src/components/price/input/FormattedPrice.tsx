import { useCallback, useState, useEffect } from 'react';

import { MoneyInputWrapper } from '@eventespresso/ui-components';
import { useMoneyDisplay } from '@eventespresso/services';
import { parsedAmount } from '@eventespresso/utils';

import { useDataState } from '../../../data';
import { Factory } from '..';
import { useInputFilter } from '.';

import type { NumberProps } from '@eventespresso/ui-components';
import type { CommonInputProps } from '@eventespresso/adapters';

/**
 * Used for displaying the total (formatted) price
 */
export const FormattedPrice = (props: NumberProps) => {
	const inputFilter = useInputFilter();
	const { ticket, updateTicketPrice } = useDataState();
	const { currency, formatAmount: formatPrice } = useMoneyDisplay();

	const [value, setValue] = useState<string>(() => {
		return formatPrice(ticket.price);
	});

	const onChange: On.Change = useCallback(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		(string, number) => {
			setValue(inputFilter(string));
		},
		[inputFilter]
	);

	useEffect(() => {
		setValue(formatPrice(ticket.price));
	}, [ticket]);

	const onBlur: On.Blur = useCallback(
		({ currentTarget: { value } }) => {
			const newValue = Math.abs(parsedAmount(value));

			updateTicketPrice(newValue);
			setValue(formatPrice(newValue));
		},
		[updateTicketPrice, currency, formatPrice]
	);

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
				value={value}
				defaultValue={value}
			/>
		</MoneyInputWrapper>
	);
};

module On {
	export type Change = CommonInputProps<HTMLInputElement, React.ReactText>['onChange'];

	export type Blur = React.FocusEventHandler<HTMLInputElement>;
}
