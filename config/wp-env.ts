const fs = require('node:fs');

/**
 * @link https://github.com/WordPress/gutenberg/tree/HEAD/packages/env#readme
 */
class WpEnv {
	private readonly envVars: string[];
	private readonly plugins: string[];
	private readonly mappings: { [key: string]: string };
	private readonly lifecycleScripts: { [key: string]: string };
	private readonly wpConfig: { [key: string]: string | boolean | number };

	constructor() {
		require('dotenv').config({
			path: '.wp-env',
		});

		this.checkEnvVars();

		this.envVars = ['WP_CONTENT'];

		this.plugins = ['.'];

		// we skip optional property checking b/c checkEnvVars() does that
		this.mappings = {
			'wp-content': process.env.WP_CONTENT!,
		};

		this.lifecycleScripts = {
			afterStart: this.makeCmd(['wp plugin activate event-espresso-core'], 'dev'),
		};

		this.wpConfig = {
			WP_DEBUG: true,
			WP_DEBUG_DISPLAY: true,
			WP_DEBUG_LOG: true,
		};
	}

	private checkEnvVars(): void {
		for (const env in this.envVars) {
			if (!process.env[env]) throw new Error(`Missing env var ${env} (either export it or use .wp-env`);
		}
	}

	public makeConfig(): void {
		const struct = {
			config: this.wpConfig,
			mappings: this.mappings,
			plugins: this.plugins,
			lifecycleScripts: this.lifecycleScripts,
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

const wpEnv = new WpEnv();

wpEnv.makeConfig();
