import { test } from '@playwright/test';
import { Navigate, Auth, Nuke, Events, utilities, Client, Factory, WpCli, Manifest } from '@eventespresso/e2e';

type TestFixtures = {
	factory: Factory;
	navigate: Navigate;
	events: Events;
	nuke: Nuke;
	wp: WpCli;
	manifest: Manifest;
};

type WorkerFixtures = {
	workerNavigate: Navigate;
	workerStorageState: string;
	workerWp: WpCli;
	workerManifest: Manifest;
};

const fixtures = test.extend<TestFixtures, WorkerFixtures>({
	// test fixtures
	factory: async ({ manifest }, use, testInfo) => {
		const {
			project: { name },
			workerIndex,
			parallelIndex,
		} = testInfo;
		const username = utilities.makeUsername(name, workerIndex, parallelIndex);
		const email = utilities.makeEmail(username);
		const password = utilities.makePassword();
		const client = new Client(email, password, manifest);
		const factory = new Factory(client);
		await use(factory);
	},
	navigate: async ({ browser, manifest }, use) => {
		const navigate = new Navigate(browser, manifest);
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
		async ({ browser, workerManifest }, use) => {
			const navigate = new Navigate(browser, workerManifest);
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
