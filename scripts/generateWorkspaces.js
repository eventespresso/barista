const fs = require('fs');
const { listWorkspaces } = require('yarn-workspaces-list');
const R = require('ramda');

const PATH = './workspaces.json';

const STALE_PACKAGES = ['@eventespresso/react-exit-modal-typeform'];

const isNotRootWorkspace = R.complement(R.propEq('name', 'root'));
const isNotStalePackage = R.complement(R.propSatisfies(R.flip(R.includes)(STALE_PACKAGES), 'name'));

/**
 * This function generates/lists yarn workspaces and writes their name and location
 * to "workspaces.json" file as an array.
 * NOTE: This script should be run on yarn postinstall
 */
listWorkspaces().then((list) => {
	let data = R.map(
		// use only name and location
		R.pick(['name', 'location']),
		R.filter(R.allPass([isNotRootWorkspace, isNotStalePackage]), list)
	);

	data = JSON.stringify(data, null, 4) + '\n';

	fs.writeFileSync(PATH, data);
});
