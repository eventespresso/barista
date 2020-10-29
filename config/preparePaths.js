/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');
const { commaStrToArray, getCommandArgs, camelCaseDash } = require('./utils');

const { getPackages, getDomains, getCoreDomains } = require('./packages-and-domains');

const PACKAGES_FOLDER = 'packages';
const DOMAINS_FOLDER = 'domains';

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const moduleFileExtensions = [
	'web.mjs',
	'mjs',
	'web.js',
	'js',
	'web.ts',
	'ts',
	'web.tsx',
	'tsx',
	'json',
	'web.jsx',
	'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
	const extension = moduleFileExtensions.find((extension) => fs.existsSync(resolveFn(`${filePath}.${extension}`)));

	if (extension) {
		return resolveFn(`${filePath}.${extension}`);
	}

	return resolveFn(`${filePath}.js`);
};
/**
 * Get args from CLI to watch only the domains specified during dev
 * All domains in production and all packages are watched by default
 * Domain names should match their corresponding directory names
 * Example commands:
 * - `yarn dev --domains "eventEditor,wpPluginsPage"`
 * - `yarn dev --domains "eventEditor"` - default
 * - `yarn dev --domains "all"`
 * - `yarn build --domains "core"`
 * - `yarn build --domains "core" --skip-packages "rrule-generator,some-other-package"`
 * - `yarn build --domains "rem" --skip-all-packages`
 * - `yarn build --domains "rem" --packages "rrule-generator,some-other-package"`
 */
let {
	domains: suppliedDomains,
	packages: suppliedPackages,
	'skip-packages': skipPackages,
	'skip-all-packages': skipAllPackages,
} = getCommandArgs();

// since icons package is bundled, it will be loaded regardles
const packages = getPackages();

const packagePaths = [];
const packageEntries = {};

suppliedPackages = commaStrToArray(suppliedPackages);
skipPackages = commaStrToArray(skipPackages);

packages.forEach((packageName) => {
	const packageEntry = resolveModule(resolveApp, PACKAGES_FOLDER + `/${packageName}/src/index`);
	const packagePath = resolveApp(PACKAGES_FOLDER + `/${packageName}/src`);

	const skipPackageEntry =
		skipAllPackages ||
		// we don't need an entry point for icons
		packageName === 'icons' ||
		(suppliedPackages.length && !suppliedPackages.includes(packageName)) ||
		(skipPackages.length && skipPackages.includes(packageName));

	if (!skipPackageEntry) {
		// "edtr-services" becomes "edtrServices"
		const name = camelCaseDash(packageName);
		packageEntries[name] = [packageEntry];
	}
	packagePaths.push(packagePath);
});

const allDomains = getDomains();
// no domain to watch by default
let domainsToWatch = [];
if (suppliedDomains && typeof suppliedDomains === 'string') {
	switch (suppliedDomains) {
		case 'all':
			domainsToWatch = allDomains;
			break;
		case 'core':
			domainsToWatch = getCoreDomains();
			break;
		default:
			domainsToWatch = commaStrToArray(suppliedDomains);
			break;
	}
}
if (domainsToWatch.some((domain) => !allDomains.includes(domain))) {
	throw new Error('Unknown domain');
}

console.log('Watching domains: ', domainsToWatch);

const domainPaths = [];
const domainEntries = {};

domainsToWatch.forEach((domain) => {
	const domainEntry = resolveModule(resolveApp, DOMAINS_FOLDER + `/${domain}/src/index`);
	const domainPath = resolveApp(DOMAINS_FOLDER + `/${domain}/src/`);

	domainEntries[domain] = [domainEntry];
	domainPaths.push(domainPath);
});

const includePaths = [...packagePaths, ...domainPaths];

// Add global types to include paths for ts-loader
includePaths.push(resolveModule(resolveApp, PACKAGES_FOLDER + '/types'));

module.exports = {
	entry: { ...packageEntries, ...domainEntries },
	includePaths,
	domains: allDomains,
	packages,
};
