import { defineConfig, devices, ViewportSize } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

const host = process.env.PLAYWRIGHT_HOST ?? 'http://localhost:8889';

// https://github.com/microsoft/playwright/issues/13815#issuecomment-1112312543
const viewport: ViewportSize = {
	width: 1920,
	height: 1080,
};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	/* Directory with test files. See https://playwright.dev/docs/api/class-testproject#test-project-test-dir */
	testDir: './',

	/* Run tests in files in parallel */
	fullyParallel: true,

	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,

	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,

	/* Opt out of parallel tests on CI. */
	// workers: process.env.CI ? 1 : undefined,
	// cannot use parallel workers until we have separate databases per worker
	// https://github.com/eventespresso/barista/issues/1234
	workers: 1,

	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: process.env.CI ? 'dot' : 'html',

	/* Global setup. See https://playwright.dev/docs/api/class-testconfig#test-config-global-setup */
	globalSetup: './setup/global-setup.ts',

	/* Global cleanup. See https://playwright.dev/docs/api/class-testconfig#test-config-global-teardown */
	globalTeardown: './setup/global-teardown.ts',

	/* Set timeout for each test to be 120 seconds */
	timeout: 120_000,

	/* Set global timeout to 1 hour */
	globalTimeout: 3_600_000,

	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: host,

		/* Collect trace when the test has failed. See https://playwright.dev/docs/trace-viewer */
		trace: 'retain-on-failure',

		/** Capture video when the test fails. See https://playwright.dev/docs/videos */
		video: 'retain-on-failure',

		/** Capture screenshot when the test fails. See https://playwright.dev/docs/screenshots */
		screenshot: 'only-on-failure',
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'setup',
			testMatch: /.*\.setup\.ts/,
		},

		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				viewport, // see comment next to variable declaration
			},
			dependencies: ['setup'],
		},

		{
			name: 'firefox',
			use: {
				...devices['Desktop Firefox'],
				viewport, // see comment next to variable declaration
			},
			dependencies: ['setup'],
		},

		{
			name: 'webkit',
			use: {
				...devices['Desktop Safari'],
				viewport, // see comment next to variable declaration
			},
			dependencies: ['setup'],
		},

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: { ...devices['Pixel 5'] },
		// },
		// {
		//   name: 'Mobile Safari',
		//   use: { ...devices['iPhone 12'] },
		// },

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
		// },
	],

	/* Run your local dev server before starting the tests */
	webServer: {
		command: 'yarn docker:start',
		url: host,
		reuseExistingServer: !process.env.CI,
	},
});