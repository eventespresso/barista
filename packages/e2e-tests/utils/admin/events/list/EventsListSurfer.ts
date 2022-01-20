import { ucFirst } from '@eventespresso/utils';
import { WPListTable, BulkActionsPosition } from '../../WPListTable';
import { ElementHandle } from '../../../../types';
import { Goto } from '@e2eUtils/admin';

export class EventsListSurfer extends WPListTable {
	/**
	 * Resets the list filters
	 */
	resetFilters = async (position?: BulkActionsPosition): Promise<void> => {
		const nav = await this.getTableNavWrapper(position);

		const resetLink = await nav.$('text="Reset Filters"');

		// hit the reset filters button and wait for the page load
		await Promise.all([page.waitForNavigation(), resetLink.click()]);
	};

	/**
	 * Get the name of an event from <tr /> handle
	 */
	getEventName = async (item: ElementHandle): Promise<string> => {
		return await (await item.$('td.column-name a.row-title')).innerText();
	};

	/**
	 * Get the status of an event from <tr /> handle
	 */
	getEventStatus = async (item: ElementHandle): Promise<string> => {
		return await (await item.$('td.column-name .ee-status-text-small')).innerText();
	};

	/**
	 *  Get the list of event rows filtered by event details
	 */
	getRowsByDetails = async ({
		eventDetails,
		isStatus = false,
	}: {
		eventDetails: string;
		isStatus?: boolean;
	}): Promise<ElementHandle[]> => {
		// get list item in link action
		const tableRows = await this.getListItems();
		// filter list items by event details
		const filteredRows = (
			await Promise.all(
				tableRows.map(async (row) => {
					let eventData: string;
					if (isStatus) {
						// action to filter list item by event status
						eventData = await this.getEventStatus(row);
					} else {
						// action to filter list item by event name
						eventData = await this.getEventName(row);
					}

					return eventData === eventDetails ? row : null;
				})
			)
		).filter(Boolean);

		return filteredRows;
	};

	/**
	 *  Get the list of event rows filtered by status
	 */
	getRowsByStatus = async (status: string): Promise<ElementHandle[]> => {
		const tableRows = await this.getListItems();
		const filteredRows = (
			await Promise.all(
				tableRows.map(async (row) => {
					const title = await this.getEventStatus(row);
					return title === status ? row : null;
				})
			)
		).filter(Boolean);

		return filteredRows;
	};

	/**
	 *  Delete seleted rows in event list that contain example "Test One"
	 */
	selectEventToTrash = async (name: string): Promise<void> => {
		// get only rows that is contain i.e "Test One" event name
		const filteredRows = await this.getRowsByDetails({ eventDetails: name });
		// check all the checkbox that the name contain i.e. 'Test One' event
		for (const item of filteredRows) {
			await this.selectItemCheckbox(item);
		}

		// trash all selected events
		await this.trashSelected();
	};

	/**
	 * remove all events from test data that has status like "ACTIVE" or "EXPIRED" etc.
	 */
	filterOutEventsWithStatus = async (status: string) => {
		// go to view all event
		await this.goToView('View All Events');
		// select all events base on status
		const filteredRows = await this.getRowsByDetails({ eventDetails: ucFirst(status), isStatus: true });
		// check all specific event base on status
		for (const item of filteredRows) {
			await this.selectItemCheckbox(item);
		}
	};

	/**
	 * get default per page for pagination
	 */
	getDefaultPerPage = async (): Promise<number> => {
		// click screen option to get the pagination set
		await page.click('#show-settings-link');
		// get the default per page
		const paginationEvents = await (await page.$('#espresso_events_default_per_page')).getAttribute('value');
		// get how many set of page in pagination

		return Number(paginationEvents);
	};

	/**
	 * get total page for pagination
	 */
	getTotalPagePagination = async () => {
		// get how many set of page in pagination
		const totalPages = await (await page.$('span.total-pages')).innerText();

		return Number(totalPages);
	};

	/**
	 * delete all events by pagination
	 */
	detleteAllEvents = async (totalPages: number) => {
		// loop the pagination per page
		for (let pages = 1; pages < totalPages; pages++) {
			// trash all selected events
			await this.trashAll();
		}
	};

