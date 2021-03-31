import dotenv from 'dotenv';
import type { Config } from '@jest/types';

dotenv.config();

const config: Config.InitialOptions = {
	preset: 'jest-playwright-jsdom',
	globalSetup: 'jest-playwright-preset/setup.js',
	reporters: undefined,
	setupFilesAfterEnv: [
		'expect-playwright',
		'@testing-library/jest-dom/extend-expect',
		'<rootDir>/config/setup-playwright.js',
	],
	testMatch: ['**/specs/**/*test.[jt]s', '**/?(*.)spec.[jt]s'],
	testEnvironmentOptions: {
		'jest-playwright': {
			launchOptions: {
				headless: process.env.CI === 'true' ? true : process.env.HEADLESS === 'true',
				// slowMo: +process.env.SLOW_MO,
			},
		},
	},
	testPathIgnorePatterns: ['/node_modules/'],
	verbose: process.env.CI === 'true' && true,
	transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$', '^.+\\.module\\.(css|sass|scss)$'],
	transform: {
		'^.+\\.(js|jsx)$': '<rootDir>/../../node_modules/babel-jest',
		'^.+\\.(ts|tsx)$': '<rootDir>/../../node_modules/ts-jest',
		'^.+\\.(scss|css)$': '<rootDir>/../../config/jest/cssTransform.js',
	},
};

export default config;
