import { useCallback } from 'react';

import { __ } from '@eventespresso/i18n';
import { parseInfinity } from '@eventespresso/utils';
import { InlineEditInfinity, InlineEditProps } from '@eventespresso/ui-components';
import { useTicketMutator, useCappedQuantity } from '@eventespresso/edtr-services';
import { useSystemNotifications } from '@eventespresso/toaster';

import type { TicketItemProps } from '../types';

const TicketQuantity: React.FC<TicketItemProps> = ({ entity: ticket }) => {
	const { updateEntity } = useTicketMutator(ticket.id);

	const toaster = useSystemNotifications();
	const getCappedQuantity = useCappedQuantity();

	const onChange = useCallback<InlineEditProps['onChange']>(
		async (qty) => {
			const parsedQuantity = parseInfinity(qty);

			const quantity = getCappedQuantity({ quantity: parsedQuantity, ticketId: ticket.id });

			const isQtyAdjustedByCapacity = quantity !== parsedQuantity;
			const hasQtyChanged = quantity !== ticket.quantity;

			if (isQtyAdjustedByCapacity) {
				toaster.info({
					message: __(
						'Ticket quantity has been adjusted because it cannot be more than the related event date capacity.'
					),
				});
			}

			if (hasQtyChanged || isQtyAdjustedByCapacity) {
				await updateEntity({ quantity });
			}
		},
		[getCappedQuantity, ticket.id, ticket.quantity, toaster, updateEntity]
	);

	return (
		<InlineEditInfinity
			// Since ticket quantity is restricted by related date capacity
			// it's possible that the quantity has exactly the same value as the min date capacity
			// inline edit uses the internal state to update the value in UI
			// Since the quantity and capacity can be same, it can result in stale value being shown
			// passing a key ensures that UI updates with the correct value
			key={ticket.cacheId}
			data-testid='ee-ticket-inline-qty'
			onChange={onChange}
			tooltip={__('edit quantity of tickets available…')}
			value={`${ticket.quantity}`}
		/>
	);
};

export default TicketQuantity;
