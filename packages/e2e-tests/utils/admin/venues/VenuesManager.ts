import { fillEventFields as fillVenueFields, Args, WPListTable } from '@e2eUtils/admin';
export class VenuesManager extends WPListTable {
	/**
	 * get total page for pagination
	 */
	getTotalPagePagination = async () => {
		// get how many set of page in pagination
		const totalPages = await (await page.$('span.total-pages')).innerText();

		return Number(totalPages);
	};

	/**
	 * trigger add new venue
	 */
	triggerAddNewVenue = async (): Promise<void> => {
		await Promise.all([page.waitForNavigation(), page.click('#add-new-venue')]);
	};

	/**
	 * Updates the venue by clicking the publish button
	 */
	saveVenue = async () => {
		await Promise.all([page.waitForNavigation(), page.click('#postbox-container-1 #publish')]);
	};

	/**
	 * create new venue
	 */
	createNewVenue = async ({ title, description }: Args = {}): Promise<void> => {
		// // trigger add new venue
		await this.triggerAddNewVenue();
		//  fill in venue fields
		await fillVenueFields({ title, description });
		// save venue
		await this.saveVenue();
		// wait to load venue content
		await page.waitForSelector('#poststuff');
	};

	/**
	 * create new venue
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

	/**
	 * Set and select venue
	 */
	setAndSelectVenue = async (title: string): Promise<void> => {
		await page.selectOption('select.ee-event-venue', { label: title });
	};
}
