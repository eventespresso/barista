import { Browser, Page } from '@playwright/test';
import { Url } from '@eventespresso/e2e/Url';

class Auth {
	constructor(private readonly browser: Browser, private readonly url: Url) {}

	private async makePage(): Promise<Page> {
		// Important: make sure environment is clean to avoid dirty state
		return this.browser.newPage({ storageState: undefined });
	}

	public async saveLoginState(path: string): Promise<void> {
		const page = await this.makePage();

		await page.goto(this.url.get('/wp-login.php'));

		await page.getByLabel('Username or Email Address').fill('admin');

		await page.getByRole('textbox', { name: 'Password', exact: true }).fill('password');

		await page.getByRole('button', { name: 'Log In' }).click();

		await page.waitForURL(this.url.get('/wp-admin/'));

		// this will save storage state to file
		await page.context().storageState({ path });

		await page.close();
	}
}

export { Auth };
