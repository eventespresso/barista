import { useCallback } from 'react';

import { useMoneyDisplay } from '@eventespresso/services';
import { parsedAmount } from '@eventespresso/utils';
import { useDataState } from '../data';
import BaseField from './BaseField';
import { MoneyInputWithConfig } from './';
import type { BaseFieldProps, TicketPriceFieldProps } from './types';

type BFP = BaseFieldProps<number>;

/**
 * Used for displaying the total (formatted) price
 */
const TicketPriceField: React.FC<TicketPriceFieldProps> = (props) => {
	const { ticket, updateTicketPrice } = useDataState();
	const { formatAmount } = useMoneyDisplay();

	const format: BFP['format'] = useCallback((price) => formatAmount(price) ?? '', [formatAmount]);

	const getValue: BFP['getValue'] = useCallback(() => ticket?.price || 0, [ticket?.price]);

	const parse: BFP['parse'] = useCallback((price) => parsedAmount(price), []);

	const setValue: BFP['setValue'] = useCallback(
		(value) => updateTicketPrice(Math.abs(parsedAmount(value)) || 0),
		[updateTicketPrice]
	);

	return (
		<MoneyInputWithConfig disabled={props.disabled}>
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
		</MoneyInputWithConfig>
	);
};

export default TicketPriceField;
