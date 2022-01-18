import {
	fillEventFields as fillVenueFields,
	Args,
	WPListTable,
	Goto,
	createNewEvent,
	EDTRGlider,
} from '@e2eUtils/admin';
import { ElementHandle } from 'packages/e2e-tests/types';

const edtrGlider = new EDTRGlider();

interface ArgsVenue extends Args {
	venueTitle: string;
}
export class VenuesManager extends WPListTable {
	getTotalPagePagination = async () => {
		// get how many set of page in pagination
		const totalPages = await (await page.$('span.total-pages')).innerText();

		return Number(totalPages);
	};

	triggerAddNewVenue = async (): Promise<void> => {
		await Promise.all([page.waitForNavigation(), page.click('#add-new-venue')]);
	};

	/**
	 * Get the name of an venue from <tr /> handle
	 */
	getVenueName = async (item: ElementHandle): Promise<string> => {
		return await (await item.$('td.column-name a.row-title')).innerText();
	};

	/**
	 * Updates the venue by clicking the publish button
	 */
	saveVenue = async () => {
		await Promise.all([page.waitForNavigation(), page.click('#postbox-container-1 #publish')]);
	};

	createNewVenue = async ({ title, description }: Args = {}): Promise<number> => {
		try {
			await this.triggerAddNewVenue();
			await fillVenueFields({ title, description });
			await this.saveVenue();
			// wait to load venue content
			await page.waitForSelector('#poststuff');
			return 1;
		} catch (e) {
			return 0;
		}
	};

	/**
	 * Delete all venue from view all venues link
	 */
	deleteAllVenue = async (): Promise<void> => {
		// Trash all the items in the list
		await this.trashAll();
		//  Goto a specific view
		await this.goToView('Trash');
		// Select all the items in the list
		await this.selectAll();
		// Select a given value in the bulk actions dropdown.
		await this.selectBulkAction({ label: 'Delete' });
		//Applies the bulk actions
		await this.applyBulkAction();
	};

	setAndSelectVenue = async (title: string): Promise<void> => {
		await page.selectOption('select.ee-event-venue', { label: title });
	};

	// this function is to delete all venues first then create one and return the before and after count venue
	processToCreateNewVenue = async ({ title, description }: Args = {}): Promise<{
		countAfterCreate: number;
		countBeforeCreate: number;
		addedVenue: number;
	}> => {
		await Goto.venuesPage();
		// create new venue
		await this.deleteAllVenue();
		// count venue before create one
		const countBeforeCreate = await this.getViewCount('View All Venues');
		// create new venue and count added venue
		const addedVenue = await this.createNewVenue({ title, description });
		// go to venue main page
		await Goto.venuesPage();
		// count venue after create one
		const countAfterCreate = await this.getViewCount('View All Venues');

		return { countAfterCreate, countBeforeCreate, addedVenue };
	};

	// this function is to create new event first then assign the venue that already created then return before and after count event
	processToAssignVenueAtEvent = async ({
		title,
		description,
		shouldPublish,
		venueTitle,
	}: ArgsVenue): Promise<{
		countAfterCreate: number;
		countBeforeCreate: number;
		addedEvent: number;
		getVenueTitle: string;
	}> => {
		await Goto.eventsListPage();
		let addedEvent: number = 0;
		//count event before create one
		const countBeforeCreate = await this.goToViewAndCount('View All Events');
		if (!countBeforeCreate) {
			// fill in event fields and not published yet until venue is not selected
			await createNewEvent({ title, description, shouldPublish });
			addedEvent = 1;
		} else {
			// get the first event
			const firstItem = await this.getFirstListItem();
			// go to view action to check the venue details
			const restoreLink = await this.getItemActionLinkByText(firstItem, 'Edit');
			await page.goto(restoreLink);
		}

		// set and select venue for event
		await this.setAndSelectVenue(venueTitle);
		// now save the new event
		await edtrGlider.saveEvent(true);

		// go to event main page
		await Goto.eventsListPage();
		//count event after created one
		const countAfterCreate = await this.goToViewAndCount('View All Events');
		// get the first event
		const firstItem = await this.getFirstListItem();
		// get venue title at first event list
		const getVenueTitle = await (await firstItem.$('.column-venue')).innerText();

		return { countAfterCreate, countBeforeCreate, addedEvent, getVenueTitle };
	};
}
