import {
	fillEventFields as fillVenueFields,
	Args,
	WPListTable,
	EDTRGlider,
	createNewEvent as createVenue,
} from '@e2eUtils/admin';

const edtrGlider = new EDTRGlider();

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
	saveVenue = async (save = true) => {
		if (save) {
			await Promise.all([page.waitForNavigation(), page.click('#postbox-container-1 #publish')]);
			// await page.waitForSelector(ticketsListSelector);
		}
	};

	/**
	 * create new venue
	 */
	createNewVenue = async ({ title, description, shouldPublish = true }: Args = {}): Promise<void> => {
		// // trigger add new venue
		await this.triggerAddNewVenue();
		//  fill in venue fields
		await fillVenueFields({ title, description });
		// await createVenue({ title, description });
		// await page.fill('#titlewrap #title', title || '');

		// // fill in event description
		// if (description) {
		// 	await page.click('#content-html');
		// 	await page.fill('#wp-content-editor-container textarea.wp-editor-area', description);
		// }
		// // save venue
		await Promise.all([page.waitForNavigation(), page.click('#publish')]);
		// await this.saveVenue(shouldPublish);
		// await edtrGlider.saveEvent(true);
		await page.waitForSelector('#poststuff');
	};
}
