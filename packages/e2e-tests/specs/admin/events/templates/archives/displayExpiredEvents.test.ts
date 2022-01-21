import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, TemplatesManager, createNewEvent, EventsListSurfer } from '@e2eUtils/admin';
import { eventData } from '../../../../shared/data';

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();

const namespace = 'templates-archives-display-expired-events';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await Goto.eventsListPage();
});

afterAll(async () => {
	await capture?.stop();
});

describe('Display expired events - archives test', () => {
	it('Create expired events', async () => {
		// count event first before creating one
		const countBeforeChecking = await templatesManager.goToViewAndCount('View All Events');
		// check if there is already existing event before creating one else edit first event
		if (!countBeforeChecking) {
			// create new event
			await createNewEvent({
				...eventData.expired,
				shouldPublish: false,
			});
		} else {
			// get the first event
			const firstItem = await templatesManager.getFirstListItem();
			// go to view action to edit events
			const restoreLink = await templatesManager.getItemActionLinkByText(firstItem, 'Edit');
			await page.goto(restoreLink);
			// remove filter events to show expired events
			await eventsListSurfer.removeEventDatesFilter();
		}
		await eventsListSurfer.setAndSaveEventDates({ ...eventData.expired });

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
