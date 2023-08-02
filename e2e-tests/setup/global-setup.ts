import playwright from '../playwright.config';
import { constants, MakeConfig, MakeEnv } from '@eventespresso/e2e';

async function globalSetup() {
	const factory = new MakeEnv(new MakeConfig());
	const projects = playwright.projects ?? [];
	for (const project of projects) {
		if (project.name) {
			await factory.make(project.name, constants.locations.manifests);
		}
	}
}

export default globalSetup;
