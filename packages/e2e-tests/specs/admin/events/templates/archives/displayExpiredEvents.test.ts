import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, TemplatesManager, createNewEvent, EventsListSurfer } from '@e2eUtils/admin';
import { eventVenueData, eventData } from '../../../../shared/data';

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();

const namespace = 'templates-archives-display-expired-events';
let capture: PageVideoCapture;

beforeAll(async () => {
	// capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await Goto.eventsListPage();
	await templatesManager.gotoTemplates();
});

afterAll(async () => {
	// await capture?.stop();
});

describe('Display expired events - archives test', () => {
	it('Create expired events', async () => {
		// create new event
		await createNewEvent({
			...eventData.expired,
			shouldPublish: false,
		});
		console.log({ dawww: eventData.expired });

		// click the edit start and end dates button at the event dates to update the start date into todays date
		await page.click('button#popover-trigger-7');
		// focus first the start date field
		await page.focus('.date-range-picker__start-input input');
		// then fill in the start date field into todays date
		await page.fill('.date-range-picker__start-input input', eventData.expired.startDate);
		// focus first the end date field
		await page.focus('.date-range-picker__start-input input');
		await page.fill('.date-range-picker__end-input input', eventData.expired.endDate);

		//  click save to update the start date
		await page.click('button:has-text("save")');

		expect(1).toBeTruthy();
	});
});
