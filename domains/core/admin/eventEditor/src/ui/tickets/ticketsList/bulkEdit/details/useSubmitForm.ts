import { useCallback } from 'react';

import { useBulkEdit } from '@eventespresso/services';
import { useTickets, useBulkEditTickets, formToBulkUpdateInput, useCappedQuantity } from '@eventespresso/edtr-services';

import type { BulkEditFormShape } from './types';

type Callback = (values: BulkEditFormShape) => Promise<void>;

const useSubmitForm = (onClose: VoidFunction): Callback => {
	const { getSelected, unSelectAll } = useBulkEdit();
	const allTickets = useTickets();
	const { updateEntities } = useBulkEditTickets();
	const getCappedQuantity = useCappedQuantity();

	return useCallback<Callback>(
		async (formData) => {
			// pull the shutter down
			onClose();
			// prepare mutation input from data
			const input = formToBulkUpdateInput(formData, allTickets, getSelected());

			// if quantity is changed
			if ('quantity' in input.sharedInput) {
				// restrict quantity by related date capacity
				input.uniqueInputs = input.uniqueInputs.map((uniqueInput) => {
					const quantity = getCappedQuantity({
						quantity: input.sharedInput.quantity,
						ticketId: uniqueInput.id,
					});

					return { ...uniqueInput, quantity };
				});
			}

			// back to basics
			unSelectAll();
			// do the thing
			await updateEntities(input);
		},
		[allTickets, getCappedQuantity, getSelected, onClose, unSelectAll, updateEntities]
	);
};

export default useSubmitForm;
