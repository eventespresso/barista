export class RegListManager {
	goToAddNewReg = async (): Promise<void> => {
		await Promise.all([page.waitForNavigation(), page.click('a:has-text("Add New Registration")')]);
	};

	/**
	 * Check if the value exist in select option innertext
	 */
	checkSelectOptionValue = async (value: string): Promise<string> => {
		return await (await page.$(`.ticket-selector-tbl-qty-slct option:has-text("${value}")`)).innerText();
	};
}
