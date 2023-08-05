import { Command, Option } from '@commander-js/extra-typings';
import portfinder from 'portfinder';
import { resolve } from 'path';
import R from 'ramda';
import { copySync, existsSync, writeFileSync, readFileSync } from 'fs-extra';
import yaml from 'yaml';
import { env } from 'process';
import { Manifest } from '@eventespresso/e2e';
import dotenv from 'dotenv';

type Override = {
	file: string;
	override: object;
};

type Options = {
	path?: string;
	httpPort?: number;
	httpsPort?: number;
};

type Repositories = {
	cafe: string;
	barista: string;
};

class MakeConfig {
	public async make(manifest: Manifest, repositories: Repositories, options?: Options): Promise<void> {
		const { cafe, barista } = repositories;

		const opts = {
			httpPort: options?.httpPort ?? (await this.getAvailablePort()),
			httpsPort: options?.httpsPort ?? (await this.getAvailablePort()),
		} as const;

		if (existsSync(manifest.cwd)) {
			throw new Error(`Project already exists: \n${manifest.cwd}!`);
		}

		const paths = [cafe, barista];

		for (const p of paths) {
			if (!existsSync(p)) {
				throw new Error(`Invalid path: \n${p}!`);
			}
		}

		const source = resolve(__dirname, '.ddev');
		const target = resolve(manifest.cwd, '.ddev');

		// copies *recursively*
		// https://github.com/jprichardson/node-fs-extra/blob/HEAD/docs/copy-sync.md
		copySync(source, target);

		const configOverride: Override = {
			file: 'config.yaml',
			override: {
				name: manifest.project,
				router_http_port: opts.httpPort,
				router_https_port: opts.httpsPort,
				web_environment: [`FREEZE_TIME=${this.getFreezeTime()}`],
			},
		};

		const overrides: Override[] = [configOverride, this.getDockerOverride()];

		for (const o of overrides) {
			const configPath = resolve(source, o.file);
			const configYaml = this.loadYamlConfig(configPath);
			const mergeFn = (l: any, r: any): any => {
				if (Array.isArray(l)) {
					return R.concat(l, r);
				}
				if (R.is(Object, l)) {
					return R.mergeAll([l, r]);
				}
				return r;
			};
			const newConfig = R.mergeDeepWith(mergeFn, configYaml, o.override);
			const newPath = resolve(target, o.file);
			const newYaml = yaml.stringify(newConfig);
			writeFileSync(newPath, newYaml);
		}
	}

	/**
	 * Always return 15th of the current month to avoid dealing with unexpected issues like today become yesterday when running E2E test on the last day of the months on the last hour
	 */
	private getFreezeTime(): string {
		const today = new Date();
		// we want *local* time to 15th 00:00:00 hence we are using UTC
		// https://stackoverflow.com/a/32648115/4343719
		// if timezone will become an issue, it can be addressed by
		//   - adjusting PlayWright config (client-side)
		//   - adjusting Docker container timezone (server-side)
		today.setUTCDate(15);
		today.setUTCHours(0, 0, 0, 0);
		return today.toISOString(); // ISO 8601 format
	}

	public parseCliArgs(): void {
		dotenv.config({
			path: resolve(__dirname, '.ddev-env'),
		});

		const cmd = new Command();

		cmd.command('make-config', { isDefault: true })
			.description('make DDEV config')
			.argument('<project>', 'DDEV project name')
			.argument('[cafe]', 'path to cafe repository', env['CAFE'])
			.argument('[barista]', 'path to barista repository', env['CAFE'])
			.addOption(new Option('-h, --http-port <port>', 'HTTP port for Traefik router'))
			.addOption(new Option('-s, --https-port <port>', 'HTTPS port for Traefik router'))
			.action(async (project, cafe, barista, opts) => {
				if (!cafe || !barista) {
					throw new Error('Unexpected runtime condition!');
				}
				const options: Options = {};
				if (opts.httpPort) {
					options['httpPort'] = parseInt(opts.httpPort);
				}
				if (opts.httpsPort) {
					options['httpsPort'] = parseInt(opts.httpsPort);
				}
				const manifest = new Manifest(project);
				await this.make(manifest, { cafe, barista });
			});

		cmd.parse();
	}

	private getDockerOverride(): Override {
		return {
			file: 'docker-compose.override.yaml',
			override: {
				services: {
					web: {
						volumes: [
							{
								source: env.CAFE,
								target: '/var/www/html/wp-content',
								type: 'bind',
								consistency: 'cached',
							},
							{
								source: env.BARISTA,
								target: '/var/www/html/wp-content/plugins/barista',
								type: 'bind',
								consistency: 'cached',
							},
						],
					},
				},
			},
		};
	}

	private loadYamlConfig(path: string): object {
		const contents = readFileSync(path).toString();
		const obj = yaml.parse(contents);
		if (typeof obj !== 'object') {
			throw new Error(`Expected object YAML schema for ${path}!`);
		}
		return obj;
	}

	private async getAvailablePort(): Promise<number> {
		return await portfinder.getPortPromise();
	}
}

export { MakeConfig };
