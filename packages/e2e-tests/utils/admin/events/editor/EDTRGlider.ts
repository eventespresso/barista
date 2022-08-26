import type { ElementHandle } from 'playwright-core';
import { DO_NOT_USE_BARISTA_STRUCTURE } from '../../../../utils/dev/config';

const ticketsListSelector = '#ee-entity-list-tickets .ee-entity-list__card-view';

/**
 * Helper class to deal with EDTR.
 */
export class EDTRGlider {
	/**
	 * Returns event edit URL, inside EDTR
	 */
	getEventEditUrl = async () => {
		const url = await page.$eval('#wp-admin-bar-espresso-toolbar-events-edit a', el => el["href"]);
		return url;
	};

	/**
	 * Returns the permalink of the event, inside EDTR
	 */
	getEventPermalink = async () => {
		// It is assumed to have plain permalink structure for the site
		// For pretty permalinks, the selector will become "#edit-slug-box #sample-permalink a"

		let selector = '#edit-slug-box #sample-permalink a';

		const checkTagExists = await page.$eval(selector, () => true).catch(() => false)
		
		if(!checkTagExists){
			selector = '#edit-slug-box #sample-permalink';
		}

		const url = await page.$eval(selector, el => el["href"]);
		return url
	};

	/**
	 * Sets the maximum registrations value.
	 */
	setMaxRegistrations = async (value: number, updateEvent = true) => {
		if(DO_NOT_USE_BARISTA_STRUCTURE){
			await page.fill('#max-registrants', String(value));
		}else{
			await page.click('div.ee-edtr-option__max-reg span.ee-tabbable-text__inner_wrapper');
			await page.click('div.ee-edtr-option__max-reg input');
			await page.fill('div.ee-edtr-option__max-reg input', String(value));
		}

		await this.saveEvent(updateEvent);
	};

	/**
	 * Updates the event by clicking the Publish/update button
	 */
	saveEvent = async (save = true) => {
		if (save) {
			await Promise.all([page.waitForNavigation(), page.click('#publish')]);
			await this.waitForEdtr2Load();
		}
	};

	/**
	 * Enable/Disable questions for registrants
	 */
	questionsForRegistrant = async (
		registrants: 'primary' | 'additional' = 'primary',
		{ personalInfo = false, address = false } = {},
		updateEvent = true
	) => {
		const selector = `#espresso_events_Registration_Form_Hooks_Extend_${registrants}_questions_metabox`;

		const metabox = await page.$(selector);

		if (personalInfo) {
			await metabox.$eval('text=Personal Information', (e) => e.closest('p').querySelector('input').click());
		}
		if (address) {
			await metabox.$eval('text=Address Information', (e) => e.closest('p').querySelector('input').click());
		}

		await this.saveEvent(updateEvent);
	};

	/**
	 * Wait for EDTR to load.
	 */
	waitForEdtr2Load = async () => {
		// Wait for tickets list lazy load
		await page.waitForSelector(ticketsListSelector);
	};

	/**
	 * count ticket of an events at EDTR section
	 */
	countTickets = async (): Promise<number> => {
		const countTickets = await page?.$$(
			'#ee-entity-list-tickets .ee-entity-list__card-view > .ee-entity-paper-frame-wrapper'
		);
		return countTickets.length;
	};

	/**
	 * get ticket rows of an events at EDTR section
	 */
	ticketRows = async (): Promise<ElementHandle<SVGElement | HTMLElement>[]> => {
		return await page?.$$('#ee-entity-list-tickets .ee-entity-list__card-view > .ee-entity-list-item');
	};

	/**
	 * count event dates at EDTR section
	 */
	countEventDates = async (): Promise<number> => {
		const countEventDates = await page?.$$('#ee-entity-list-datetimes .ee-entity-list-item');
		return countEventDates.length;
	};

	/**
	 * Remove event dates filter to show also some expired tickets
	 */
	removeEventTicketDatesFilter = async () => {
		await page?.click('#ee-entity-list-tickets button.ee-filter-tag__close-btn');
	};

	/**
	 * Remove event dates filter to show also some expired event dates
	 */
	removeEventDatesFilter = async () => {
		await page?.click('button.ee-filter-tag__close-btn');
	};

	/**
	 * Trigger main menu for specific ticket
	 */
	ticketMainMenu = async (row: number) => {
		await page.click(
			`#ee-entity-list-tickets .ee-entity-list__card-view > .ee-entity-list-item:nth-child(${row}) [aria-label="ticket main menu"]`
		);
	};
}
