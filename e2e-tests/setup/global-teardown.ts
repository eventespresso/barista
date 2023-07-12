import { rmSync, existsSync } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';

async function globalTeardown() {
	const root = resolve(__dirname, '..', '..', '.playwright');
	if (existsSync(root)) {
		rmSync(root, {
			recursive: true,
			force: true,
		});
	}
	execSync('yarn docker:cli --env tests user nuke');
	// by clearing DB, all plugins will be deactivated
	execSync('yarn docker:clear:tests');
}

export default globalTeardown;
