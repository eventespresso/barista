import { z } from 'zod';
import { constants, Manifest } from '@eventespresso/e2e';
import { execSync } from 'child_process';
import { resolve } from 'path';

class WpCli {
	constructor(private readonly manifest: Manifest) {}

	private exec(cmd: string): void {
		execSync(cmd, { cwd: this.manifest.path });
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
