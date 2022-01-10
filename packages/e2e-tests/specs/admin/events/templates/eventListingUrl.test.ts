import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, TemplatesManager } from '@e2eUtils/admin';

const templatesManager = new TemplatesManager();

const namespace = 'templates-event-listing-url';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await Goto.eventsListPage();
	await templatesManager.gotoTemplates();
});

afterAll(async () => {
	await capture?.stop();
});

describe('Event listings URL test', () => {
	let getBaseUrl: string;
	let getEventSlug: string;

	it('Get the base url', async () => {
		getBaseUrl = await templatesManager.getBaseUrl();
		expect(getBaseUrl).toBeTruthy();
	});

	it('Get the url slug', async () => {
		getEventSlug = await templatesManager.getEventSlug();
		expect(getEventSlug).toBeTruthy();
	});

	it('Get event listing url', async () => {
		const getEventListingUrl = await templatesManager.getEventListingUrl();
		const toCompareUrl = `${getBaseUrl.trim()}${getEventSlug && getEventSlug.trim()}/`;
		expect(getEventListingUrl).toBe(toCompareUrl);
	});
});
