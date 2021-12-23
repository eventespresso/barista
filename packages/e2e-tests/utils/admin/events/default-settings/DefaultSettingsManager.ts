import { Goto } from '@e2eUtils/admin';
import { WPListTable } from '../../WPListTable';

export class DefaultSettingsManager extends WPListTable {
	/**
	 * go to default settings tab
	 */
	gotoDefaultSettings = async (): Promise<void> => {
		const linkCategories = await page.$(`.nav-tab-wrapper a:has-text("Default Settings")`);
		const hrefCategories = await linkCategories.getAttribute('href');
		await Promise.all([page.waitForNavigation(), page.goto(hrefCategories)]);
	};

	/**
	 * Trigger save at update settings section
	 */
	updateSettingsSave = async (): Promise<void> => {
		// select delete category from bulk action
		await Promise.all([page.waitForNavigation(), page.click('input#default_event_settings_save')]);
	};

	/**
	 * Get selected default status and return weither option value or innertext of the option
	 */
	getSelectedDefaultStatus = async ({ value = false, text = false }): Promise<string> => {
		// select the option for registration default status
		const wrapper = await page.$(
			'select#update_default_event_settings-default-reg-status option[selected="selected"]'
		);

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
	 * Select default registration status base on option value
	 */
	selectDefaultRegStatus = async (optionValue: string): Promise<void> => {
		// select delete category from bulk action
		await page.selectOption('select#update_default_event_settings-default-reg-status', {
			value: optionValue,
		});
		await this.updateSettingsSave();
	};

	/**
	 * Process to select default registration status base on option value
	 */
	processToSelectRegStatus = async (optionValue: string): Promise<string> => {
		// Select default registration status base on option value
		await this.selectDefaultRegStatus(optionValue);
		// go to main event admin page
		await Goto.eventsListPage();
		// go to default settings tab
		await this.gotoDefaultSettings();
		// Get selected default status and return weither option value or innertext of the option
		return await this.getSelectedDefaultStatus({ value: true });
	};

	/**
	 * Get the default value set on default maximum ticket allowed field
	 */
	getDefaultMaxTicket = async (): Promise<string> => {
		return await (await page.$('#update_default_event_settings-default-max-tickets')).getAttribute('value');
	};

	/**
	 * Fill in or change the value of default maximum ticket allowed
	 */
	fillDefaultMaxTicket = async (value: string): Promise<void> => {
		await page.fill('#update_default_event_settings-default-max-tickets', value);
	};

	/**
	 * Save value set on default maximum ticket allowed
	 */
	saveDefaultMaxTicket = async (): Promise<void> => {
		await Promise.all([page.waitForNavigation(), page.click('#default_event_settings_save')]);
	};

	/**
	 * Set new value for default maximum ticket allowed
	 */
	setNewValueForDefaultMaxTicket = async (value: string): Promise<void> => {
		//Fill in or change the value of default maximum ticket allowed
		await this.fillDefaultMaxTicket(value);
		// Save value set on default maximum ticket allowed
		await this.saveDefaultMaxTicket();
	};

	/**
	 * get "Max Registrations per Transaction" value under "Registration Options"
	 */
	getEventRegMaxTicket = async (): Promise<string> => {
		return await (await page.$('#max-registrants')).getAttribute('value');
	};
}
