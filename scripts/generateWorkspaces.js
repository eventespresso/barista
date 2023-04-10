const fs = require('fs').promises;
const { listWorkspaces } = require('yarn-workspaces-list');

const PATH = './workspaces.json';

const STALE_PACKAGES = ['@eventespresso/react-exit-modal-typeform'];

const isNotRootWorkspace = (workspace) => workspace.name !== 'root';
const isNotStalePackage = (workspace) => !STALE_PACKAGES.includes(workspace.name);

/**
 * This function generates/lists yarn workspaces and writes their name and location
 * to "workspaces.json" file as an array.
 * NOTE: This script should be run on yarn postinstall
 */
async function generateWorkspacesJson() {
	try {
		const list = await listWorkspaces();

		const data = list
			.filter((workspace) => isNotRootWorkspace(workspace) && isNotStalePackage(workspace))
			.map(({ name, location }) => ({ name, location }));

		await fs.writeFile(PATH, JSON.stringify(data, null, 4) + '\n');
	} catch (err) {
		console.error(`Error generating workspaces JSON at ${PATH}:`, err);
	}
}

generateWorkspacesJson();
