import { test } from '@playwright/test';
import { Navigate, Auth, Nuke, Events, Url, utilities, Client, Factory } from '@eventespresso/e2e';

type TestFixtures = {
	factory: Factory;
	navigate: Navigate;
	events: Events;
	nuke: Nuke;
	url: Url;
};

type WorkerFixtures = {
	workerNavigate: Navigate;
	workerStorageState: string;
	workerUrl: Url;
};

const fixtures = test.extend<TestFixtures, WorkerFixtures>({
	// test fixtures
	factory: async ({ url }, use, testInfo) => {
		const {
			project: { name },
			workerIndex,
			parallelIndex,
		} = testInfo;
		const username = utilities.makeUsername(name, workerIndex, parallelIndex);
		const email = utilities.makeEmail(username);
		const password = utilities.makePassword();
		const client = new Client(email, password, url);
		const factory = new Factory(client);
		await use(factory);
	},
	navigate: async ({ browser, url }, use) => {
		const navigate = new Navigate(browser, url);
		await use(navigate);
	},
	storageState: ({ workerStorageState }, use) => {
		use(workerStorageState);
	},
	events: async ({ navigate }, use) => {
		const events = new Events(navigate);
		await use(events);
	},
	nuke: async ({ navigate }, use) => {
		const nuke = new Nuke(navigate);
		await use(nuke);
	},
	url: async ({}, use) => {
		const url = new Url();
		await use(url);
	},
	// worker fixtures
	workerNavigate: [
		async ({ browser, workerUrl }, use) => {
			const navigate = new Navigate(browser, workerUrl);
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
	workerUrl: [
		async ({}, use) => {
			const url = new Url();
			await use(url);
		},
		{ scope: 'worker' },
	],
});

export { fixtures as test };
