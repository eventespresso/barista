import { useCallback } from 'react';
import * as R from 'ramda';

import { useTicketPrices } from '@eventespresso/edtr-services';
import type { EntityId } from '@eventespresso/constants'
import { useTicketMutator } from '@eventespresso/edtr-services';
import { getGuids, entitiesWithGuIdNotInArray } from '@eventespresso/predicates';
import { usePriceQueryOptions } from '@eventespresso/edtr-services';
import type { PricesList } from '@eventespresso/edtr-services';
import { useApolloClient } from '@eventespresso/data';

type Callback = (deletePermanently?: boolean) => Promise<void>;

const useDeleteTicketHandler = (id: EntityId): Callback => {
	const { deleteEntity: deleteTicket } = useTicketMutator();
	const getTicketPrices = useTicketPrices();
	const priceQueryOptions = usePriceQueryOptions();
	const client = useApolloClient();

	/**
	 * Deletes the related prices from Apollo cache,
	 * permanent deletion is handled server-side
	 */
	const deleteRelatedPrices = useCallback<VoidFunction>(() => {
		// The prices that are not default or tax prices.
		const pricesToDelete = getTicketPrices(id).filter(({ isDefault, isTax }) => !isDefault && !isTax);
		// if we have nothing to delete
		if (!pricesToDelete.length) {
			return;
		}
		const priceIdsToDelete = getGuids(pricesToDelete);
		// read existing data from Apollo cache
		const data = client.readQuery<PricesList>(priceQueryOptions);
		// filter out the related prices from Apollo cache data
		const pricesToRetain = entitiesWithGuIdNotInArray(data?.espressoPrices?.nodes || [], priceIdsToDelete);
		// avoid the dirty object creation using assocPath
		const newData = R.assocPath(['espressoPrices', 'nodes'], pricesToRetain, data);

		// write the data back to cache
		client.writeQuery<PricesList>({
			...priceQueryOptions,
			data: newData,
		});
	}, [client, getTicketPrices, id, priceQueryOptions]);

	return useCallback<Callback>(
		(deletePermanently) => {
			return (
				deleteTicket({ id, deletePermanently })
					// delete prices only if ticket is deleted permanently
					.then(() => deletePermanently && deleteRelatedPrices())
					.catch(console.error)
			);
		},
		[deleteTicket, id, deleteRelatedPrices]
	);
};

export default useDeleteTicketHandler;
