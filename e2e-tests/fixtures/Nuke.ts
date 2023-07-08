import { Browser } from '@playwright/test';
import { Url } from 'e2e-tests';

class Nuke {
	constructor(private readonly browser: Browser, private readonly url: Url) {}

	public async everything(): Promise<void> {
		const page = await this.browser.newPage();

		await page.goto(this.url.get('/wp-admin/admin.php?page=espresso_maintenance_settings'));

		await page.getByRole('link', { name: 'Reset/Delete Data' }).click();

		page.on('dialog', (dialog) => dialog.accept());

		await page.getByRole('link', { name: 'Permanently Delete All Event Espresso Data' }).click();

		await page.close();
	}
}

export { Nuke };
