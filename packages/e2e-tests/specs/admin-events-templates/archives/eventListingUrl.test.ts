import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, TemplatesManager, DefaultSettingsManager } from '@e2eUtils/admin';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

const baristaPlugin = 'barista/ee-barista.php';

const templatesManager = new TemplatesManager();
const defaultSettingsManager = new DefaultSettingsManager();

const namespace = 'templates-archives-event-listing-url';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await activatePlugin(baristaPlugin);
	
	await Goto.eventsListPage();
	//go to default settings tab
	await defaultSettingsManager.gotoDefaultSettings();
	await defaultSettingsManager.selectDefaultEditor('1');

	await Goto.eventsListPage();
	await templatesManager.gotoTemplates();
});

afterAll(async () => {
	await deactivatePlugin(baristaPlugin);
	
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
		if(getEventListingUrl !== `${getBaseUrl.trim()}?post_type=espresso_events`){
			expect(getEventListingUrl).toBe(toCompareUrl);
		}
	});
});
