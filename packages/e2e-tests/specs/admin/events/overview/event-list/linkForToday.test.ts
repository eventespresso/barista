import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, ActiveEventsTest } from '@e2eUtils/admin';
import { eventData } from '../../../../shared/data';

const activeEventsTest = new ActiveEventsTest();

const namespace = 'events-today-clickable-actions-links';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await Goto.eventsListPage();
});

afterAll(async () => {
	await capture?.stop();
});

describe('Today link test', () => {
	let startDate: string;

	it('Create new event for active now ', async () => {
		// Create new event for active now
		const eventFirstItem = await activeEventsTest.createEventForActiveNow(eventData.todayOnly);
		// Assert return value if we already created event
		expect(eventFirstItem).toBeTruthy();
	});

	it('Trigger the edit of event and create a date format for update start date event', async () => {
		// Create new event for active now
		startDate = await activeEventsTest.createStartingDateFormat();
		// Assert return value if we already created formatted date
		expect(startDate).toBeTruthy();
	});

	it('Update the starting date of the new created event to today date to make the event active now', async () => {
		// go to event link and return total count events
		const countBeforeUpdate = await activeEventsTest.viewLinkAndCountEvents('Today');
		// Create new event for active now
		const countAfterUpdate = await activeEventsTest.updateStartingDateEvent(startDate, 'Today');
		// Assert return value event update and it is already active today
		expect(countBeforeUpdate).toBeLessThan(countAfterUpdate);
	});
});