import { test } from '@playwright/test';
import { Navigate, Auth, Nuke } from '@eventespresso/e2e';

type TestFixtures = {
	navigate: Navigate;
	nuke: Nuke;
};

type WorkerFixtures = {
	workerNavigate: Navigate;
	workerStorageState: string;
};

const fixtures = test.extend<TestFixtures, WorkerFixtures>({
	// test fixtures
	navigate: async ({ browser }, use) => {
		const navigate = new Navigate(browser);
		await use(navigate);
	},
	storageState: ({ workerStorageState }, use) => {
		use(workerStorageState);
	},
	nuke: async ({ navigate }, use) => {
		const nuke = new Nuke(navigate);
		await use(nuke);
	},
	// worker fixtures
	workerNavigate: [
		async ({ browser }, use) => {
			const navigate = new Navigate(browser);
			await use(navigate);
		},
		{ scope: 'worker' },
	],
	workerStorageState: [
		async ({ workerNavigate }, use, workerInfo) => {
			const auth = new Auth(workerNavigate, workerInfo);
			const path = await auth.getStoragePath();

			await use(path);
		},
		{ scope: 'worker' },
	],
});

export { fixtures as test };
