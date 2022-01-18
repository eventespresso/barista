import { WPListTable } from '../../WPListTable';

type StatusBannerArgs = {
	status?: string;
	single?: boolean;
};
export class TemplatesManager extends WPListTable {
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
		// get selected option for status banner
		const wrapper = await page.$('select#display_status_banner_single option[selected="selected"]');
		let resultData: string;
		// if value is equal to true return the value of selected option
		if (value) {
			resultData = await wrapper.getAttribute('value');
		}
		// if text is equal to true return the innertext of selected option
		if (text) {
			resultData = await wrapper.innerText();
		}

		return resultData.trim();
	};

	/**
	 * Get selected display description at templates section
	 */
	getSelectedDisplayDescription = async (): Promise<string> => {
		// get selected option for display description
		const resultText = await (
			await page.$('select#EED_Events_Archive_display_description option[selected="selected"]')
		).innerText();

		return resultText.trim();
	};

	saveTemplatesChanges = async (): Promise<void> => {
		// save changes from templates tab
		await Promise.all([page.waitForNavigation(), page.click('#template_settings_save')]);
	};

	setAndSaveDisplayStatusBanner = async ({ status, single = true }: StatusBannerArgs): Promise<void> => {
		if (single) {
			// set display status banner at single settings
			await page.selectOption('select#display_status_banner_single', { value: status });
		} else {
			// set display status banner at archive settings
			await page.selectOption('select#EED_Events_Archive_display_status_banner', { value: status });
		}
		// save changes from templates tab
		await this.saveTemplatesChanges();
	};

	setAndSaveDisplayDescription = async ({ status }: { status: string }): Promise<void> => {
		await page.selectOption('select#EED_Events_Archive_display_description', { value: status });
		// save changes from templates tab
		await this.saveTemplatesChanges();
	};

	setAndSaveDisplayVenueDetails = async ({ value }: { value: string }): Promise<void> => {
		// set display venue details at archive settings
		await page.selectOption('select#display_venue', { value });
		// save changes from templates tab
		await this.saveTemplatesChanges();
	};

	/**
	 * Get selected display ticket selector at templates archive section
	 */
	getSelectedDisplayTicketSelector = async (): Promise<string> => {
		// get selected option for display description
		const resultText = await (
			await page.$('select#EED_Events_Archive_display_ticket_selector option[selected="selected"]')
		).innerText();

		return resultText.trim();
	};

	/**
	 * set and save display ticket selector at template archive section
	 */
	setAndSaveDisplayTicketSelector = async ({ value }: { value: string }): Promise<void> => {
		// set display ticket selector at archive settings
		await page.selectOption('select#EED_Events_Archive_display_ticket_selector', { value });
		// save changes from templates tab
		await this.saveTemplatesChanges();
	};

	// set custom display order and get custom order classname value
	setCustomDisplayOrder = async ({ value, archive }: { value: string; archive: boolean }): Promise<string> => {
		// set custom display order
		const selectID = archive
			? 'EED_Events_Archive_use_sortable_display_order'
			: 'EED_Events_Single_use_sortable_display_order';
		await page.selectOption(`select#${selectID}`, { value });

		await this.saveTemplatesChanges();
		// get event sortable attribute classname value
		return await this.getEventSingleSortableAttribute({
			attribute: 'class',
			archive,
		});
	};

	getSelectedCustomDisplayOrder = async ({ archive }: { archive?: boolean }): Promise<string> => {
		const selectID = archive
			? 'EED_Events_Archive_use_sortable_display_order'
			: 'EED_Events_Single_use_sortable_display_order';
		const resultText = await (await page.$(`select#${selectID} option[selected="selected"]`)).innerText();

		return resultText.trim();
	};

	getEventSingleSortableAttribute = async ({
		attribute,
		archive,
	}: {
		attribute: string;
		archive: boolean;
	}): Promise<string> => {
		const selectID = archive ? 'event-archive-sortable-js' : 'event-single-sortable-js';

		return await (await page.$(`ul#${selectID}`)).getAttribute(attribute);
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

	setEventSlug = async (slug: string): Promise<void> => {
		await page.fill('#event_cpt_slug', slug);
	};

	/**
	 * first set/select value at display status banner and save then return the innertext value selected
	 */
	setAndGetValueForDisplayStatusBanner = async ({ status, single = true }: StatusBannerArgs): Promise<string> => {
		// set display status banner to yes
		await this.setAndSaveDisplayStatusBanner({ status, single });
		// get selected display status banner value
		return await this.getSelectedStatusBanner({ text: true });
	};

	/**
	 * this function is to set and save custom display order and return selected value and classname for custom order
	 */
	processToSetCustomDisplayOrder = async ({ value, archive }: { value: string; archive: boolean }) => {
		const getClassName = await this.setCustomDisplayOrder({ value, archive });
		const getSelectedValue = await this.getSelectedCustomDisplayOrder({ archive });

		return { getClassName, getSelectedValue };
	};

	setAndSaveDisplayDatetimes = async ({ value }: { value: string }): Promise<void> => {
		// set display datetimes
		await page.selectOption('select#EED_Events_Archive_display_datetimes', { value });
		// save changes from templates tab
		await this.saveTemplatesChanges();
	};

	getSelectedDisplayDatetimes = async (): Promise<string> => {
		// get selected option for display datetimes
		const resultText = await (
			await page.$('select#EED_Events_Archive_display_datetimes option[selected="selected"]')
		).innerText();

		return resultText.trim();
	};
}
