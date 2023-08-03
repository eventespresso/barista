import minimist from 'minimist';
import { argv, env } from 'process';
import playwright from '../playwright.config';
import { MakeConfig, MakeEnv } from '@eventespresso/e2e';

const makeWordPress = async (): Promise<void> => {
	if (!playwright.projects || playwright.projects.length < 1) {
		throw new Error('You need at least one project with user agent in playwright.config.ts!');
	}

	// include only projects with defined name *and* user-agent
	const projects = playwright.projects.filter((project) => project.name && project.use?.userAgent);

	const args = minimist(argv.slice(2));

	// PlayWright supports --project switch to include only specific projects
	// otherwise include everything
	const whitelist = (args['project'] as string[]) ?? playwright.projects.map((project) => project.name);

	const factory = new MakeEnv(new MakeConfig());

	for (const project of projects) {
		// see filter about where we make sure name *and* user-agent is included
		if (whitelist.includes(project.name!)) {
			await factory.make(project.name!);
		}
	}
};

const scaffold = { makeWordPress };

export { scaffold };
