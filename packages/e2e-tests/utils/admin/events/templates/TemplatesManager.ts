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

	/**
	 * select display status banner
	 */
	selectStatusBanner = async ({ value }: { value: string }): Promise<void> => {
		// set display status banner
		await page.selectOption('select#display_status_banner_single', { value });
		// save changes from templates tab
		await Promise.all([page.waitForNavigation(), page.click('#template_settings_save')]);
	};

	/**
	 * get banner innertext
	 */
	getBannerInnerText = async (): Promise<string> => {
		return await (await page.$('span.ee-status')).innerText();
	};
}
