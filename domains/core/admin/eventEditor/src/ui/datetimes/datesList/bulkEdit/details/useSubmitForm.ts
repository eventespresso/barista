import { useCallback } from 'react';

import { useBulkEdit } from '@eventespresso/services';
import { isInfinite } from '@eventespresso/utils';
import {
	useDatetimes,
	useBulkEditDatetimes,
	formToBulkUpdateInput,
	useUpdateTicketQtyByCapacity,
} from '@eventespresso/edtr-services';

import type { BulkEditFormShape } from './types';

type Callback = (values: BulkEditFormShape) => Promise<void>;

const useSubmitForm = (onClose: VoidFunction): Callback => {
	const { getSelected, unSelectAll } = useBulkEdit();
	const allDates = useDatetimes();
	const { updateEntities } = useBulkEditDatetimes();
	const { createBulkQtyUpdateInput, doQtyBulkUpdate } = useUpdateTicketQtyByCapacity();

	return useCallback<Callback>(
		async (formData) => {
			// pull the shutter down
			onClose();
			// prepare mutation input from data
			const input = formToBulkUpdateInput(formData, allDates, getSelected());
			// back to basics
			unSelectAll();
			// do the thing
			await updateEntities(input);

			// If capacity is present and is not infinite
			if (!isInfinite(formData.capacity)) {
				// generate a combined ticket quantity input from all the selected dates
				const uniqInput = getSelected().reduce((input, id) => {
					const newInput = createBulkQtyUpdateInput({ id, capacity: formData.capacity });
					return [...input, ...newInput];
				}, []);

				await doQtyBulkUpdate(uniqInput);
			}
		},
		[allDates, createBulkQtyUpdateInput, doQtyBulkUpdate, getSelected, onClose, unSelectAll, updateEntities]
	);
};

export default useSubmitForm;
