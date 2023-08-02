import { tmpdir } from 'os';
import { env } from 'process';
import { execSync, spawn } from 'child_process';
import { resolve } from 'path';
import { MakeConfig } from './MakeConfig';
import { ensurePathExists, sanitizeStr } from './common';
import { existsSync, lstatSync, writeFileSync } from 'fs';
import { Command } from '@commander-js/extra-typings';
import dotenv from 'dotenv';

class MakeEnv {
	constructor(private readonly config: MakeConfig) {}

	/**
	 * @param project project name as specified in Playwright config
	 * @param path path where to save manifest file
	 */
	public async make(project: string, path: string): Promise<void> {
		if (!existsSync(path)) {
			ensurePathExists(path);
		}
		const manifestPath = this.makeManifestPath(project, path);
		if (existsSync(manifestPath)) {
			throw new Error(`Manifest already exists: \n${manifestPath}!`);
		}
		const projectPath = resolve(tmpdir(), sanitizeStr(project));
		const manifestData = {
			path: projectPath,
			url: 'to-be-obtained',
		};
		this.loadEnvVars();
		// the previous function as a type guard to ensure the env var bellow actually exist
		const repositories = { cafe: env['CAFE'] as string, barista: env['BARISTA'] as string };
		await this.config.make(project, repositories);
		const start = spawn('ddev start', [], { cwd: projectPath, shell: true, stdio: 'inherit' });
		start.on('message', (msg) => console.log(msg.toString));
		start.on('error', (err) => console.error(err.message));
		// https://stackoverflow.com/a/69025854/4343719
		await new Promise((resolve) => start.on('close', resolve));
		const url = execSync('ddev get-url', { cwd: projectPath });
		manifestData['url'] = url.toString().replace(/\r?\n|\r/g, '');
		writeFileSync(manifestPath, this.makeJson(manifestData));
	}

	public parseCliArgs(): void {
		const cmd = new Command();

		cmd.command('make-env', { isDefault: true })
			.argument('<project>', 'DDEV project name')
			.argument('<path>', 'Path where manifest will be saved to')
			.action((project, path, opts, cmd) => {
				this.make(project, path);
			});

		cmd.parse();
	}

	private loadEnvVars(): void {
		dotenv.config({
			path: resolve(__dirname, '.ddev-env'),
		});
		for (const e of ['CAFE', 'BARISTA']) {
			if (!env[e]) throw new Error(`Missing env var ${e} (either export it or use .ddev-env)`);
		}
	}

	private makeJson(obj: object): string {
		return JSON.stringify(obj, undefined, 2);
	}

	private makeManifestPath(project: string, path: string): string {
		const defaultName = `${sanitizeStr(project)}.json`;
		// supplied path is a directory path
		if (lstatSync(path).isDirectory()) {
			return resolve(path, defaultName);
		}
		// supplied path is a file path i.e. contains filename
		if (lstatSync(path).isFile()) {
			return resolve(path);
		}
		return resolve(tmpdir(), defaultName);
	}
}

export { MakeEnv };
