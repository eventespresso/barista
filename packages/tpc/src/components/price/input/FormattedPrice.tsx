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

	const [focus, setFocus] = useState<boolean>(false);

	const onChange: On.Change = useCallback(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		(string, number) => {
			setValue(inputFilter(string));
		},
		[inputFilter]
	);

	useEffect(() => {
		// set value from 'ticket.price' only when are *not*
		// focusing on the input field
		if (!focus) {
			setValue(formatPrice(ticket.price));
		}
	}, [focus, setValue, formatPrice, ticket.price]);

	const onBlur: On.Blur = useCallback(
		({ currentTarget: { value } }) => {
			setFocus(false);
			updateTicketPrice(Math.abs(parsedAmount(value)));
		},
		[setFocus, updateTicketPrice]
	);

	const onFocus: On.Focus = useCallback(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		(event) => {
			setFocus(true);
		},
		[setFocus]
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
				onFocus={onFocus}
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

	export type Focus = React.FocusEventHandler<HTMLInputElement>;
}
