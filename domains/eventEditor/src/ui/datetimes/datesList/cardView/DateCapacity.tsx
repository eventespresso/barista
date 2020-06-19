import React, { useCallback } from 'react';

import { parseInfinity } from '@eventespresso/services';
import { InlineEditInfinity, TextProps } from '@eventespresso/components';
import {
	useDatetimeMutator,
	useUpdateRelatedTickets,
	useTicketQuantityForCapacity,
} from '@eventespresso/edtr-services';
import { getPropsAreEqual } from '@eventespresso/services';
import type { DateItemProps } from '../types';

const DateCapacity: React.FC<DateItemProps> = ({ entity: datetime }) => {
	const { updateEntity } = useDatetimeMutator(datetime.id);

	const updateRelatedTickets = useUpdateRelatedTickets(datetime.id);
	const ticketQuantityForCapacity = useTicketQuantityForCapacity();

	const onChange: TextProps['onChange'] = useCallback(
		(cap) => {
			const capacity = parseInfinity(cap);
			if (capacity !== datetime.capacity) {
				updateEntity({ capacity });

				const inputGenerator = ticketQuantityForCapacity(capacity);
				updateRelatedTickets(inputGenerator);
			}
		},
		[datetime.capacity, updateEntity, ticketQuantityForCapacity, updateRelatedTickets]
	);

	return <InlineEditInfinity onChangeValue={onChange} value={`${datetime.capacity}`} />;
};

export default React.memo(DateCapacity, getPropsAreEqual(['entity']));
