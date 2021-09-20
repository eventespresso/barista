import { useCallback, useEffect, useMemo } from 'react';

import { SimpleEntityList, DebugInfo } from '@eventespresso/ui-components';
import { useTickets, useTicketPrices } from '@eventespresso/edtr-services';
import { usePrepTemplatePrices } from '@eventespresso/tpc';

import { DefaultTicket, useDataState } from './data';
import TicketCard from './TicketCard';
import { ContentRenderer } from './multiStep';

import './styles.scss';

const ModalBody: React.FC = () => {
	const { addTicket, tickets, deleteTicket, reset, getData } = useDataState();
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
			addTicket({
				...entity,
				isNew: true,
				dbId: 0,
				prices,
				/**
				 * Ensure that ticket is not trashed,
				 * as it's possible that a trashed ticket is used as a template
				 *
				 * @see https://github.com/eventespresso/barista/issues/1013
				 */
				isTrashed: false,
			});
		},
		[addTicket, getTicketPrices, prepTemplatePrices]
	);

	// reset state on mount
	useEffect(() => {
		reset();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<SimpleEntityList
				ContentRenderer={ContentRenderer}
				addEntity={addEntity}
				deleteEntity={deleteEntity}
				entities={entities}
				templates={templates as any}
				EntityRenderer={TicketCard}
			/>
			<DebugInfo data={getData()} />
		</>
	);
};

export default ModalBody;
