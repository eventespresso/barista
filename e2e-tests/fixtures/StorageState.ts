import fs from 'node:fs';
import path from 'node:path';
import { Auth } from './Auth';
import { WorkerInfo } from '@playwright/test';

type Params = {
	auth: Auth;
	workerInfo: WorkerInfo;
};

class StorageState {
	private readonly auth: Auth;
	private readonly path: string;

	constructor({ auth, workerInfo }: Params) {
		this.auth = auth;
		this.path = this.getFilePath(workerInfo);
	}

	private getFilePath(workerInfo: WorkerInfo): string {
		const id = workerInfo.parallelIndex;
		const outDir = workerInfo.project.outputDir;
		const subPath = `../.playwright/auth/${id}.json`;
		return path.resolve(outDir, subPath);
	}

	/**
	 * @return {string} returns path to storage state file
	 */
	public async getStoragePath(): Promise<string> {
		if (!fs.existsSync(this.path)) {
			await this.auth.saveLoginState(this.path);
		}
		return this.path;
	}
}

export { StorageState };
