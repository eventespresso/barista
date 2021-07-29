import { useCallback } from 'react';

import { __, sprintf } from '@eventespresso/i18n';

import { parseInfinity } from '@eventespresso/utils';
import { InlineEditInfinity, InlineEditProps } from '@eventespresso/ui-components';
import {
	useDatetimeMutator,
	useUpdateRelatedTickets,
	useTicketQuantityForCapacity,
} from '@eventespresso/edtr-services';
import type { DateItemProps } from '../types';

const DateCapacity: React.FC<DateItemProps> = ({ entity: datetime }) => {
	const { updateEntity } = useDatetimeMutator(datetime.id);

	const updateRelatedTickets = useUpdateRelatedTickets();
	const ticketQuantityForCapacity = useTicketQuantityForCapacity();

	const onChange: InlineEditProps['onChange'] = useCallback(
		(cap) => {
			const capacity = parseInfinity(cap);
			if (capacity !== datetime.capacity) {
				updateEntity({ capacity });

				const inputGenerator = ticketQuantityForCapacity(capacity);
				updateRelatedTickets(datetime.id, inputGenerator);
			}
		},
		[datetime.capacity, datetime.id, updateEntity, ticketQuantityForCapacity, updateRelatedTickets]
	);

	/* translators:  click to edit capacity<linebreak>(registration limit)…*/
	const tooltip = sprintf(__('click to edit capacity%s(registration limit)…'), '\n');

	return (
		<InlineEditInfinity
			data-testid='ee-datetime-inline-cap'
			onChange={onChange}
			tooltip={tooltip}
			value={`${datetime.capacity}`}
		/>
	);
};

export default DateCapacity;
