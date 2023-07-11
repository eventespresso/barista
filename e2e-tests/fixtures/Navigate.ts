import { Browser, Page as PageType } from '@playwright/test';
import R from 'ramda';

class Navigate {
	private readonly routes = {
		home: '/',
		login: '/wp-login.php',
		admin: '/wp-admin',
		'admin:plugins': '/wp-admin/plugins.php',
		'admin:ee': '/wp-admin/admin.php?page=espresso_events',
	};

	constructor(
		private readonly browser: Browser,
		private readonly protocol: string = 'http',
		private readonly hostname: string = 'localhost',
		private readonly port: number = 8889
	) {}

	public async to(key: keyof Navigate['routes'], opts: Parameters<Browser['newPage']>[0] = {}): Promise<PageType> {
		const page = await this.browser.newPage(opts);
		const url = this.get(key);
		await page.goto(url);
		return page;
	}

	public get(key: keyof Navigate['routes']): string {
		const path = this.normalizeSlash(this.routes[key]);
		return `${this.protocol}://${this.hostname}:${this.port}/${path}`;
	}

	private normalizeSlash(path: string): string {
		type CB = (path: string) => string;
		// remove slash from the front of the path
		const rmSlash: CB = (path) => (path[0] !== '/' ? path : path.slice(1));
		// add trailing slash to the path
		const addSlash: CB = (path) => (path.slice(-1) === '/' ? path : path + '/');
		return R.pipe(rmSlash, addSlash)(path);
	}
}

export { Navigate };
