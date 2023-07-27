import { Browser, Page as PageType } from '@playwright/test';
import { Url } from '@eventespresso/e2e';
import R, { PipeWithFns } from 'ramda';

type QueryParams = Record<string, string | number>;

class Navigate {
	public readonly routes = {
		home: this.makeSimpleUrl('/'),
		login: this.makeSimpleUrl('/wp-login.php'),
		admin: this.makeSimpleUrl('/wp-admin'),
		'admin:wp:plugins': this.makeAdminUrl('plugins.php'),
		'admin:ee:events': this.makeEventsUrl(),
		'admin:ee:events:new': this.makeEventsUrl({ action: 'create_new' }),
		'admin:ee:events:settings': this.makeEventsUrl({ action: 'default_event_settings' }),
		'admin:ee:maintenance': this.makeAdminUrl('admin.php', { page: 'espresso_maintenance_settings' }),
	};

	constructor(private readonly browser: Browser, private readonly url: Url) {}

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
		const { protocol, hostname, port } = this.url.getAll();
		const base = `${protocol}://${hostname}:${port}`;
		const queryStr = query ? '?' + this.convertQueryObjToStr(query) : '';
		// add trailing slash to path only if we *DON'T* have query params
		const normPath = this.normalizePath(path, !queryStr);
		return base + normPath + queryStr;
	}

	private normalizePath(path: string, trailingSlash: boolean): string {
		const fnc: PipeWithFns<string, string> = [this.addFwdSlash];
		if (trailingSlash) {
			fnc.push(this.addEndSlash);
		}
		const pipe = R.pipeWith((f, res) => f(res));
		return pipe(fnc)(path);
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
		const path = '/wp-admin/' + page;
		const args: Parameters<Navigate['makeUrl']>[0] = { path };
		if (query) {
			args.query = query;
		}
		return this.makeUrl(args);
	}

	private makeEventsUrl(query?: QueryParams): string {
		return this.makeAdminUrl('admin.php', { page: 'espresso_events', ...query });
	}
}

export { Navigate };
