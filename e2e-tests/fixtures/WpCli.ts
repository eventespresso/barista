import { z } from 'zod';
import { constants } from '@eventespresso/e2e';
import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

class WpCli {
	private readonly cwd: string;

	constructor(project: string) {
		this.cwd = this.getCwd(project);
	}

	private getCwd(project: string): string {
		const path = this.getPath(project);
		const raw = readFileSync(path).toString();
		const data = JSON.parse(raw);
		const cwd = data['path'];
		if (!cwd) {
			throw new Error(`Broken DDEV manifest: \n${path}`);
		}
		if (!existsSync(cwd)) {
			throw new Error(`DDEV manifest not found at: \n${path}`);
		}
		return cwd;
	}

	private getPath(project: string): string {
		const base = constants.locations.manifests;
		const file = `${project}.json`;
		return resolve(base, file);
	}

	private exec(cmd: string): void {
		execSync(cmd, { cwd: this.cwd });
	}

	private createUser(credentials: UserCredentials, optionalArgs?: UserOptions): void {
		const user = userCredentials.parse(credentials);
		const options = userOptions.parse(optionalArgs);
		this.exec(`ddev wp user create ${user.email} ${user.email} --user_pass=${user.password} ${options}`);
	}

	public get user() {
		return {
			create: this.createUser,
		};
	}
}

const userCredentials = z.object({
	email: z.string().email(),
	password: z.string(),
});

type UserCredentials = z.infer<typeof userCredentials>;

const userOptions = z
	.object({
		role: z.enum(['admin', 'user']).default('admin'),
	})
	.transform((args) => {
		return Object.entries(args)
			.map(([k, v]) => `--${k}=${v}`)
			.join(' ');
	});

type UserOptions = z.infer<typeof userOptions>;

export { WpCli };
