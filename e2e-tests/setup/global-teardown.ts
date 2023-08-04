import { constants } from '@eventespresso/e2e';
import { removeSync } from 'fs-extra';
import { cleanup } from './cleanup';

async function globalTeardown() {
	// do not cleanup in CI since it does not have state like local environment
	if (!process.env.CI && !process.env.DEBUG_E2E_GLOBAL_TEARDOWN) {
		await cleanup.removeContainers();
		removeSync(constants.locations.containers);
		removeSync(constants.locations.playwright);
	}
}

export default globalTeardown;
