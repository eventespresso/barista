import { useCallback } from 'react';

import { __, sprintf } from '@eventespresso/i18n';

import { parseInfinity } from '@eventespresso/utils';
import { InlineEditInfinity, InlineEditProps } from '@eventespresso/ui-components';
import { useDatetimeMutator, useUpdateTicketQtyByCapacity } from '@eventespresso/edtr-services';
import type { DateItemProps } from '../types';

const DateCapacity: React.FC<DateItemProps> = ({ entity: datetime }) => {
	const { updateEntity } = useDatetimeMutator(datetime.id);

	const { createBulkQtyUpdateInput, doQtyBulkUpdate } = useUpdateTicketQtyByCapacity();

	const onChange: InlineEditProps['onChange'] = useCallback(
		async (cap) => {
			const capacity = parseInfinity(cap);
			if (capacity !== datetime.capacity) {
				console.log('datetime', datetime);
				await updateEntity({ capacity });

				// pass the new capacity to create input
				const input = createBulkQtyUpdateInput({ ...datetime, capacity });
				console.log('input', input);

				await doQtyBulkUpdate(input);
			}
		},
		[datetime, updateEntity, createBulkQtyUpdateInput, doQtyBulkUpdate]
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
