import React, { useCallback } from 'react';

import { parseInfinity, getPropsAreEqual } from '@eventespresso/services';
import { InlineEditInfinity, TextProps } from '@eventespresso/components';
import { useTicketMutator } from '@eventespresso/edtr-services';
import type { TicketItemProps } from '../types';

const TicketQuantity: React.FC<TicketItemProps> = ({ entity: ticket }) => {
	const { updateEntity } = useTicketMutator(ticket.id);

	const onChange: TextProps['onChange'] = useCallback(
		(qty) => {
			const quantity = parseInfinity(qty);
			if (quantity !== ticket.quantity) {
				updateEntity({ quantity });
			}
		},
		[ticket.quantity, updateEntity]
	);

	return <InlineEditInfinity onChangeValue={onChange} value={`${ticket.quantity}`} />;
};

export default React.memo(TicketQuantity, getPropsAreEqual(['entity', 'cacheId']));
