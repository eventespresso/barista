export class TemplatesManager {
	/**
	 * go to templates tab
	 */
	gotoTemplates = async (): Promise<void> => {
		const linkTemplates = await page.$(`.nav-tab-wrapper a:has-text("Templates")`);
		const hrefTemplates = await linkTemplates.getAttribute('href');
		await Promise.all([page.waitForNavigation(), page.goto(hrefTemplates)]);
	};

	/**
	 * Get selected status banner at templates section
	 */
	getSelectedStatusBanner = async ({ value = false, text = false }): Promise<string> => {
		// select the option for registration default status
		const wrapper = await page.$('select#display_status_banner_single option[selected="selected"]');

		// if value is equal to true return the value of selected option
		if (value) {
			return await wrapper.getAttribute('value');
		}
		// if text is equal to true return the innertext of selected option
		if (text) {
			return await wrapper.innerText();
		}
	};

	saveTemplatesChanges = async (): Promise<void> => {
		// save changes from templates tab
		await Promise.all([page.waitForNavigation(), page.click('#template_settings_save')]);
	};

	setAndSaveDisplayStatusBanner = async ({ value }: { value: string }): Promise<void> => {
		// set display status banner
		await page.selectOption('select#display_status_banner_single', { value });
		// save changes from templates tab
		await this.saveTemplatesChanges();
	};

	setAndSaveDisplayVenueDetails = async ({ value }: { value: string }): Promise<void> => {
		// set display status banner
		await page.selectOption('select#display_venue', { value });
		// save changes from templates tab
		await this.saveTemplatesChanges();
	};

	setCustomDisplayOrder = async ({ value }: { value: string }): Promise<void> => {
		// set display status banner
		await page.selectOption('select#EED_Events_Single_use_sortable_display_order', { value });
	};

	getEventSingleSortableAttribute = async (attribute: string): Promise<string> => {
		return await (await page.$('ul#event-single-sortable-js')).getAttribute(attribute);
	};

	/**
	 * Get base URL at templates tab event listing pages
	 */
	getBaseUrl = async (): Promise<string> => {
		return await (await page.$('.metabox-holder :nth-match(table, 2) tbody > tr:nth-child(2) td p')).innerText();
	};

	/**
	 * Get event slug at templates tab event listing pages
	 */
	getEventSlug = async (): Promise<string> => {
		return await (
			await page.$('.metabox-holder :nth-match(table, 2) tbody > tr:nth-child(2) td p #event_cpt_slug')
		).getAttribute('value');
	};

	/**
	 * Get event listing URL at templates tab event listing pages
	 */
	getEventListingUrl = async (): Promise<string> => {
		return await (await page.$('.metabox-holder :nth-match(table, 2) tbody > tr #event_listings_url')).innerText();
	};
}
