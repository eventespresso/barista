import { Url } from '@eventespresso/e2e';
import { Browser, Page as PageType } from '@playwright/test';

type Params = {
	browser: Browser;
	url?: Url | undefined;
};

class Navigate {
	private readonly browser: Browser;
	private readonly url: Url;

	constructor({ browser, url }: Params) {
		this.browser = browser;
		this.url = url ?? new Url();
	}

	public async to(path: keyof typeof Pages): Promise<PageType> {
		const page = await this.browser.newPage();
		const url = this.url.get(Pages[path]);
		await page.goto(url);
		return page;
	}
}

const Pages = {
	events: '/wp-admin/admin.php?page=espresso_events',
};

export { Navigate };
