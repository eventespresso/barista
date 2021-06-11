import type { Config } from '@jest/types';

// const { getDomains } = require('./workspaces');
import { getDomains, getPackages } from './config/workspaces';

export const moduleNameMapper = {
	'^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
	'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
		'<rootDir>/config/jest/__mocks__/fileMock.js',
};

function resolveTsconfigPathsToModuleNameMapper() {
	const tsconfigPath = './tsconfig.json';
	const { paths } = require(tsconfigPath).compilerOptions;

	Object.entries(paths).forEach(([alias, path]) => {
		// "@edtrServices/*" becomes "@edtrServices/(.*)"
		const key = alias.replace('/*', '/(.*)');
		// "domains/eventEditor/src/services/*" becomes "<rootDir>/domains/eventEditor/src/services/$1"
		const value = '<rootDir>/' + path[0].replace('/*', '/$1');

		moduleNameMapper[key] = value;
	});

	return moduleNameMapper;
}

const roots = [],
	testMatch = [];

getDomains().forEach(({ location }) => {
	roots.push(`<rootDir>/${location}/src`);
	testMatch.push(`<rootDir>/${location}/src/**/*.test.{ts,tsx}`);
});

getPackages().forEach(({ location }) => {
	roots.push(`<rootDir>/${location}/src`);
	testMatch.push(`<rootDir>/${location}/src/**/*.test.{ts,tsx}`);
});

const config: Config.InitialOptions = {
	roots,
	testMatch,
	transform: {
		'^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
		'^.+\\.(ts|tsx)$': '<rootDir>/node_modules/ts-jest',
		'^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
		'^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
	},
	collectCoverageFrom: ['assets/src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
	setupFiles: ['react-app-polyfill/jsdom'],
	setupFilesAfterEnv: ['<rootDir>/config/jest/setupTests.ts'],
	testEnvironment: 'jest-environment-jsdom',
	transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$', '^.+\\.module\\.(css|sass|scss)$'],
	modulePaths: [],
	moduleNameMapper: resolveTsconfigPathsToModuleNameMapper(),
	moduleFileExtensions: ['web.js', 'js', 'web.ts', 'ts', 'web.tsx', 'tsx', 'json', 'web.jsx', 'jsx', 'node'],
	watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};

export default config;
