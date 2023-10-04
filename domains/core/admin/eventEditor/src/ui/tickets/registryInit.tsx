/**
 * This file registers the UI elements related to ticket UI via registry package
 */
import {
	EntityActionsSubscription,
	EntityActionsSubscriptionCb,
	ModalSubscription,
	NewEntitySubscription,
	FilterBarUISubscription,
	FilterBarUISubscriptionCb,
} from '@eventespresso/registry';
import { domain, EdtrGlobalModals, Ticket, TicketsFilterStateManager, ticketsList } from '@eventespresso/edtr-services';
import { TicketPriceCalculatorButton, ModalContainer as TPCModalContainer } from '@eventespresso/tpc';
import { FilterBarFilter } from '@eventespresso/ui-components';

import {
	DisplayStartOrEndDateControl,
	SalesControl,
	SortByControl,
	StatusControl,
	IsChainedButton,
} from '@edtrUI/tickets/ticketsList/filterBar/controls';
import { TicketMainMenu } from '@edtrUI/tickets/ticketsList/actionsMenu/dropdown';
import { Container as EditTicketContainer } from '@edtrUI/tickets/ticketForm/multiStep';
import DefaultTicketContainer from '@edtrUI/tickets/defaultTickets/Container';
import AssignDatesButton from '@edtrUI/tickets/ticketsList/actionsMenu/AssignDatesButton';
import { AddSingleTicket } from '@edtrUI/tickets/ticketsList/newTicketOptions';

// Register ticket modal containers
const modals = new ModalSubscription(domain);
modals.subscribe(({ registry: { registerContainer } }) => {
	// Register edit ticket modal
	registerContainer(EdtrGlobalModals.EDIT_TICKET, EditTicketContainer);
	// Register default tickets modal
	registerContainer(EdtrGlobalModals.DEFAULT_TICKETS, DefaultTicketContainer);
	// Register TPC modal
	registerContainer(EdtrGlobalModals.TPC, TPCModalContainer);
});

// Register ticket actions menu items.
const entityActions = new EntityActionsSubscription(domain);
const ticketsActionHandler: EntityActionsSubscriptionCb<Ticket, 'ticket'> = ({ entity: ticket, registry }) => {
	const { registerElement: registerMenuItem } = registry;

	registerMenuItem('ticketMainMenu', () => <TicketMainMenu ticket={ticket} />);

	registerMenuItem('assignDates', () => <AssignDatesButton entity={ticket} />);

	registerMenuItem('ticketPriceCalculator', () => <TicketPriceCalculatorButton ticketId={ticket.id} />);
};
entityActions.subscribe(ticketsActionHandler, { entityType: 'ticket' });

// Register new ticket option(s)
const newEntityOptions = new NewEntitySubscription(domain);
newEntityOptions.subscribe(
	({ registry }) => {
		const { registerElement: registerOptionItem } = registry;

		registerOptionItem('AddSingleTicket', ({ totalCount }) => {
			return <AddSingleTicket isOnlyButton={totalCount === 1} />;
		});
	},
	{ entityType: 'ticket' }
);

// Register ticket filterBar elements
const filterBar = new FilterBarUISubscription(domain);
type TicketsListFilterBarCallback = FilterBarUISubscriptionCb<TicketsFilterStateManager, typeof ticketsList>;
const ticketsListFilterBar: TicketsListFilterBarCallback = ({ listId, registry }) => {
	// although this is not needed
	if (listId !== ticketsList) {
		return;
	}
	const { registerElement: registerFilterBarItem } = registry;

	registerFilterBarItem('status', () => {
		return (
			<FilterBarFilter>
				<StatusControl />
			</FilterBarFilter>
		);
	});

	registerFilterBarItem('isChained', () => {
		return (
			<FilterBarFilter className='ee-filter-bar__chain' width='micro'>
				<IsChainedButton />
			</FilterBarFilter>
		);
	});

	registerFilterBarItem('sales', () => {
		return (
			<FilterBarFilter>
				<SalesControl />
			</FilterBarFilter>
		);
	});

	registerFilterBarItem('displayStartOrEndDate', () => {
		return (
			<FilterBarFilter>
				<DisplayStartOrEndDateControl />
			</FilterBarFilter>
		);
	});

	registerFilterBarItem('sortBy', () => {
		return (
			<FilterBarFilter width='big'>
				<SortByControl />
			</FilterBarFilter>
		);
	});
};
filterBar.subscribe(ticketsListFilterBar, { listId: ticketsList });
