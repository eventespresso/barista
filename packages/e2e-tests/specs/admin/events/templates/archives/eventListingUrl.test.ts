import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, TemplatesManager } from '@e2eUtils/admin';

const templatesManager = new TemplatesManager();

const namespace = 'templates-archives-event-listing-url';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await Goto.eventsListPage();
	await templatesManager.gotoTemplates();
});

afterAll(async () => {
	await capture?.stop();
});

describe('Event listings URL - archives test', () => {
	let getBaseUrl: string;
	let getEventSlug: string;

	it('Get the base url', async () => {
		// Get base URL at templates tab event listing pages
		getBaseUrl = await templatesManager.getBaseUrl();
		// assert base url if it is not empty
		expect(getBaseUrl).toBeTruthy();
	});

	it('Get the url slug', async () => {
		// Get event slug at templates tab event listing pages
		getEventSlug = await templatesManager.getEventSlug();
		// assert event slug if it is not empty
		expect(getEventSlug).toBeTruthy();
	});

	it('Get event listing url', async () => {
		// Get event listing URL at templates tab event listing pages
		const getEventListingUrl = await templatesManager.getEventListingUrl();
		// compose url and compare to event listing url
		const toCompareUrl = `${getBaseUrl.trim()}${getEventSlug && getEventSlug.trim()}/`;
		// assert compose url if equal to event listing url
		expect(getEventListingUrl).toBe(toCompareUrl);
	});
});
