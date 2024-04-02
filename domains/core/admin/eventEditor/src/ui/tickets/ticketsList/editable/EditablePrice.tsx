import { useCallback } from 'react';

import { __ } from '@eventespresso/i18n';
import { Clickable } from '@eventespresso/adapters';
import { InlineEditCurrency } from '@eventespresso/ui-components';
import { CurrencyDisplay } from '@eventespresso/ee-components';
import { useMemoStringify } from '@eventespresso/utils';
import { useMoneyDisplay } from '@eventespresso/services';
import { isLocked } from '@eventespresso/predicates';
import { useLockedTicketAction } from '@eventespresso/tpc';

import useRecalculateBasePrice from '../../hooks/useRecalculateBasePrice';
import type { TicketItemProps } from '../types';

import './style.scss';

interface EditablePriceProps extends TicketItemProps {
	className?: string;
}

const EditablePrice: React.FC<Partial<EditablePriceProps>> = ({ entity: ticket, className }) => {
	const { afterAmount, beforeAmount, formatAmount } = useMoneyDisplay();
	const recalculateBasePrice = useRecalculateBasePrice(ticket.id);
	const onChangePrice = useCallback(
		({ amount }: any): void => {
			const price = Math.abs(amount);
			if (price !== ticket.price) {
				recalculateBasePrice(price);
			}
		},
		[recalculateBasePrice, ticket.price]
	);
	const { alertContainer, showAlert } = useLockedTicketAction(ticket, 'COPY/TRASH');

	const wrapperProps = useMemoStringify({ className });

	const isTicketLocked = isLocked(ticket);

	const tooltip = __('edit ticket total…');

	return isTicketLocked ? (
		<Clickable as='div' className='ee-ticket-editable-price' onClick={showAlert}>
			<CurrencyDisplay className={className} value={ticket.price} />
			{alertContainer}
		</Clickable>
	) : (
		<InlineEditCurrency
			afterAmount={afterAmount}
			amount={ticket.price}
			beforeAmount={beforeAmount}
			formatAmount={formatAmount}
			id={ticket.id}
			placeholder={__('set price…')}
			wrapperProps={wrapperProps}
			onChange={onChangePrice}
			tag={'h3'}
			tooltip={tooltip}
		/>
	);
};

export default EditablePrice;
