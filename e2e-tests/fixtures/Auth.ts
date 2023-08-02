import { resolve, dirname } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { WorkerInfo } from '@playwright/test';
import { Navigate, utilities, WpCli } from '@eventespresso/e2e';

class Auth {
	private readonly sessionPath: string;

	constructor(
		private readonly navigate: Navigate,
		private readonly workerInfo: WorkerInfo,
		private readonly wp: WpCli
	) {
		this.sessionPath = this.createSessionPath();
	}

	private async createLoginState(): Promise<void> {
		const email = utilities.makeEmail(this.workerInfo);

		const password = utilities.makePassword();

		this.wp.user.create({ email, password });

		const page = await this.navigate.to('login');

		// ensure state is clean
		page.context().clearCookies();

		await page.waitForLoadState();

		await page.getByLabel('Username or Email Address').fill(email);

		await page.getByRole('textbox', { name: 'Password', exact: true }).fill(password);

		await page.getByRole('button', { name: 'Log In' }).click();

		await page.waitForLoadState();

		const credentials = await page.context().storageState();

		const json = JSON.stringify(credentials, undefined, 2);

		const folder = dirname(this.sessionPath);

		if (!existsSync(folder)) mkdirSync(folder, { recursive: true });

		writeFileSync(this.sessionPath, json);

		await page.close();
	}

	private createSessionPath(): string {
		const project = this.workerInfo.project.name;
		// When a worker is restarted, for example after a failure, the new worker process gets a new unique workerIndex
		const worker = this.workerInfo.workerIndex;
		// When a worker is restarted, for example after a failure, the new worker process has the same parallelIndex
		const job = this.workerInfo.parallelIndex;
		const file = [project, worker, job].join('-') + '.json';
		const folder = resolve(__dirname, '../.playwright/auth') + '/';
		return folder + file;
	}

	/**
	 * @return {string} returns path to storage state file
	 */
	public async getStoragePath(): Promise<string> {
		if (!existsSync(this.sessionPath)) {
			await this.createLoginState();
		}
		return this.sessionPath;
	}
}

export { Auth };
