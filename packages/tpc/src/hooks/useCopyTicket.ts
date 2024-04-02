import { useCallback } from 'react';

import { useTicketPrices } from '@eventespresso/edtr-services';
import { useRelations } from '@eventespresso/services';
import type { EntityId, Ticket } from '@eventespresso/constants';

import useMutateTicket from './useMutateTicket';
import usePrepTemplatePrices from './usePrepTemplatePrices';

const useCopyTicket = (ticket: Ticket): (() => Promise<EntityId>) => {
	const getTicketPrices = useTicketPrices();
	const { getRelations } = useRelations();
	const prepTemplatePrices = usePrepTemplatePrices();

	const mutateTicket = useMutateTicket();

	return useCallback(async () => {
		const prices = prepTemplatePrices(getTicketPrices(ticket?.id), false);

		// get the related datetime ids
		const datetimes = getRelations({
			entity: 'tickets',
			entityId: ticket.id,
			relation: 'datetimes',
		});

		// add datetimes and prices to mutation input
		const input = { ...ticket, prices, datetimes, sold: 0, isNew: true };

		// now finally create the ticket
		return await mutateTicket(input);
	}, [getRelations, getTicketPrices, mutateTicket, prepTemplatePrices, ticket]);
};

export default useCopyTicket;
