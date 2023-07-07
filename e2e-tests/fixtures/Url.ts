class Url {
	private readonly protocol: string = 'http';
	private readonly hostname: string = 'localhost';
	private readonly port: number = 8889;

	constructor() {}

	public get(subpath: string = ''): string {
		return this.make() + subpath;
	}

	private make(): string {
		return `${this.protocol}://${this.hostname}:${this.port}`;
	}
}

export { Url };
