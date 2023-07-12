import { Browser, Page as PageType } from '@playwright/test';

type QueryParams = Record<string, string | number>;

class Navigate {
	private readonly protocol: string = 'http';
	private readonly hostname: string = 'localhost';
	private readonly port: number = 8889;

	public readonly routes = {
		home: this.makeSimpleUrl('/'),
		login: this.makeSimpleUrl('/wp-login.php'),
		admin: this.makeSimpleUrl('/wp-admin'),
		'admin:plugins': this.makeAdminUrl('plugins.php'),
		'admin:ee': this.makeAdminUrl('admin.php', { page: 'espresso_events' }),
		'admin:ee:maintenance': this.makeAdminUrl('admin.php', { page: 'espresso_maintenance_settings' }),
	};

	constructor(private readonly browser: Browser) {
		require('dotenv').config({
			path: '.wp-env',
		});

		// these defaults are taken from https://github.com/WordPress/gutenberg/tree/HEAD/packages/env#readme (tests environment)

		this.protocol = process.env.PROTOCOL ?? 'http';
		this.hostname = process.env.HOSTNAME ?? 'localhost';
		this.port = parseInt(process.env.PORT) ?? 8889;
	}

	public async to(key: keyof Navigate['routes'], opts: Parameters<Browser['newPage']>[0] = {}): Promise<PageType> {
		const page = await this.browser.newPage(opts);
		const url = this.routes[key];
		await page.goto(url);
		return page;
	}

	private addEndSlash(path: string) {
		return path.slice(-1) === '/' ? path : path + '/';
	}

	private addFwdSlash(path: string): string {
		return path[0] === '/' ? path : '/' + path;
	}

	private makeUrl({ path, query }: { path: string; query?: QueryParams }): string {
		const base = `${this.protocol}://${this.hostname}:${this.port}`;
		const queryStr = query ? '?' + this.convertQueryObjToStr(query) : '';
		path = this.addFwdSlash(path);
		// add trailing slash to path only if we *DON'T* have query params
		if (!queryStr) path = this.addEndSlash(path);
		return base + path + queryStr;
	}

	private convertQueryObjToStr(query: QueryParams): string {
		return Object.entries(query)
			.map(([k, v]) => k + '=' + v)
			.join('&');
	}

	private makeSimpleUrl(path: string): string {
		return this.makeUrl({ path });
	}

	private makeAdminUrl(page: 'admin.php' | 'plugins.php', query?: QueryParams): string {
		return this.makeUrl({ path: '/wp-admin/' + page, query });
	}
}

export { Navigate };
