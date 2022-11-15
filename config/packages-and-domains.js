const R = require('ramda');

const { getPackages, getDomains } = require('./workspaces');

const { getCommandArgs, commaStrToArray, camelCaseDash } = require('./utils');

/**
 * Get args from CLI to watch only the domains specified during dev
 * All domains in production and all packages are watched by default
 * Domain names should match their corresponding directory names
 * Example commands:
 * - `yarn dev --domains "core/admin/eventEditor,core/admin/blocks"`
 */
let {
	domains: includeDomains,
	packages: includePackages,
	'skip-packages': skipPackages,
	'skip-all-packages': skipAllPackages,
} = getCommandArgs();

/**
 * Returns all the domains that are to be included.
 *
 * @return {Array<Record<'name' | 'location', string>>} Domains to watch
 */
const getDomainsToWatch = () => {
	const allDomains = getDomains();
	// let domainsToWatch = allDomains;
	let domainsToWatch = [];

	if (includeDomains && typeof includeDomains === 'string') {
		if (includeDomains === 'all') {
			domainsToWatch = allDomains;
		}

		const domainLocations = commaStrToArray(includeDomains);

		for (const domain of allDomains) {
			const domainLocation = R.prop('location', domain);
			const isDomainInPath = R.flip(R.includes)(domainLocation);
			if (R.any(isDomainInPath, domainLocations)) {
				domainsToWatch.push(domain);
			}
		}
		if (!domainsToWatch.length) {
			throw new Error('No matching domains found');
		}
	}

	return domainsToWatch;
};

/**
 * Returns all the packages that are filtered via CLI args.
 *
 * @return {Array<Record<'name' | 'location', string>>} Domains to watch
 */
const getFilteredPackages = () => {
	if (skipAllPackages) {
		return [];
	}

	if (includePackages && typeof includePackages === 'string') {
		return filterPackages(includePackages, 'include');
	}

	if (skipPackages && typeof skipPackages === 'string') {
		return filterPackages(skipPackages, 'exclude');
	}

	// watch all domains by default
	return getPackages();
};

/**
 * Filter the packages by the given list.
 *
 * @param {string} packages A comma separated list of packages to use for filtering.
 * @param {'include' | 'exclude'} action The filter action.
 */
const filterPackages = (packages, action = 'include') => {
	const packageNames = commaStrToArray(packages);

	let predicate = R.flip(R.includes)(packageNames);
	if (action === 'exclude') {
		predicate = R.complement(predicate);
	}

	const filteredPackages = R.filter(R.propSatisfies(predicate, 'name'), getPackages());

	return filteredPackages;
};

/**
 * Get a list of paths to be included for babel transformation
 * and the entrypoints to be supplied to webpack.
 *
 * @return {{includePaths: Array<string>, entries: Record<string, string>}}
 */
const getIncludedPathsAndEntries = (resolveApp, resolveModule) => {
	const domainPaths = [];
	const domainEntries = {};
	getDomainsToWatch().forEach(({ name, location }) => {
		const domainEntry = resolveModule(resolveApp, `${location}/src/index`);
		const domainPath = resolveApp(`${location}/src/`);

		// "event-editor" becomes "eventEditor"
		const domainName = camelCaseDash(name);

		domainEntries[domainName] = [domainEntry];
		domainPaths.push(domainPath);
	});

	const filteredPackageNames = getFilteredPackages().map(R.prop('name'));

	const packagePaths = [];
	const packageEntries = {};
	getPackages().forEach(({ name, location }) => {
		// we don't need an entry point for icons
		if (name !== 'icons' && filteredPackageNames.includes(name)) {
			const packageEntry = resolveModule(resolveApp, `${location}/src/index`);
			const packageName = camelCaseDash(name);
			// "edtr-services" becomes "edtrServices"
			packageEntries[packageName] = [packageEntry];
		}
		const packagePath = resolveApp(`${location}/src/`);
		packagePaths.push(packagePath);
	});
	console.log('domains: ', Object.keys(domainEntries));
	console.log('packages: ', Object.keys(packageEntries));

	return {
		// Also add global types to include paths for ts-loader
		includePaths: [...domainPaths, ...packagePaths, resolveApp('types')],
		entries: { ...packageEntries, ...domainEntries },
	};
};

module.exports = { getIncludedPathsAndEntries };
