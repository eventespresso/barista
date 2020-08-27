/**
 * This file registers the UI elements related to datetime UI via registry package
 */
import React from 'react';

import {
	EntityActionsSubscription,
	EntityActionsSubscriptionCb,
	ModalSubscription,
	NewEntitySubscription,
	FilterBarUISubscription,
	FilterBarUISubscriptionCb,
} from '@eventespresso/registry';
import { domain, EdtrGlobalModals, Datetime, DatetimesFilterStateManager } from '@eventespresso/edtr-services';

import {
	DisplayStartOrEndDateControl,
	SalesControl,
	SortByControl,
	StatusControl,
} from '@edtrUI/datetimes/datesList/filterBar/controls';
import { NewDatePopover, AddSingleDate } from '@edtrUI/datetimes/datesList/newDateOptions';
import { Container as EditDateContainer } from '@edtrUI/datetimes/dateForm/multiStep';
import { DateMainMenu } from '@edtrUI/datetimes/datesList/actionsMenu/dropdown';
import AssignTicketsButton from '@edtrUI/datetimes/datesList/actionsMenu/AssignTicketsButton';

// Register date modal containers
const modals = new ModalSubscription(domain);
modals.subscribe(({ registry: { registerContainer } }) => {
	// Register new date popover
	registerContainer(EdtrGlobalModals.NEW_DATE_POPOVER, NewDatePopover);
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

// Register new date option(s)
const newEntityOptions = new NewEntitySubscription(domain);
newEntityOptions.subscribe(
	({ entityType, registry }) => {
		// although this is not needed
		if (entityType !== 'datetime') {
			return;
		}

		const { registerElement: registerOptionItem } = registry;

		registerOptionItem('AddSingleDate', ({ totalCount }) => {
			return <AddSingleDate isOnlyButton={totalCount === 1} />;
		});
	},
	{ entityType: 'datetime' }
);

// Register datetime filterbar elements
const filterBar = new FilterBarUISubscription(domain);
type DatesListFilterBarCallback = FilterBarUISubscriptionCb<DatetimesFilterStateManager, 'dates-list'>;
const datesListFilterBar: DatesListFilterBarCallback = ({ listId, registry }) => {
	// although this is not needed
	if (listId !== 'dates-list') {
		return;
	}
	const { registerElement: registerFilterBarItem } = registry;

	registerFilterBarItem('status', () => {
		return (
			<div className='ee-filter-bar__filter'>
				<StatusControl />
			</div>
		);
	});

	registerFilterBarItem('sales', () => {
		return (
			<div className='ee-filter-bar__filter'>
				<SalesControl />
			</div>
		);
	});

	registerFilterBarItem('displayStartOrEndDate', () => {
		return (
			<div className='ee-filter-bar__filter'>
				<DisplayStartOrEndDateControl />
			</div>
		);
	});

	registerFilterBarItem('sortBy', () => {
		return (
			<div className='ee-filter-bar__filter'>
				<SortByControl />
			</div>
		);
	});
};
filterBar.subscribe(datesListFilterBar, { listId: 'dates-list' });
