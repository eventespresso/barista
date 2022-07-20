import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, TemplatesManager } from '@e2eUtils/admin';

const templatesManager = new TemplatesManager();

const namespace = 'templates-archives-event-slug';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);

	await Goto.eventsListPage();
	await templatesManager.gotoTemplates();
});

afterAll(async () => {
	await capture?.stop();
});

describe('Event slug - archives test', () => {
	let getBaseUrl: string;

	it('Get the base url', async () => {
		// Get base URL at templates tab event listing pages
		getBaseUrl = await templatesManager.getBaseUrl();
		// assert base url if it is not empty
		expect(getBaseUrl).toBeTruthy();
	});

	it('Set event slug to "test"', async () => {
		// set event slug to "test"
		await templatesManager.setEventSlug('test');
		await templatesManager.saveTemplatesChanges();
		// get event slug if it is change to "test"
		const getEventSlug = await templatesManager.getEventSlug();
		// assert event slug
		expect(getEventSlug).toBe('test');
	});

	it('Check if slug at event listing url is also change into "test"', async () => {
		// Get event listing URL at templates tab event listing pages
		const getEventListingUrl = await templatesManager.getEventListingUrl();
		// compose url and compare to event listing url
		const toCompareUrl = `${getBaseUrl.trim()}test/`;
		// assert event listing url value, before and after update the event slug
		if(getEventListingUrl !== `${getBaseUrl.trim()}?post_type=espresso_events`){
			expect(getEventListingUrl).toBe(toCompareUrl);
		}
	});
});
