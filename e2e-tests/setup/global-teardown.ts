import { rmSync, existsSync } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';

async function globalTeardown() {
	// do not cleanup in CI since it does not have state like local environment
	if (!process.env.CI && !process.env.DEBUG_E2E_GLOBAL_TEARDOWN) {
		const root = resolve(__dirname, '..', '.playwright');
		if (existsSync(root)) {
			rmSync(root, {
				recursive: true,
				force: true,
			});
		}
		// clear entire database for tests env to start from tabular rasa
		execSync('yarn docker:clear:tests');
	}
}

export default globalTeardown;
