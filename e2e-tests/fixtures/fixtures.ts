import { test } from '@playwright/test';
import { StorageState, Navigate, Auth } from '@eventespresso/e2e';

type TestFixtures = {
	navigate: Navigate;
};

type WorkerFixtures = {
	workerStorageState: string;
};

const fixtures = test.extend<TestFixtures, WorkerFixtures>({
	navigate: async ({ browser }, use) => {
		const navigate = new Navigate({ browser });
		await use(navigate);
	},
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
