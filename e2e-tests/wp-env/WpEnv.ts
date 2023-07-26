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
					.choices<Env[]>(this.getEnvs())
					.default<Env>('tests-cli')
			);

		type GlobalOpts = {
			env: Env;
		};

		const plugin = run.command('plugin').description('run plugin-related operations');

		plugin
			.command('activate')
			.argument('<name(s)...>', 'plugin name(s)')
			.description('activate plugin')
			.action((name, opts, cmd) => {
				execSync(this.makeCmd(`wp plugin activate ${name.join(' ')}`, cmd.optsWithGlobals<GlobalOpts>().env));
			});

		plugin
			.command('deactivate')
			.argument('<name(s)...>', 'plugin name(s)')
			.description('deactivate plugin')
			.action((name, opts, cmd) => {
				execSync(this.makeCmd(`wp plugin deactivate ${name.join(' ')}`, cmd.optsWithGlobals<GlobalOpts>().env));
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
				if (!(opts.role in roleMap)) {
					throw new Error('Unexpected condition!');
				}
				// workaround until TS is updated
				// https://github.com/microsoft/TypeScript/issues/21732
				const role = roleMap[opts.role as keyof typeof roleMap];
				execSync(
					this.makeCmd(
						`wp user create ${user} ${user} --user_pass=${pass} --role=${role}`,
						cmd.optsWithGlobals<GlobalOpts>().env
					)
				);
			});

		user.command('nuke')
			.description("delete *ALL* users except 'admin'")
			.action((opts, cmd) => {
				execSync(
					// to run nested docker commands, we need to use special tricks
					// https://serverfault.com/a/784225
					this.makeCmd(
						"/bin/sh -c 'wp user delete --yes $(wp user list --field=ID --exclude=1)'",
						cmd.optsWithGlobals<GlobalOpts>().env
					),
					{ stdio: 'ignore' }
				);
			});

		const rewrite = run.command('permalinks').description('rewrite commands');

		rewrite
			.command('enable')
			.argument('<structure>', 'rewrite structure')
			.action((structure, opts, cmd) => {
				const env = cmd.optsWithGlobals<GlobalOpts>().env;
				execSync(this.makeCmd(`wp rewrite structure '${structure}'`, env));
				execSync(this.makeCmd('wp rewrite flush --hard', env));
			})
			.description('enable permalinks');

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
			plugins: ['WP-API/Basic-Auth'],
			lifecycleScripts: {
				afterStart:
					this.makeCmd(
						[
							"/bin/sh -c 'sudo apt-get install --yes faketime'",
							"/bin/sh -c 'echo export LD_PRELOAD=/usr/lib/x86_64-linux-gnu/faketime/libfaketime.so.1 | sudo tee -a /etc/apache2/envvars'",
							"/bin/sh -c 'echo @2042-12-15 13:37:00 | sudo tee /etc/faketimerc'",
						],
						'tests-wordpress'
					) +
					' && ' +
					// hacky way to reload apache2... (apache2 does NOT support config reload)
					'docker ps --filter name=tests-wordpress -q | xargs docker restart' +
					' && ' +
					// make sure .htaccess gets regenerated on Apache
					// https://github.com/wp-cli/wp-cli/issues/1098#issuecomment-41231085
					this.makeCmd(
						[
							`/bin/sh -c 'touch wp-cli.yml'`,
							`/bin/sh -c 'echo "apache_modules:" >> wp-cli.yml'`,
							`/bin/sh -c 'echo "  - mod_rewrite" >> wp-cli.yml'`,
						],
						'tests-cli'
					),
			},
			env: {
				tests: {
					config: {
						AUTOSAVE_INTERVAL: 3600 * 24 * 365, // rough 1 yearly
						WP_POST_REVISIONS: false,
					},
				},
			},
		};

		const json = JSON.stringify(struct, undefined, 2);

		// hardcoded by @wordpress/env
		const fileName = '.wp-env.json';

		fs.writeFileSync(fileName, json);
	}

	private makeCmd(cmds: string | string[], type: Env | Env[]): string {
		const cmdsArr = typeof cmds === 'string' ? [cmds] : cmds;
		const envs = typeof type === 'string' ? [type] : type;
		const output: string[] = [];
		cmdsArr.forEach((cmd) => {
			envs.forEach((env) => {
				output.push(`yarn wp-env run ${env} ${cmd}`);
			});
		});
		return output.join(' && ');
	}

	private getEnvs(): Env[] {
		return ['mysql', 'tests-mysql', 'wordpress', 'tests-wordpress', 'cli', 'tests-cli', 'composer', 'phpunit'];
	}
}

export { WpEnv };
