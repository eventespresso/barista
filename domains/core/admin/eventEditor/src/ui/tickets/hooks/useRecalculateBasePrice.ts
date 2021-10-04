import { useCallback } from 'react';

import { EntityId } from '@eventespresso/data';
import { calculateBasePrice, useInitialState } from '@eventespresso/tpc';
import { getBasePrice, getPriceModifiers } from '@eventespresso/predicates';
import { useDefaultBasePrice, useMutatePrices } from '@eventespresso/tpc';
import { useLazyTicket, useTicketMutator, useTicketPrices } from '@eventespresso/edtr-services';

type Callback = (ticketPrice: number) => Promise<void>;

const useRecalculateBasePrice = (ticketId: EntityId): Callback => {
	const getTicket = useLazyTicket();
	const getTicketPrices = useTicketPrices();
	// This will give us the exact state expected by `calculateBasePrice()`
	const getDataState = useInitialState({ ticketId, getTicket, getTicketPrices });
	// This default price will be added if there is none
	const defaultBasePrice = useDefaultBasePrice();
	const mutatePrices = useMutatePrices();
	const { updateEntity: updateTicket } = useTicketMutator(ticketId);

	return useCallback<Callback>(
		async (ticketPrice) => {
			let tpcData = getDataState(null);
			// Make sure the new ticket price is used
			const updatedTicket = { ...tpcData.ticket, price: ticketPrice };
			tpcData = { ...tpcData, ticket: updatedTicket };

			const existingBasePrice = getBasePrice(tpcData.prices);
			const priceModifiers = getPriceModifiers(tpcData.prices);
			// get the updated base price amount
			const newBasePriceAmount = calculateBasePrice(tpcData.ticket?.price, tpcData.prices);

			// if the ticket does not have a base price,
			// that means it was free and now a price has been added ¯\_(ツ)_/¯
			const newBasePrice = existingBasePrice
				? // add the exiting base price
				  { ...existingBasePrice, isModified: true }
				: // add the default price
				  { ...defaultBasePrice, order: 1, isNew: true };

			const newPrices = [
				// update the base price amount
				{ ...newBasePrice, amount: newBasePriceAmount },
				// add the existing ones, just in case we are dealing with aliens,
				// don't get me wrong, because only they can have other prices without a base price,
				// may be their taxation system works differently, who knows ¯\_(ツ)_/¯
				...priceModifiers,
			];

			const relatedPriceIds = await mutatePrices(newPrices);

			await updateTicket({
				// this is the ticket prices amount
				price: ticketPrice,
				// since ticket price has been changed, we need to go in reverse gear ◀️
				reverseCalculate: true,
				// Make sure related prices are updated
				prices: relatedPriceIds,
			});
		},
		[defaultBasePrice, getDataState, mutatePrices, updateTicket]
	);
};

export default useRecalculateBasePrice;
