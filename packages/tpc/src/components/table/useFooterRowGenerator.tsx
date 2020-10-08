import React, { useCallback } from 'react';

import { __ } from '@eventespresso/i18n';
import { TicketPriceField } from '../../fields';
import ReverseCalculateButton from '../../buttons/ReverseCalculateButton';
import type { Cell, FooterRow } from '@eventespresso/components';

interface Props {
	reverseCalculate: boolean;
	toggleCalcDir: VoidFunction;
}

type FooterRowGenerator = (props: Props) => FooterRow;

const useFooterRowGenerator = (): FooterRowGenerator => {
	return useCallback<FooterRowGenerator>(({ reverseCalculate, toggleCalcDir }: Props) => {
		const cells: Array<Cell> = [
			{
				key: 'id',
				type: 'cell',
				className: '',
				value: '',
			},
			{
				key: 'type',
				type: 'cell',
				className: '',
				value: '',
			},
			{
				key: 'name',
				type: 'cell',
				className: '',
				value: '',
			},
			{
				key: 'description',
				type: 'cell',
				className: 'ee-ticket-price-calculator-total-label ee-number-column',
				scope: 'row',
				value: __('Total'),
			},
			{
				as: 'td',
				key: 'amount',
				type: 'cell',
				className: 'ee-ticket-price-calculator__amount ee-ticket-price-calculator__total ee-number-column',
				value: (
					<TicketPriceField
						aria-label={__('ticket total')}
						component='input'
						disabled={!reverseCalculate}
						formatOnBlur
					/>
				),
			},
			{
				key: 'actions',
				type: 'cell',
				className: 'ee-ticket-price-calculator__actions',
				value: <ReverseCalculateButton reverseCalculate={reverseCalculate} toggleCalcDir={toggleCalcDir} />,
			},
		];

		return {
			cells,
			className: 'ee-ticket-price-calculator-total-row',
			key: 'price-total-row',
			primary: true,
			type: 'row',
		};
	}, []);
};

export default useFooterRowGenerator;
