import { useCallback } from 'react';
import { pick } from 'ramda';

import type { StateInitializer } from './types';
import type { BaseProps } from '../types';
import { sortByPriceOrderIdAsc } from '@eventespresso/predicates';
import { TICKET_FIELDS_TO_USE } from '../utils/constants';
import { useTicketItem, useTicketPrices } from '@eventespresso/edtr-services';
import type { Ticket } from '@eventespresso/edtr-services';
import { useMemoStringify } from '@eventespresso/hooks';
import usePriceToTpcModifier from '../hooks/usePriceToTpcModifier';

/**
 * Initializes the data state dynamically by
 * setting the ticket details and the related prices
 */
const useInitialState = ({ ticketId }: BaseProps): StateInitializer => {
	// get the full ticket object
	const wholeTicket = useTicketItem({ id: ticketId });
	const ticket: Partial<Ticket> = useMemoStringify(wholeTicket ? pick(TICKET_FIELDS_TO_USE, wholeTicket) : {});

	// get all related prices
	const unSortedPrices = useTicketPrices(ticketId);
	//sort'em
	const sortedPrices = useMemoStringify(sortByPriceOrderIdAsc(unSortedPrices));

	const convertPriceToTpcModifier = usePriceToTpcModifier();
	// convert to TPC price objects by adding
	// "priceType" and "priceTypeOrder"
	const prices = useMemoStringify(sortedPrices.map(convertPriceToTpcModifier));

	return useCallback<StateInitializer>(
		(initialState) => {
			return { ...initialState, ticket, prices };
		},
		[ticket, prices]
	);
};

export default useInitialState;
