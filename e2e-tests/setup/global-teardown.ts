import { rmSync, existsSync } from 'fs';
import { resolve } from 'path';

async function globalTeardown() {
	const root = resolve(__dirname, '..', '..', '.playwright');
	if (existsSync(root)) {
		rmSync(root, {
			recursive: true,
			force: true,
		});
	}
}

export default globalTeardown;
