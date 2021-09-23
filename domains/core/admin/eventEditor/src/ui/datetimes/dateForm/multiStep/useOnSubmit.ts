import { useCallback } from 'react';

import {
	useDatetimeMutator,
	useUpdateTicketQtyByCapacity,
	useDatetimeItem,
	useDatetimes,
} from '@eventespresso/edtr-services';
import { getHighestOrder } from '@eventespresso/predicates';
import type { EntityId } from '@eventespresso/data';
import { isInfinite, wait } from '@eventespresso/utils';

import { OnSubmit } from './types';

const useOnSubmit = (entityId: EntityId, onClose: VoidFunction): OnSubmit => {
	const { createEntity, updateEntity } = useDatetimeMutator();
	const datetime = useDatetimeItem({ id: entityId });

	const { createBulkQtyUpdateInput, doQtyBulkUpdate } = useUpdateTicketQtyByCapacity();
	const dates = useDatetimes();

	const onSubmit = useCallback(
		async (fields) => {
			// wait the next event cycle to fire up isLoading for submit button
			await wait();

			// whether date capacity has been changed
			let capacityChanged = false;
			let id = entityId;

			onClose();
			// If it's an existing entity
			if (entityId) {
				// Update it
				await updateEntity(fields);

				capacityChanged = fields?.capacity !== datetime?.capacity;
			} else {
				// we need to set the order to be higher than those of all the existing ones
				const order = fields.order || getHighestOrder(dates) + 1;
				// otherwise create it
				const result = await createEntity({ ...fields, order });

				// Get the ID.
				id = result?.data?.createEspressoDatetime?.espressoDatetime?.id;

				// For new dates, capacity matters only if it's finite.
				capacityChanged = !isInfinite(fields?.capacity);
			}
			// if true, we need to update the quantity of all the related tickets
			if (capacityChanged && id) {
				const input = createBulkQtyUpdateInput(fields, fields?.tickets);
				await doQtyBulkUpdate(input);
			}
		},
		[createBulkQtyUpdateInput, createEntity, dates, datetime, doQtyBulkUpdate, entityId, onClose, updateEntity]
	);

	return onSubmit;
};

export default useOnSubmit;
