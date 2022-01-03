import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, TemplatesManager, EventsListSurfer, createNewEvent } from '@e2eUtils/admin';
import { eventData } from '../../../shared/data';

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();

const namespace = 'templates-display-status-banner-category';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	// Remove all event from link actions (View all events, Draft, Trash)
	await Goto.eventsListPage();
	// Remove all event from link actions (View all events, Draft, Trash)
	await eventsListSurfer.cleanUpEvents();
	//  go to templates tab
	await templatesManager.gotoTemplates();
});

afterAll(async () => {
	await capture?.stop();
});

describe('Display status banner test', () => {
	it('Set display status banner to yes', async () => {
		// set display status banner to yes
		await templatesManager.selectStatusBanner({ value: '1' });
		// get selected display status banner value
		const getSelectedValue = await templatesManager.getSelectedStatusBanner({ text: true });
		// assert display status banner value, it should be equal to "Yes"
		expect(getSelectedValue.trim()).toBe('Yes');
	});

	it('Create new sample event', async () => {
		// create sample upcoming event
		await createNewEvent(eventData.upcoming);
		await Goto.eventsListPage();
		// count event from view all event link action
		const countEvent = await eventsListSurfer.getViewCount('View All Events');
		// assert count from view all event link
		expect(countEvent).toBeTruthy();
	});

	it('Check if banner exist', async () => {
		// get the first event
		const firstItem = await eventsListSurfer.getFirstListItem();
		// get status event
		const eventStatusText = await eventsListSurfer.getEventStatus(firstItem);
		// go to view action to check the banner
		const restoreLink = await eventsListSurfer.getItemActionLinkByText(firstItem, 'View');
		await page.goto(restoreLink);
		// get status banner text
		const checkBannerText = await templatesManager.getBannerInnerText();
		// assert banner text
		expect(checkBannerText).toBe(eventStatusText);
	});
});
