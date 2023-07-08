import fs from 'node:fs';
import path from 'node:path';
import { Auth } from '@eventespresso/e2e';
import { WorkerInfo } from '@playwright/test';

type Params = {
	auth: Auth;
	workerInfo: WorkerInfo;
};

class StorageState {
	private readonly path: string;

	constructor(private readonly auth: Auth, workerInfo: WorkerInfo) {
		this.path = this.getFilePath(workerInfo);
	}

	private getFilePath(workerInfo: WorkerInfo): string {
		const workerId = workerInfo.workerIndex;
		const parallelId = workerInfo.parallelIndex;
		const outDir = workerInfo.project.outputDir;
		const subPath = `../.playwright/auth/${workerId}-${parallelId}.json`;
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
