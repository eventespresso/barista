import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, TemplatesManager, createNewEvent, EventsListSurfer, DateEditor, EDTRGlider, DefaultSettingsManager } from '@e2eUtils/admin';
import { eventData, data } from '../../../../shared/data';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

const baristaPlugin = 'barista/ee-barista.php';

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();
const dateEditor = new DateEditor();
const edtrGlider = new EDTRGlider();
const defaultSettingsManager = new DefaultSettingsManager();

const namespace = 'templates-archives-display-expired-events';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await activatePlugin(baristaPlugin);
	
	await Goto.eventsListPage();
	//go to default settings tab
	await defaultSettingsManager.gotoDefaultSettings();
	await defaultSettingsManager.selectDefaultEditor('1');

	await Goto.eventsListPage();
});

afterAll(async () => {
	await deactivatePlugin(baristaPlugin);
	
	await capture?.stop();
});

describe('Display expired events - archives test', () => {
	it('Create expired events', async () => {
		// count event first before creating one
		const countBeforeChecking = await templatesManager.goToViewAndCount('View All Events');
		
		//Create New Event
		await createNewEvent({
			...eventData.expired,
			shouldPublish: false,
		});

		// get first evet in a list or by dbId if exist
		const item = await dateEditor.getItem();
		// update event date into expired one
		await dateEditor.editDate(item, {
			name: eventData.expired.title,
			description: eventData.expired.description,
			...data[0], // this data is for expired dates
		});

		await Promise.all([page.waitForNavigation(), page.click('#publish')]);

		await Goto.eventsListPage();
		const countAfterChecking = await templatesManager.goToViewAndCount('View All Events');
		// get the first event to check status
		const firstItem = await templatesManager.getFirstListItem();
		const getStatus = await eventsListSurfer.getEventStatus(firstItem);
		// assert if there is already event
		expect(countAfterChecking).toBeTruthy();
		// assert first event status, should be "Expired"
		expect(getStatus).toBe('Expired');
	});

	it('Set display expired events to "Yes"', async () => {
		await templatesManager.setAndSaveDisplayExpiredEvents({ value: '1' });
		const getSelected = await templatesManager.getSelectedDisplayExpiredEvents();
		// assert selected value for expired notice, suppose to "Yes"
		expect(getSelected).toBe('Yes');
		// now go to the frontend to verify that expired events do actually appear
		await templatesManager.gotoEventListing();
		// get the element container for expired notice
		const getExpiredNotice = await page?.$('.ee-event-expired-notice');
		// assert element container for expired notice
		expect(getExpiredNotice).toBeTruthy();
	});

	it('Set display expired events to "No"', async () => {
		await Goto.eventsListPage();
		await templatesManager.setAndSaveDisplayExpiredEvents({ value: '0' });
		const getSelected = await templatesManager.getSelectedDisplayExpiredEvents();
		// assert selected value for expired notice, suppose to "No"
		expect(getSelected).toBe('No');
		// now go to the frontend to verify that expired events are no longer displayed
		await templatesManager.gotoEventListing();
		// get the element container for expired notice
		const getExpiredNotice = await page?.$('.ee-event-expired-notice');
		// assert element container for expired notice, suppose to be null
		expect(getExpiredNotice).toBe(null);
	});
});
