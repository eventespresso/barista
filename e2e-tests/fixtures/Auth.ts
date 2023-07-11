import { Browser, WorkerInfo } from '@playwright/test';
import { Url } from '@eventespresso/e2e/Url';
import path from 'path';
import fs from 'fs';

class Auth {
	private readonly path: string;

	constructor(workerInfo: WorkerInfo, private readonly browser: Browser, private readonly url: Url) {
		this.path = this.getFilePath(workerInfo);
	}

	private getFilePath(workerInfo: WorkerInfo): string {
		const workerId = workerInfo.workerIndex;
		const parallelId = workerInfo.parallelIndex;
		const outDir = workerInfo.project.outputDir;
		const subPath = `../.playwright/auth/${workerId}-${parallelId}.json`;
		return path.resolve(outDir, subPath);
	}

	private async saveLoginState(): Promise<void> {
		// Important: make sure environment is clean to avoid dirty state
		const page = await this.browser.newPage({ storageState: undefined });

		await page.goto(this.url.get('/wp-login.php'));

		await page.getByLabel('Username or Email Address').fill('admin');

		await page.getByRole('textbox', { name: 'Password', exact: true }).fill('password');

		await page.getByRole('button', { name: 'Log In' }).click();

		await page.waitForURL(this.url.get('/wp-admin/'));

		// this will save storage state to file
		await page.context().storageState({ path: this.path });

		await page.close();
	}

	/**
	 * @return {string} returns path to storage state file
	 */
	public async getStoragePath(): Promise<string> {
		if (!fs.existsSync(this.path)) await this.saveLoginState();
		return this.path;
	}
}

export { Auth };
