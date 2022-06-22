import { ElementHandle } from 'playwright-core';
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
	getSelectedStatusBanner = async ({ value = false, text = false, single = true }): Promise<string> => {
		// get selected option for status banner
		const selectID = single ? 'display_status_banner_single' : 'EED_Events_Archive_display_status_banner';
		const selector = `select#${selectID}`;

		let resultData: string;
		// if value is equal to true return the value of selected option
		if (value) {
			resultData = await page.$eval(selector, sel => sel['value']);
		}
		// if text is equal to true return the innertext of selected option
		if (text) {
			resultData = await page.$eval(selector, sel => sel["options"][sel["options"]["selectedIndex"]]["textContent"]); 
		}

		return resultData.trim();
	};

	/**
	 * Get selected display description at templates section
	 */
	getSelectedDisplayDescription = async (): Promise<string> => {
		// get selected option for display description
		const resultText = await page.$eval('select#EED_Events_Archive_display_description', sel => sel["options"][sel["options"]["selectedIndex"]]["textContent"]); 
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

	/**
	 * Set and save display venue details at templates archive section
	 */
	setAndSaveDisplayVenueDetails = async ({
		value,
		archive = false,
	}: {
		value: string;
		archive: boolean;
	}): Promise<void> => {
		// set display venue details at archive settings
		const selectID = archive ? 'EED_Events_Archive_display_venue' : 'display_venue';
		await page.selectOption(`select#${selectID}`, { value });
		// save changes from templates tab
		await this.saveTemplatesChanges();
	};

	/**
	 * get selected display venue details at templates archive section
	 */
	getSelectedDisplayVenueDetails = async ({ archive = false }: { archive: boolean }): Promise<string> => {
		// get selected option for display venue details
		const selectID = archive ? 'EED_Events_Archive_display_venue' : 'display_venue';
		const resultText = await (await page.$(`select#${selectID} option[selected="selected"]`)).innerText();

		return resultText.trim();
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

	/**
	 * set custom display order and get custom order classname value
	 */
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

	/**
	 * get selected custom display at templates tab
	 */
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

	gotoEventListing = async (): Promise<void> => {
		// Get event listing URL at templates tab event listing pages
		const getEventListingUrl = await this.getEventListingUrl();
		console.log(getEventListingUrl);
		// go to event listing url
		await page.goto(getEventListingUrl);
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
		return await this.getSelectedStatusBanner({ text: true, single });
	};

	/**
	 * this function is to set and save custom display order and return selected value and classname for custom order
	 */
	processToSetCustomDisplayOrder = async ({ value, archive }: { value: string; archive: boolean }) => {
		const getClassName = await this.setCustomDisplayOrder({ value, archive });
		const getSelectedValue = await this.getSelectedCustomDisplayOrder({ archive });

		return { getClassName, getSelectedValue };
	};

	/**
	 * set and save for display datetimes at archive template settings
	 */
	setAndSaveDisplayDatetimes = async ({ value }: { value: string }): Promise<void> => {
		// set display datetimes
		await page.selectOption('select#EED_Events_Archive_display_datetimes', { value });
		// save changes from templates tab
		await this.saveTemplatesChanges();
	};

	/**
	 * get selected value for display datetimes at archive template settings
	 */
	getSelectedDisplayDatetimes = async (): Promise<string> => {
		// get selected option for display datetimes
		const resultText = await page.$eval('select#EED_Events_Archive_display_datetimes', sel => sel["options"][sel["options"]["selectedIndex"]]["textContent"]); 
		return resultText.trim();
	};

	/**
	 * set and save for display expired events at archive template settings
	 */
	setAndSaveDisplayExpiredEvents = async ({ value }: { value: string }): Promise<void> => {
		await this.gotoTemplates();
		// set display expired events at archive settings
		await page.selectOption('select#EED_Events_Archive_display_expired_events', { value });
		// save changes from templates tab
		await this.saveTemplatesChanges();
	};

	/**
	 * get selected value for display expired events at archive template settings
	 */
	getSelectedDisplayExpiredEvents = async (): Promise<string> => {
		// get selected option for display expired events
		const resultText = await page.$eval('select#EED_Events_Archive_display_expired_events', sel => sel["options"][sel["options"]["selectedIndex"]]["textContent"]); 
        return resultText.trim();
	};

	/**
	 * set and save for show ticket details at ticket selector template settings
	 */
	setAndSaveShowTicketDetails = async ({ value }: { value: string }): Promise<void> => {
		await this.gotoTemplates();
		// set show ticket details at ticket selector settings
		await page.selectOption('select#ticket_selector_settings_tbl-show-ticket-details', { value });
		// save changes from templates tab
		await this.saveTemplatesChanges();
	};

	/**
	 * get selected value for show ticket details at ticket selector template settings
	 */
	getSelectedShowTicketDetails = async (): Promise<string> => {
		// get selected option for show ticket details
		const resultText = await (
			await page.$('select#ticket_selector_settings_tbl-show-ticket-details option[selected="selected"]')
		).innerText();

		return resultText.trim();
	};

	/**
	 * set and save for show ticket sale info at ticket selector template settings
	 */
	setAndSaveShowTicketSaleInfo = async ({ value }: { value: string }): Promise<void> => {
		await this.gotoTemplates();
		// set show ticket sale info at ticket selector settings
		await page.selectOption('select#ticket_selector_settings_tbl-show-ticket-sale-columns', { value });
		// save changes from templates tab
		await this.saveTemplatesChanges();
	};

	/**
	 * get selected value for show ticket sale info at ticket selector template settings
	 */
	getSelectedShowTicketSaleInfo = async (): Promise<string> => {
		// get selected option for show ticket sale info
		const resultText = await (
			await page.$('select#ticket_selector_settings_tbl-show-ticket-sale-columns option[selected="selected"]')
		).innerText();

		return resultText.trim();
	};

	/**
	 * get sold label at event listing page
	 */
	getSoldLabel = async (): Promise<ElementHandle<SVGElement | HTMLElement>> => {
		return await page?.$('.tckt-slctr-tkt-details-this-ticket-sold-th span');
	};

	/**
	 * show ticket info at event listing page
	 */
	showTicketDetails = async (): Promise<void> => {
		await page.$eval('.event-tickets .tckt-slctr-tbl-tr > td', (el: any) => el.click('a.display-the-hidden'));
	};

	/**
	 * set and save for show expired tickets at ticket selector template settings
	 */
	setAndSaveShowExpiredTickets = async ({ value }: { value: string }): Promise<void> => {
		await this.gotoTemplates();
		// set show expired ticket at ticket selector settings
		await page.selectOption('select#ticket_selector_settings_tbl-show-expired-tickets', { value });
		// save changes from templates tab
		await this.saveTemplatesChanges();
	};

	/**
	 * get selected value for show expired tickets at ticket selector template settings
	 */
	getSelectedShowExpiredTickets = async (): Promise<string> => {
		// get selected option for show expired ticket
		const resultText = await (
			await page.$('select#ticket_selector_settings_tbl-show-expired-tickets option[selected="selected"]')
		).innerText();

		return resultText.trim();
	};

	/**
	 * set and save for show date & time filter at ticket selector template settings
	 */
	setAndSaveShowDateAndTimeFilter = async ({ value }: { value: string }): Promise<void> => {
		await this.gotoTemplates();
		// set show expired ticket at ticket selector settings
		await page.selectOption('select#ticket_selector_settings_tbl-show-datetime-selector', { value });
		// save changes from templates tab
		await this.saveTemplatesChanges();
	};

	/**
	 * get selected value for show date & time filter  at ticket selector template settings
	 */
	getSelectedShowDateAndTimeFilter = async (): Promise<string> => {
		// get selected option for show expired ticket
		const resultText = await page.$eval('select#ticket_selector_settings_tbl-show-datetime-selector', sel => sel["options"][sel["options"]["selectedIndex"]]["textContent"]); 
		return resultText.trim();
	};

	/**
	 * set and save for date & time filter threshold at ticket selector template settings
	 */
	setAndSaveDateAndTimeFilterThreshold = async ({ value }: { value: string }): Promise<void> => {
		await this.gotoTemplates();
		// set show expired ticket at ticket selector settings
		await page.selectOption('select#ticket_selector_settings_tbl-datetime-selector-threshold', { value });
		// save changes from templates tab
		await this.saveTemplatesChanges();
	};

	/**
	 * get selected value for date & time filter threshold at ticket selector template settings
	 */
	getSelectedDateAndTimeFilterThreshold = async (): Promise<string> => {
		const resultText = await page.$eval('select#ticket_selector_settings_tbl-datetime-selector-threshold', sel => sel['value']);
		return resultText.trim();
	};

	/**
	 * set and save for reset event list settings at archive
	 */
	setAndSaveResetEventListSettings = async ({ value }: { value: string }): Promise<void> => {
		await this.gotoTemplates();
		// set reset event list settings at ticket selector settings
		await page.selectOption('select#EED_Events_Archive_reset_event_list_settings', { value });
		// save changes from templates tab
		await this.saveTemplatesChanges();
	};

	/**
	 * get selected value for reset event list settings at archive
	 */
	getSelectedResetEventListSettings = async (): Promise<string> => {
		// get selected option for reset event list settings
		const resultText = await (
			await page.$('select#EED_Events_Archive_reset_event_list_settings option[selected="selected"]')
		).innerText();

		return resultText.trim();
	};

	/**
	 * set and save for date and time filter max checcked at ticket selector
	 */
	setAndSaveDateAndTimeMax = async ({ value }: { value: string }): Promise<void> => {
		await this.gotoTemplates();
		// set reset event list settings at ticket selector settings
		await page.fill('#ticket_selector_settings_tbl-datetime-selector-max-checked', value);
		// save changes from templates tab
		await this.saveTemplatesChanges();
	};

	/**
	 * get selected value for date and time filter max checcked at ticket selector
	 */
	getSelectedDateAndTimeMax = async (): Promise<string> => {
		// get selected option for date and time filter max checcked
		const resultText = await (
			await page.$('#ticket_selector_settings_tbl-datetime-selector-max-checked')
		).getAttribute('value');

		return resultText.trim();
	};
}
