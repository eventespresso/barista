import { test } from '@playwright/test';
import { StorageState, Navigate, Auth, Nuke, Url } from '@eventespresso/e2e';

type TestFixtures = {
	navigate: Navigate;
	nuke: Nuke;
	url: Url;
};

type WorkerFixtures = {
	workerStorageState: string;
};

const fixtures = test.extend<TestFixtures, WorkerFixtures>({
	url: async ({}, use) => await use(new Url()),
	navigate: async ({ browser }, use) => {
		const navigate = new Navigate({ browser });
		await use(navigate);
	},
	nuke: async ({ browser }, use) => {
		const nuke = new Nuke({ browser });
		await use(nuke);
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
