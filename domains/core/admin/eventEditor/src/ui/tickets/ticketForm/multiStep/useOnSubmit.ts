import { useCallback } from 'react';

import { useMutateTicket } from '@eventespresso/tpc';
import { wait } from '@eventespresso/utils';

import { useCappedQuantity } from '@eventespresso/edtr-services';
import { OnSubmit } from './types';

const useOnSubmit = (onClose: VoidFunction): OnSubmit => {
	const mutateTicket = useMutateTicket();
	const getCappedQuantity = useCappedQuantity();

	const convertNumberToString = (visibility: string) => {
		switch (visibility) {
			case '0':
				return 'NONE';
			case '100':
				return 'PUBLIC';
			case '200':
				return 'MEMBERS_ONLY';
			case '300':
				return 'ADMINS_ONLY';
			case '400':
				return 'ADMIN_UI_ONLY';
			default:
				return 'PUBLIC';
		}
	};

	const onSubmit = useCallback(
		async (fields) => {
			await wait(); // wait the next event cycle to fire up isLoading for submit button
			onClose(); // close the modal

			const quantity = getCappedQuantity({ quantity: fields.quantity, relatedDateIds: fields.datetimes });

			const input = {
				...fields,
				isModified: Boolean(fields.id), // should be updated if there is an id
				isNew: !fields.id, // it's new if id is empty
				quantity,
				visibility: convertNumberToString(fields.visibility),
			};

			await mutateTicket(input);
		},
		[getCappedQuantity, mutateTicket, onClose]
	);

	return onSubmit;
};

export default useOnSubmit;
