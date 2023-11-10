/**
 * This file registers the UI elements related to datetime UI via registry package
 */
import {
	EntityActionsSubscription,
	EntityActionsSubscriptionCb,
	ModalSubscription,
	FilterBarUISubscription,
	FilterBarUISubscriptionCb,
} from '@eventespresso/registry';
import {
	domain,
	EdtrGlobalModals,
	Datetime,
	DatetimesFilterStateManager,
	datesList,
	NewDateOption,
} from '@eventespresso/edtr-services';
import { EdtrSlots } from '@eventespresso/services';
import { FilterBarFilter } from '@eventespresso/ui-components';
import { registerPlugin } from '@eventespresso/plugins';

import {
	DisplayStartOrEndDateControl,
	SalesControl,
	SortByControl,
	StatusControl,
} from '@edtrUI/datetimes/datesList/filterBar/controls';
import { NewDateModal, AddSingleDate } from '@edtrUI/datetimes/datesList/newDateOptions';
import { Container as EditDateContainer } from '@edtrUI/datetimes/dateForm/multiStep';
import { DateMainMenu } from '@edtrUI/datetimes/datesList/actionsMenu/dropdown';
import AssignTicketsButton from '@edtrUI/datetimes/datesList/actionsMenu/AssignTicketsButton';

// Register date modal containers
const modals = new ModalSubscription(domain);
modals.subscribe(({ registry: { registerContainer } }) => {
	// Register new date popover
	registerContainer(EdtrGlobalModals.NEW_DATE, NewDateModal);
	// Register edit date modal
	registerContainer(EdtrGlobalModals.EDIT_DATE, EditDateContainer);
});

// Register datetime actions menu items.
const entityActions = new EntityActionsSubscription(domain);
const datesActionHandler: EntityActionsSubscriptionCb<Datetime, 'datetime'> = ({ entityType, entity, registry }) => {
	// although this is not needed
	if (entityType !== 'datetime') {
		return;
	}

	const { registerElement: registerMenuItem } = registry;

	registerMenuItem('dateMainMenu', () => <DateMainMenu datetime={entity} />);

	registerMenuItem('assignTickets', () => <AssignTicketsButton entity={entity} />);
};

entityActions.subscribe(datesActionHandler, { entityType: 'datetime' });

// Register datetime filterbar elements
const filterBar = new FilterBarUISubscription(domain);
type DatesListFilterBarCallback = FilterBarUISubscriptionCb<DatetimesFilterStateManager, typeof datesList>;
const datesListFilterBar: DatesListFilterBarCallback = ({ listId, registry }) => {
	// although this is not needed
	if (listId !== datesList) {
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

filterBar.subscribe(datesListFilterBar, { listId: datesList });

registerPlugin(EdtrSlots.ADD_SINGLE_DATE_OPTION, {
	render: () => (
		<NewDateOption>
			{({ count }) => {
				return <AddSingleDate isOnlyButton={count === 1} />;
			}}
		</NewDateOption>
	),
});