	/**
	 * delete all events by link per paginate
	 */
	deleteAllEventsByLink = async (linkname: string) => {
		await Goto.eventsListPage();

		// go to view all event
		await this.goToViewAndCount(linkname);
		const totalPage = await this.getTotalPagePagination();
		// trash all event by link
		await this.detleteAllEvents(totalPage);
		await this.trashAll();
	};

	/**
	 * trigger confirm delete permanently
	 */
	confirmAllDeletePermanently = async () => {
		// check the confirmation checkbox for delete permanently
		await this.checkConfirmDeletePermanently();
		// click the confirm button to delete event/s permanently
		await Promise.all([page.waitForLoadState(), page.click('text="Confirm"')]);
		// go back to event page
		await Goto.eventsListPage();
	};

	/**
	 * fetch events ID's
	 */
	getEventID = async (tableRows: ElementHandle[]): Promise<string[]> => {
		return await Promise.all(
			tableRows.map(async (row) => {
				// get event id value
				return await (await row.$('th.check-column .ee-event-list-bulk-select-event')).getAttribute('value');
			})
		);
	};

	/**
	 * check all events to delete permanently
	 */
	checkEventToDeletePermanently = async (rows: string[]) => {
		for (const eventId of rows) {
			// check event to delete permanently
			await page.check(
				`#eventespressoadmin-pageseventsform-sectionsconfirmeventdeletionform-events-${eventId}-yes-lbl`
			);
		}
	};

	/**
	 * remove all events from trash permanently
	 */
	deleteAllPermanentlyFromTrash = async () => {
		await Goto.eventsListPage();
		await this.goToView('Trash');
		const totalPage = await this.getTotalPagePagination();
		// loop the pagination per page
		for (let pages = 0; pages < totalPage; pages++) {
			await this.goToView('Trash');
			// fetch all events from trash
			const tableRows = await this.getListItems();
			// get IDs by its event
			const filteredRows = await this.getEventID(tableRows);
			// checl all events from trash
			await this.selectAll();
			// trigger delete permanently from bulk
			await this.selectDeletePermanently();
			// select all the event checkbox to delete permanently
			await this.checkEventToDeletePermanently(filteredRows);
			// confirmation for delete permanently
			await this.confirmAllDeletePermanently();
		}
	};

	/**
	 * Trigger add new ticket button
	 */
	clickAddNewTicket = async (): Promise<void> => {
		await page.click(
			'#ee-event-editor .ee-entity-list__footer button[type="button"] span:has-text("Add New Ticket")'
		);
	};

	/**
	 * Create sample event ticket
	 */
	createTicketEvent = async ({ name, description }: { name: string; description: string }): Promise<void> => {
		// Click name field to active
		await page.click('input[name="name"]');
		// Fill in name ticket field
		await page.fill('input[name="name"]', name);
		// Fill in ticket description
		await page.fill('.public-DraftEditor-content', description);
		// Click skip prices
		await page.click('.ee-modal__footer span:has-text("Skip prices - assign dates")');
		// Click ticket assignment button
		await page.click('#ee-ticket-assignments-manager-table-data-cell-row-0-col-1 button');
		// Save new ticket
		await page.click('button[type="submit"]');
	};

	/**
	 * Remove all event from link actions (View all events, Draft, Trash)
	 */
	cleanUpEvents = async (): Promise<void> => {
		await this.deleteAllEventsByLink('View All Events');
		await this.deleteAllEventsByLink('Draft');
		await this.deleteAllPermanentlyFromTrash();
	};

	setAndSaveEventDates = async ({
		startDate,
		endDate,
		shouldPublish = true,
	}: {
		startDate?: string;
		endDate?: string;
		shouldPublish?: boolean;
	} = {}): Promise<void> => {
		await page.click('button#popover-trigger-7');
		await page.fill('.date-range-picker__start-input input', startDate);
		await page.fill('.date-range-picker__end-input input', endDate);
		await page.click('.ee-date-time-range-picker > button');
		if (shouldPublish) {
			await Promise.all([page.waitForNavigation(), page.click('input#publish')]);
		}
	};

	removeEventDatesFilter = async () => {
		await page?.click('button.ee-filter-tag__close-btn');
	};
}
