import { useCallback } from 'react';

import { MoneyInputWrapper } from '@eventespresso/ui-components';
import { useMoneyDisplay, useConfig } from '@eventespresso/services';
import { parsedAmount } from '@eventespresso/utils';

import { useDataState } from '../../../data';
import { BaseField } from '..';

import type { BaseFieldProps, TicketPriceFieldProps } from '..';

type BFP = BaseFieldProps<number>;

// TODO: consolidate types

/**
 * Used for displaying the total (formatted) price
 */
export const FormattedPrice: React.FC<TicketPriceFieldProps> = (props) => {
	const { ticket, updateTicketPrice } = useDataState();
	const { formatAmount } = useMoneyDisplay();
	const { currency } = useConfig();

	const format: BFP['format'] = useCallback((price) => formatAmount(price) ?? '', [formatAmount]);

	const getValue: BFP['getValue'] = useCallback(() => ticket?.price || 0, [ticket?.price]);

	const parse: BFP['parse'] = useCallback((price) => parsedAmount(price), []);

	const setValue: BFP['setValue'] = useCallback(
		(value) => updateTicketPrice(Math.abs(parsedAmount(value)) || 0),
		[updateTicketPrice]
	);

	return (
		<MoneyInputWrapper sign={currency?.sign} signB4={currency?.signB4} disabled={props.disabled}>
			<BaseField
				{...props}
				format={format}
				getValue={getValue}
				name={'ticket.price'}
				parse={parse}
				setValue={setValue}
				type='number'
				min={0}
			/>
		</MoneyInputWrapper>
	);
};
