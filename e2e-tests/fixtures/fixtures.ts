import { Auth } from '@e2e/Auth';
import { test } from '@playwright/test';
import { StorageState } from '@e2e/StorageState';

type TestFixtures = {};

type WorkerFixtures = {
	workerStorageState: string;
};

const fixtures = test.extend<TestFixtures, WorkerFixtures>({
	workerStorageState: [
		async ({ browser }, use, workerInfo) => {
			const auth = new Auth({ browser });
			const storage = new StorageState({ auth, workerInfo });
			const path = await storage.getStoragePath();
			await use(path);
		},
		{ scope: 'worker' },
	],
	storageState: ({ workerStorageState }, use) => {
		use(workerStorageState);
	},
});

export { fixtures as test };
