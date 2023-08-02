import { z } from 'zod';
import { Manifest } from '@eventespresso/e2e';
import { execSync } from 'child_process';

class WpCli {
	constructor(private readonly manifest: Manifest) {}

	private exec(cmd: string): void {
		execSync(cmd, { cwd: this.manifest.cwd });
	}

	private createUser(credentials: UserCredentials, optionalArgs?: UserOptions): void {
		const user = userCredentials.parse(credentials);
		const options = userOptions.parse(optionalArgs ?? {});
		const cmd = `ddev wp user create ${user.email} ${user.email} --user_pass=${user.password} ${options}`;
		this.exec(cmd);
	}

	public get user() {
		return {
			create: (credentials: UserCredentials, optionalArgs?: UserOptions): void => {
				this.createUser(credentials, optionalArgs);
			},
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
		role: z.enum(['administrator', 'subscriber']).default('administrator'),
	})
	.transform((args) => {
		return Object.entries(args)
			.map(([k, v]) => `--${k}=${v}`)
			.join(' ');
	});

type UserOptions = z.input<typeof userOptions>;

export { WpCli };
