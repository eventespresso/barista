import fs from 'fs';
import { execSync } from 'child_process';
import { Command, Option } from '@commander-js/extra-typings';

// from https://github.com/WordPress/gutenberg/tree/HEAD/packages/env#wp-env-run-container-command
type Env = 'mysql' | 'tests-mysql' | 'wordpress' | 'tests-wordpress' | 'cli' | 'tests-cli' | 'composer' | 'phpunit';

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
				new Option('-e, --env <type>', 'container type')
					.choices<(keyof ReturnType<WpEnv['getEnvs']>)[]>(Object.keys(this.getEnvs()))
					.default<keyof ReturnType<WpEnv['getEnvs']>>('all')
			);

		type globalOpts = {
			env: 'dev' | 'tests' | 'all';
		};

		const plugin = run.command('plugin').description('run plugin-related operations');

		plugin
			.command('activate')
			.argument('<name(s)...>', 'plugin name(s)')
			.description('activate plugin')
			.action((name, opts, cmd) => {
				execSync(this.makeCmd(`wp plugin activate ${name.join(' ')}`, cmd.optsWithGlobals<globalOpts>().env));
			});

		plugin
			.command('deactivate')
			.argument('<name(s)...>', 'plugin name(s)')
			.description('deactivate plugin')
			.action((name, opts, cmd) => {
				execSync(this.makeCmd(`wp plugin deactivate ${name.join(' ')}`, cmd.optsWithGlobals<globalOpts>().env));
			});

		const user = run.command('user').description('run user-related operations');

		user.command('create')
			.argument('<email>', 'WordPress email')
			.argument('<password>', 'WordPress password')
			.description('create new WordPress admin')
			.addOption(new Option('-r, --role <type>', 'role type').makeOptionMandatory().choices(['user', 'admin']))
			.action((user, pass, opts, cmd) => {
				const roleMap = {
					user: 'subscriber',
					admin: 'administrator',
				};
				execSync(
					this.makeCmd(
						`wp user create ${user} ${user} --user_pass=${pass} --role=${roleMap[opts.role]}`,
						cmd.optsWithGlobals<globalOpts>().env
					)
				);
			});

		user.command('nuke')
			.description("delete *ALL* users except 'admin'")
			.action((opts, cmd) => {
				const users = execSync(
					// to run nested docker commands, we need to use special tricks
					// https://serverfault.com/a/784225
					this.makeCmd(
						"/bin/sh -c 'wp user delete --yes $(wp user list --field=ID --exclude=1)'",
						cmd.optsWithGlobals<globalOpts>().env
					),
					{ stdio: 'ignore' }
				);
			});

		program.parse();
	}

	private makeConfig(): void {
		require('dotenv').config({
			path: '.wp-env',
		});

		for (const env of ['CAFE', 'BARISTA']) {
			if (!process.env[env]) throw new Error(`Missing env var ${env} (either export it or use .wp-env`);
		}

		const struct = {
			config: {},
			mappings: {
				'wp-content': process.env.CAFE,
				'wp-content/plugins/barista': process.env.BARISTA,
			},
			plugins: [],
			lifecycleScripts: {},
			env: {},
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

	private getEnvs(): Record<string, Env[]> {
		return {
			all: ['cli', 'tests-cli'],
			dev: ['cli'],
			tests: ['tests-cli'],
		};
	}
}

export { WpEnv };
