import { resolve } from 'path';
import { spawn } from 'child_process';
import { constants } from '@eventespresso/e2e';
import { removeSync, rmSync, existsSync } from 'fs-extra';

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
		const clear = spawn('ddev stop --omit-snapshot --remove-data');
		clear.on('message', (msg) => console.log(msg.toString));
		clear.on('error', (err) => console.error(err.message));
		// block further execution and wait until spawn finishes
		// https://stackoverflow.com/a/69025854/4343719
		await new Promise((resolve) => clear.on('close', resolve));
		removeSync(constants.locations.containers);
	}
}

export default globalTeardown;
