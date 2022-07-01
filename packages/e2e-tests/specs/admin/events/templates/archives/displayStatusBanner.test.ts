import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, TemplatesManager, EventsListSurfer, createNewEvent } from '@e2eUtils/admin';
import { SingleEventPageManager } from '@e2eUtils/frontend';
import { eventData } from '../../../../shared/data';

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();
const singleEventPageManager = new SingleEventPageManager();

const namespace = 'templates-archives-display-status-banner';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await eventsListSurfer.deleteAllEventsByLink('View All Events');
	
	await Goto.eventsListPage();
	//  go to templates tab
	await templatesManager.gotoTemplates();
});

afterAll(async () => {
	await capture?.stop();
});

describe('Display status banner - archives test', () => {
	it('Set display status banner to yes', async () => {
		// first set/select value at display status banner and save then return the innertext value selected
		const getSelectedValue = await templatesManager.setAndGetValueForDisplayStatusBanner({ status: '1' });
		// set the display status banner true for the archive
		await templatesManager.setAndSaveDisplayStatusBanner({status: '1', single: false})
		// assert display status banner value, it should be equal to "Yes"
		expect(getSelectedValue).toBe('Yes');
	});

	it('Create new sample event', async () => {
		await createNewEvent(eventData.upcoming);
		
		await Goto.eventsListPage();

		// count event from view all event link action after created one
		const countEventAfter = await eventsListSurfer.getViewCount('View All Events');
		// assert count from view all event link
		expect(countEventAfter).toBeTruthy();
	});

	it('Check if banner exist', async () => {
		// get the first event
		const firstItem = await eventsListSurfer.getFirstListItem();
		// get status event
		const eventStatusText = await eventsListSurfer.getEventStatus(firstItem);
		//  go to templates tab
		await templatesManager.gotoTemplates();
		// Get event listing URL at templates tab event listing pages
		const getEventListingUrl = await templatesManager.getEventListingUrl();
		// go to event listing url
		await page.goto(getEventListingUrl);
		// get status banner text
		const checkBannerText = await singleEventPageManager.getBannerInnerText();
		// assert banner text
		expect(eventStatusText).toBe(checkBannerText);
	});
});
