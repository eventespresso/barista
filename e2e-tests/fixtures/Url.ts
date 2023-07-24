class Url {
	public readonly protocol: string = 'http';
	public readonly hostname: string = 'localhost';
	public readonly port: number = 8889;

	constructor() {
		require('dotenv').config({
			path: '.wp-env',
		});

		// these defaults are taken from https://github.com/WordPress/gutenberg/tree/HEAD/packages/env#readme (tests environment)

		this.protocol = process.env.PROTOCOL ?? 'http';
		this.hostname = process.env.HOSTNAME ?? 'localhost';
		this.port = process.env.PORT ? parseInt(process.env.PORT) : 8889;
	}

	public getAll() {
		return {
			protocol: this.protocol,
			hostname: this.hostname,
			port: this.port,
		} as const;
	}
}

export { Url };
