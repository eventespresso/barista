import { Browser, BrowserContext, Page } from '@playwright/test';

type Params = {
	browser: Browser;
};

type StorageState = ReturnType<BrowserContext['storageState']>;

class Auth {
	private readonly browser: Browser;

	constructor({ browser }: Params) {
		this.browser = browser;
	}

	private async makePage(): Promise<Page> {
		// Important: make sure environment is clean to avoid dirty state
		return this.browser.newPage({ storageState: undefined });
	}

	public async saveLoginState(path: string): Promise<void> {
		const page = await this.makePage();

		// TODO: how to make host value flexible?
		await page.goto('http://localhost:8889/wp-login.php');

		// TODO: how to supply credentials?
		await page.getByLabel('Username or Email Address').fill('admin');

		// TODO: how to supply credentials?
		await page.getByRole('textbox', { name: 'Password', exact: true }).fill('password');

		await page.getByRole('button', { name: 'Log In' }).click();

		// TODO: how to make host value flexible?
		await page.waitForURL('http://localhost:8889/wp-admin/');

		await page.context().storageState({ path });

		await page.close();
	}
}

export { Auth };
