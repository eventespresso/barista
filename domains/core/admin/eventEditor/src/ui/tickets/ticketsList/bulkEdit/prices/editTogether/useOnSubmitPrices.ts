import { useCallback } from 'react';

import type { Price } from '@eventespresso/constants';
import { useTicketPrices, useBulkDeletePrices } from '@eventespresso/edtr-services';
import { useDataState, useMutateTicket } from '@eventespresso/tpc';
import { isNotDefault, getGuids } from '@eventespresso/predicates';
import { useBulkEdit } from '@eventespresso/services';

const useOnSubmitPrices = (onClose: VoidFunction): (() => Promise<void>) => {
	const { prices, ticket } = useDataState();
	const { getSelected } = useBulkEdit();

	const mutateTicket = useMutateTicket();

	const getTicketPrices = useTicketPrices();

	const deletePrices = useBulkDeletePrices();

	// Async to make sure that prices are handled before updating the ticket.
	return useCallback(async () => {
		// lower down the curtains
		onClose();

		// prices related to all the selected tickets
		const relatedPrices = getSelected().reduce<Price[]>(
			(prices, ticketId) => [...prices, ...getTicketPrices(ticketId)],
			[]
		);

		// prices may contain default taxes,
		// we need to make sure they are not deleted.
		const nonDefaultPrices = relatedPrices.filter(isNotDefault);
		// delete all non-default prices
		await deletePrices(getGuids(nonDefaultPrices));

		// tickets/prices can be mutated in parallel
		await Promise.all(
			// loop through all the selected tickets and update thei price information
			getSelected().map(async (ticketId) => {
				await mutateTicket({
					...ticket,
					id: ticketId,
					isModified: true,
					prices,
				});
			})
		);
	}, [deletePrices, getSelected, getTicketPrices, mutateTicket, onClose, prices, ticket]);
};

export default useOnSubmitPrices;
