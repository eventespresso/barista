import { Command, Option } from '@commander-js/extra-typings';
import portfinder from 'portfinder';
import { resolve } from 'path';
import R from 'ramda';
import { copySync, existsSync, writeFileSync, readFileSync } from 'fs-extra';
import yaml from 'yaml';
import process from 'process';
import { Manifest } from '@eventespresso/e2e';

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

		if (existsSync(manifest.path)) {
			throw new Error(`Project already exists: \n${manifest.path}!`);
		}

		const paths = [cafe, barista];

		for (const p of paths) {
			if (!existsSync(p)) {
				throw new Error(`Invalid path: \n${p}!`);
			}
		}

		const source = resolve(__dirname, '.ddev');
		const target = resolve(manifest.path, '.ddev');

		// copies *recursively*
		// https://github.com/jprichardson/node-fs-extra/blob/HEAD/docs/copy-sync.md
		copySync(source, target);

		const configOverride: Override = {
			file: 'config.yaml',
			override: {
				name: manifest.project,
				router_http_port: opts.httpPort,
				router_https_port: opts.httpsPort,
			},
		};

		const overrides: Override[] = [configOverride, this.getDockerOverride()];

		for (const o of overrides) {
			const configPath = resolve(source, o.file);
			const configYaml = this.loadYamlConfig(configPath);
			const mergeFn = (l: any, r: any): any => {
				if (typeof l === 'object') return R.concat(l, r);
				return r;
			};
			const newConfig = R.mergeDeepWith(mergeFn, configYaml, o.override);
			const newPath = resolve(target, o.file);
			const newYaml = yaml.stringify(newConfig);
			writeFileSync(newPath, newYaml);
		}
	}

	public parseCliArgs(): void {
		const cmd = new Command();

		cmd.command('make-config', { isDefault: true })
			.description('make DDEV config')
			.argument('<project>', 'DDEV project name')
			.argument('<cafe>', 'path to cafe repository')
			.argument('<barista>', 'path to barista repository')
			.addOption(new Option('-p, --path <path>', 'Path where config will be saved to').default(undefined))
			.addOption(new Option('-h, --http-port <port>', 'HTTP port for Traefik router'))
			.addOption(new Option('-s, --https-port <port>', 'HTTPS port for Traefik router'))
			.action(async (project, cafe, barista, opts, cmd) => {
				const options: Options = {};
				if (opts.path) {
					options['path'] = opts.path;
				}
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
								source: process.env.CAFE,
								target: '/var/www/html/wp-content',
								type: 'bind',
								consistency: 'cached',
							},
							{
								source: process.env.BARISTA,
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
