import fs from 'fs';
import { execSync } from 'child_process';
import { Command, Option } from '@commander-js/extra-typings';

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

		const run = program
			.command('run')
			.description('run cli command against running docker container')
			.addOption(
				new Option('-e, --env <type>', 'container type').choices(['dev', 'tests', 'all']).default('all')
			);

		type globalOpts = {
			env: 'dev' | 'tests' | 'all';
		};

		const plugin = run.command('plugin').description('run plugin-related operations');

		plugin
			.command('activate')
			.argument('<name>', 'plugin name')
			.description('activate plugin')
			.action((name, opts, cmd) => {
				execSync(this.makeCmd(`wp plugin activate ${name}`, cmd.optsWithGlobals<globalOpts>().env));
			});

		plugin
			.command('deactivate')
			.argument('<name>', 'plugin name')
			.description('deactivate plugin')
			.action((name, opts, cmd) => {
				execSync(this.makeCmd(`wp plugin deactivate ${name}`, cmd.optsWithGlobals<globalOpts>().env));
			});

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
