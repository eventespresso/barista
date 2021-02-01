import { useCallback, useEffect, useMemo } from 'react';

import { SimpleEntityList } from '@eventespresso/ui-components';
import { useTickets, useTicketPrices } from '@eventespresso/edtr-services';
import { usePrepTemplatePrices } from '@eventespresso/tpc';

import { DefaultTicket, useDataState } from './data';
import TicketCard from './TicketCard';
import { ContentRenderer } from './multiStep';

import './styles.scss';

const ModalBody: React.FC = () => {
	const { addTicket, tickets, deleteTicket, reset } = useDataState();
	const templates = useTickets();
	const getTicketPrices = useTicketPrices();
	const prepTemplatePrices = usePrepTemplatePrices();

	const deleteEntity = useCallback(
		(ticket: DefaultTicket) => {
			deleteTicket(ticket.id, ticket.isNew);
		},
		[deleteTicket]
	);

	const entities = useMemo(() => Object.values(tickets), [tickets]);

	const addEntity = useCallback(
		(entity) => {
			const ticketPrices = getTicketPrices(entity.id);
			const prices = prepTemplatePrices(ticketPrices);
			addTicket({ ...entity, isNew: true, prices });
		},
		[addTicket, getTicketPrices, prepTemplatePrices]
	);

	// reset state on mount
	useEffect(() => {
		reset();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<SimpleEntityList
			ContentRenderer={ContentRenderer}
			addEntity={addEntity}
			className='default-tickets'
			deleteEntity={deleteEntity}
			entities={entities}
			templates={templates as any}
			EntityRenderer={TicketCard}
		/>
	);
};

export default ModalBody;
