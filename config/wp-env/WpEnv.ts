import fs from 'fs';
import { Command } from 'commander';

/**
 * @link https://github.com/WordPress/gutenberg/tree/HEAD/packages/env#readme
 */
class WpEnv {
	constructor() {
		this.init();
	}

	private init(): void {
		const program = new Command();

		const make = program.command('make').description('create necessary files for the @wordpress/env');

		make.command('config')
			.description('create .wp-env.json')
			.action(() => this.makeConfig());

		program.parse();
	}

	private makeConfig(): void {
		require('dotenv').config({
			path: '.wp-env',
		});

		for (const env of ['WP_CONTENT']) {
			if (!process.env[env]) throw new Error(`Missing env var ${env} (either export it or use .wp-env`);
		}

		const struct = {
			config: {
				WP_DEBUG: true,
				WP_DEBUG_DISPLAY: true,
				WP_DEBUG_LOG: true,
			},
			mappings: {
				'wp-content': process.env.WP_CONTENT,
			},
			plugins: ['.'],
			lifecycleScripts: {
				afterStart: this.makeCmd(['wp plugin activate event-espresso-core'], 'dev'),
			},
		};

		const json = JSON.stringify(struct, undefined, 2);

		// hardcoded by @wordpress/env
		const fileName = '.wp-env.json';

		fs.writeFileSync(fileName, json);
	}

	private makeCmd(cmds: string | string[], type: keyof ReturnType<WpEnv['getEnvs']>): string {
		if (typeof cmds === 'string') cmds = [cmds];
		const envs = this.getEnvs()[type];
		const output: string[] = [];
		cmds.forEach((cmd) => {
			envs.forEach((env) => {
				output.push(`yarn wp-env run ${env} ${cmd}`);
			});
		});
		return output.join(' && ');
	}

	private getEnvs() {
		return {
			all: ['cli', 'tests-cli'],
			dev: ['cli'],
			tests: ['tests-cli'],
		};
	}
}

export { WpEnv };
