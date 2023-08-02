import { env } from 'process';
import { execSync, spawn } from 'child_process';
import { resolve } from 'path';
import { MakeConfig } from './MakeConfig';
import { ensurePathExists } from './common';
import { existsSync } from 'fs';
import { Command } from '@commander-js/extra-typings';
import dotenv from 'dotenv';
import { Manifest } from '@eventespresso/e2e';

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
		this.loadEnvVars();
		// the previous function as a type guard to ensure the env var bellow actually exist
		const repositories = { cafe: env['CAFE'] as string, barista: env['BARISTA'] as string };
		const manifest = new Manifest(project);
		await this.config.make(manifest, repositories);
		const start = spawn('ddev start', [], { cwd: manifest.cwd, shell: true, stdio: 'inherit' });
		start.on('message', (msg) => console.log(msg.toString));
		start.on('error', (err) => console.error(err.message));
		// block further execution and wait until spawn finishes
		// https://stackoverflow.com/a/69025854/4343719
		await new Promise((resolve) => start.on('close', resolve));
		const url = execSync('ddev get-url', { cwd: manifest.cwd })
			.toString()
			.replace(/\r?\n|\r/g, '');
		manifest.url = url;
		manifest.save();
	}

	public parseCliArgs(): void {
		const cmd = new Command();

		cmd.command('make-env', { isDefault: true })
			.argument('<project>', 'DDEV project name')
			.argument('<path>', 'Path where manifest will be saved to')
			.action((project, path) => {
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
}

export { MakeEnv };
