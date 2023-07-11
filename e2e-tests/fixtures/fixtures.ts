import { test } from '@playwright/test';
import { Navigate, Auth, Nuke, Url } from '@eventespresso/e2e';

type TestFixtures = {
	navigate: Navigate;
	nuke: Nuke;
	url: Url;
};

type WorkerFixtures = {
	workerUrl: Url;
	workerStorageState: string;
};

const fixtures = test.extend<TestFixtures, WorkerFixtures>({
	url: async ({}, use) => await use(new Url()),
	navigate: async ({ browser, url }, use) => {
		const navigate = new Navigate(browser, url);
		await use(navigate);
	},
	nuke: async ({ browser, url }, use) => {
		const nuke = new Nuke(browser, url);
		await use(nuke);
	},
	workerUrl: [async ({}, use) => await use(new Url()), { scope: 'worker' }],
	workerStorageState: [
		async ({ browser, workerUrl }, use, workerInfo) => {
			const auth = new Auth(browser, workerUrl, workerInfo);
			const path = await auth.getStoragePath();

			await use(path);
		},
		{ scope: 'worker' },
	],
	storageState: ({ workerStorageState }, use) => {
		use(workerStorageState);
	},
});

export { fixtures as test };
