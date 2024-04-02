import { useCallback } from 'react';
import { pick } from 'ramda';

import { useMemoStringify } from '@eventespresso/utils';
import { isLocked } from '@eventespresso/predicates';

import type { StateInitializer } from './types';
import type { BaseProps } from '../types';
import { TICKET_FIELDS_TO_USE, preparePricesForTpc } from '../utils';
import { usePriceToTpcModifier } from '../hooks';
import { hooks } from '../ioc';

/**
 * Initializes the data state dynamically by
 * setting the ticket details and the related prices
 */
const useInitialState = ({ getTicket, getTicketPrices, ticketId }: BaseProps): StateInitializer => {
	// get the full ticket object
	const wholeTicket = getTicket(ticketId);

	const isDisabled = hooks.applyFilters('tpc.ticket.isDisabled', isLocked(wholeTicket || {}), wholeTicket);

	const ticket = useMemoStringify(wholeTicket ? pick(TICKET_FIELDS_TO_USE, wholeTicket) : {});

	const convertPriceToTpcModifier = usePriceToTpcModifier();

	return useCallback<StateInitializer>(
		(initialState) => {
			// get all related prices
			const unSortedPrices = getTicketPrices(ticketId) || [];

			// convert to TPC price objects
			const prices = preparePricesForTpc(unSortedPrices, convertPriceToTpcModifier);

			return { ...initialState, isDisabled, ticket, prices };
		},
		[getTicketPrices, ticketId, convertPriceToTpcModifier, isDisabled, ticket]
	);
};

export default useInitialState;
