import { useCallback, useMemo } from 'react';

import { SimpleEntityList } from '@eventespresso/ui-components';
import { useTickets, useTicketPrices } from '@eventespresso/edtr-services';
import { useTimeZoneTime } from '@eventespresso/services';
import { usePrepTemplatePrices } from '@eventespresso/tpc';
import { __ } from '@eventespresso/i18n';

import TicketCard from './TicketCard';
import { useFormState, RemTicket } from '../../data';
import { normalizeTicketForRem } from '../../utils';
import { ContentRenderer } from './multiStep';

const Tickets: React.FC = () => {
	const { addTicket, tickets, deleteTicket } = useFormState();
	const templates = useTickets() as unknown as RemTicket[];
	const { utcToSiteTime } = useTimeZoneTime();
	const getTicketPrices = useTicketPrices();
	const prepTemplatePrices = usePrepTemplatePrices();

	const deleteEntity = useCallback(
		(ticket: RemTicket) => {
			deleteTicket(ticket.id);
		},
		[deleteTicket]
	);

	const entities = useMemo(() => Object.values(tickets), [tickets]);

	const addEntity = useCallback(
		(entity) => {
			const normalizedTicket = normalizeTicketForRem(entity, utcToSiteTime);
			const ticketPrices = getTicketPrices(entity.id);
			const prices = prepTemplatePrices(ticketPrices);

			addTicket({ ...normalizedTicket, prices });
		},
		[addTicket, getTicketPrices, prepTemplatePrices, utcToSiteTime]
	);

	return (
		<SimpleEntityList
			ContentRenderer={ContentRenderer}
			addEntity={addEntity}
			className='rem-tickets'
			deleteEntity={deleteEntity}
			entities={entities}
			entityType={__('ticket')}
			templates={templates}
			EntityRenderer={TicketCard}
		/>
	);
};

export default Tickets;
