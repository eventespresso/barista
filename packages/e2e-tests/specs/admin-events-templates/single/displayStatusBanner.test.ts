import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, TemplatesManager, EventsListSurfer, createNewEvent, DefaultSettingsManager } from '@e2eUtils/admin';
import { SingleEventPageManager } from '@e2eUtils/frontend';
import { eventData } from '../../../../shared/data';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

const baristaPlugin = 'barista/ee-barista.php';

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();
const singleEventPageManager = new SingleEventPageManager();
const defaultSettingsManager = new DefaultSettingsManager();

const namespace = 'templates-single-display-status-banner';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await activatePlugin(baristaPlugin);
	
	await Goto.eventsListPage();
	//go to default settings tab
	await defaultSettingsManager.gotoDefaultSettings();
	await defaultSettingsManager.selectDefaultEditor('1');

	await Goto.eventsListPage();
	//  go to templates tab
	await templatesManager.gotoTemplates();
});

afterAll(async () => {
	await deactivatePlugin(baristaPlugin);
	
	await capture?.stop();
});

describe('Display status banner - single test', () => {
	it('Set display status banner to yes', async () => {
		// first set/select value at display status banner and save then return the innertext value selected
		const getSelectedValue = await templatesManager.setAndGetValueForDisplayStatusBanner({ status: '1' });
		// assert display status banner value, it should be equal to "Yes"
		expect(getSelectedValue.trim()).toBe('Yes');
	});

	it('Create new sample event', async () => {
		await Goto.eventsListPage();
		// count event from view all event link action
		const countEvent = await eventsListSurfer.getViewCount('View All Events');
		if (!countEvent) {
			await createNewEvent(eventData.upcoming);
			await Goto.eventsListPage();
		}
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
		// go to view action to check the banner
		const restoreLink = await eventsListSurfer.getItemActionLinkByText(firstItem, 'View');
		await page.goto(restoreLink);
		// get status banner text
		const checkBannerText = await singleEventPageManager.getBannerInnerText();
		// assert banner text
		expect(checkBannerText).toBe(eventStatusText);
	});
});
