import { resolve, dirname } from 'path';
import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { faker } from '@faker-js/faker';
import { WorkerInfo } from '@playwright/test';
import { Navigate } from '@eventespresso/e2e';

class Auth {
	private readonly sessionPath: string;

	constructor(private readonly navigate: Navigate, private readonly workerInfo: WorkerInfo) {
		this.sessionPath = this.createSessionPath(this.createUniqueUsername());
	}

	private async saveLoginState(): Promise<void> {
		const user = this.createUniqueUsername();

		const email = `${user}@e2e.test`;

		const pass = faker.internet.password({ length: 10 });

		execSync(`yarn docker:cli --env tests user create ${email} ${pass} --role=admin`, { stdio: 'ignore' });

		// Important: make sure environment is clean to avoid dirty state
		const page = await this.navigate.to('login', { storageState: undefined });

		await page.getByLabel('Username or Email Address').fill(email);

		await page.getByRole('textbox', { name: 'Password', exact: true }).fill(pass);

		await page.getByRole('button', { name: 'Log In' }).click();

		await page.waitForURL(this.navigate.get('admin'));

		const credentials = await page.context().storageState();

		const json = JSON.stringify(credentials, undefined, 2);

		const folder = dirname(this.sessionPath);

		if (!existsSync(folder)) mkdirSync(folder, { recursive: true });

		writeFileSync(this.sessionPath, json);

		await page.close();
	}

	private createUniqueUsername(): string {
		let user = faker.person.firstName().toLowerCase();
		while (existsSync(this.createSessionPath(user))) {
			user = faker.person.firstName().toLowerCase();
		}
		return user;
	}

	private createSessionPath(user: string): string {
		const project = this.workerInfo.project.name;
		const worker = this.workerInfo.workerIndex;
		const job = this.workerInfo.parallelIndex;
		const file = [project, worker, job, user].join('-') + '.json';
		const folder = resolve(__dirname, '../../.playwright/auth') + '/';
		return folder + file;
	}

	/**
	 * @return {string} returns path to storage state file
	 */
	public async getStoragePath(): Promise<string> {
		if (!existsSync(this.sessionPath)) await this.saveLoginState();
		return this.sessionPath;
	}
}

export { Auth };
