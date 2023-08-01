import { Command, Option } from '@commander-js/extra-typings';
import portfinder from 'portfinder';
import { resolve } from 'path';
import { tmpdir } from 'os';
import R from 'ramda';
import { copySync, existsSync, writeFileSync, readFileSync } from 'fs-extra';
import yaml from 'yaml';

type Override = {
	file: string;
	override: object;
};

class MakeConfig {
	constructor() {
		this.init();
	}

	private init(): void {
		const cmd = new Command();

		cmd.command('ddev', { isDefault: true })
			.argument('<project>', 'DDEV project name')
			.argument('<cafe>', 'path to cafe repository')
			.argument('<barista>', 'path to barista repository')
			.description('make DDEV config')
			.addOption(
				new Option('-h, --http-port <port>', 'HTTP port for Traefik router').default(this.getAvailablePort())
			)
			.addOption(
				new Option('-s, --https-port <port>', 'HTTPS port for Traefik router').default(this.getAvailablePort())
			)
			.action(async (project, cafe, barista, opts, cmd) => {
				const paths = [cafe, barista];

				for (const p of paths) {
					if (!existsSync(p)) {
						throw new Error(`Invalid path: ${p}!`);
					}
				}

				const name = this.sanitizeName(project);
				const source = resolve(__dirname, '.ddev');
				const target = resolve(tmpdir(), name, '.ddev');

				if (existsSync(target)) {
					throw new Error('Project already exists!');
				}

				// copies *recursively*
				// https://github.com/jprichardson/node-fs-extra/blob/HEAD/docs/copy-sync.md
				copySync(source, target);

				const httpPort = this.toInt(await opts.httpPort);
				const httpsPort = this.toInt(await opts.httpsPort);

				const configOverride: Override = {
					file: 'config.yaml',
					override: {
						name: name,
						router_http_port: httpPort,
						router_https_port: httpsPort,
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

	private toInt(input: string | number): number {
		if (typeof input === 'number') return input;
		return parseInt(input);
	}

	private sanitizeName(raw: string): string {
		const lowerCase = (input: string): string => {
			return input.toLowerCase();
		};
		const spacesToDashes = (input: string): string => {
			return input.replaceAll(' ', '-');
		};
		const stripIllegalChars = (input: string): string => {
			return input.replaceAll(/[^\w\-\d]/g, '');
		};
		const fnc: R.PipeWithFns<string, string> = [lowerCase, spacesToDashes, stripIllegalChars];
		const pipe = R.pipeWith((f, res) => f(res));
		return pipe(fnc)(raw);
	}

	private async getAvailablePort(): Promise<number> {
		return await portfinder.getPortPromise();
	}
}

export { MakeConfig };
