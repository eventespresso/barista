import { test } from '@playwright/test';
import { Navigate, Auth, Nuke, Events, Url, utilities, Client, Factory, WpCli, Manifest } from '@eventespresso/e2e';

type TestFixtures = {
	factory: Factory;
	navigate: Navigate;
	events: Events;
	nuke: Nuke;
	url: Url;
	wp: WpCli;
	manifest: Manifest;
};

type WorkerFixtures = {
	workerNavigate: Navigate;
	workerStorageState: string;
	workerUrl: Url;
	workerWp: WpCli;
	workerManifest: Manifest;
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
	wp: async ({ manifest }, use) => {
		const wp = new WpCli(manifest);
		await use(wp);
	},
	manifest: async ({}, use, testInfo) => {
		const project = testInfo.project.name;
		const manifest = new Manifest(project);
		await use(manifest);
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
		async ({ workerNavigate, workerWp }, use, workerInfo) => {
			const auth = new Auth(workerNavigate, workerInfo, workerWp);
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
	workerWp: [
		async ({ workerManifest }, use) => {
			const wp = new WpCli(workerManifest);
			await use(wp);
		},
		{ scope: 'worker' },
	],
	workerManifest: [
		async ({}, use, testInfo) => {
			const project = testInfo.project.name;
			const manifest = new Manifest(project);
			await use(manifest);
		},
		{ scope: 'worker' },
	],
});

export { fixtures as test };
