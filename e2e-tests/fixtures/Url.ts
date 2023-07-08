class Url {
	private readonly protocol: string = 'http';
	private readonly hostname: string = 'localhost';
	private readonly port: number = 8889;

	constructor() {}

	private make(): string {
		return `${this.protocol}://${this.hostname}:${this.port}`;
	}

	public get(subpath: string = ''): string {
		return this.make() + subpath;
	}

	public home(): string {
		return this.get('/');
	}

	public admin(): string {
		return this.get('/wp-admin');
	}

	public plugins(): string {
		return this.get('/wp-admin/plugins.php');
	}
}

export { Url };
