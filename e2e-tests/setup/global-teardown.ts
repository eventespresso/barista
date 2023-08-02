import { extname, basename } from 'path';
import { spawn } from 'child_process';
import { constants, Manifest } from '@eventespresso/e2e';
import { removeSync, readdirSync } from 'fs-extra';

async function globalTeardown() {
	// do not cleanup in CI since it does not have state like local environment
	if (!process.env.CI && !process.env.DEBUG_E2E_GLOBAL_TEARDOWN) {
		const files = readdirSync(constants.locations.manifests, { withFileTypes: true })
			.filter((file) => file.isFile())
			.filter((file) => extname(file.name).toLowerCase() === '.json');

		for (const file of files) {
			const name = file.name;
			const project = basename(name, '.json');
			const manifest = new Manifest(project);
			const cmd = 'ddev stop --omit-snapshot --remove-data --unlist';
			const clear = spawn(cmd, { cwd: manifest.cwd, shell: true, stdio: 'inherit' });
			clear.on('message', (msg) => console.log(msg.toString));
			clear.on('error', (err) => console.error(err.message));
			// block further execution and wait until spawn finishes
			// https://stackoverflow.com/a/69025854/4343719
			await new Promise((resolve) => clear.on('close', resolve));
		}

		removeSync(constants.locations.containers);
		removeSync(constants.locations.playwright);
	}
}

export default globalTeardown;
