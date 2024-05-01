/* eslint-disable */
/**
 * This script checks if all the packages are added to our custom ESLint rules levels array
 */

const { getPackages } = require('../config/workspaces');
const levelPackages = require('./levels').flat();

getPackages().forEach(({ name: package }) => {
	if (!levelPackages.includes(package)) {
		throw new Error(`${package} is not added to ESLint package rules.`);
	}
});
