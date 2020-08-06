import { useCallback } from 'react';

import { useBulkEdit } from '@eventespresso/services';
import { useTickets, useBulkEditTickets, formToBulkUpdateInput } from '@eventespresso/edtr-services';

import type { BulkEditFormShape } from './types';

type Callback = (values: BulkEditFormShape) => void;

const useSubmitForm = (onClose: VoidFunction): Callback => {
	const { getSelected, unSelectAll } = useBulkEdit();
	const allTickets = useTickets();
	const { updateEntities } = useBulkEditTickets();
	return useCallback<Callback>(
		(formData) => {
			// pull the shutter down
			onClose();
			// back to basics
			unSelectAll();
			// prepare mutaion input from data
			const input = formToBulkUpdateInput(formData, allTickets, getSelected());
			// do the thing
			updateEntities(input);
		},
		[allTickets, getSelected, onClose, unSelectAll, updateEntities]
	);
};

export default useSubmitForm;
