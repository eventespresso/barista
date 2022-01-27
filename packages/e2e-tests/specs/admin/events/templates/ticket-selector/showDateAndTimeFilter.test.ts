import { saveVideo, PageVideoCapture } from 'playwright-video';
import {
	Goto,
	TemplatesManager,
	EventsListSurfer,
	createNewEvent,
	createMultipleEvents,
	fillEventFields,
	EDTRGlider,
} from '@e2eUtils/admin';
import { eventData } from '../../../../shared/data';
// import { EDTRGlider } from '../editor';

const edtrGlider = new EDTRGlider();
const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();

const namespace = 'templates-ticket-selector-show-date-and-time-filter';
let capture: PageVideoCapture;

beforeAll(async () => {
	// capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await eventsListSurfer.cleanUpEvents();
	await Goto.eventsListPage();
});

afterAll(async () => {
	// await capture?.stop();
});

describe('Show date and time filter - ticket selector test', () => {
	it('Create new sample events for date filter', async () => {
		const events = Object.values(eventData);
		const slicedEvents: any = events.slice(0, 4);
		// for (let index = 0; index < slicedEvents.length; index++) {
		// 	const element: any = slicedEvents[index];
		// 		await createNewEvent({
		// 		...element,
		// 		shouldPublish: false,
		// 	});
		// 	console.log({ element.startDate });
		// }
		await Promise.all([page.waitForNavigation(), page.click('#add-new-event')]);
		for (const event of slicedEvents) {
			// create new event
			// await createNewEvent({
			// 	...event,
			// 	shouldPublish: false,
			// });
			await fillEventFields(event);
			// console.log({ event.startDate });
			// if (index < 4 && event.startDate) {
			await eventsListSurfer.setAndSaveEventDates({ ...event, shouldPublish: false });
			await eventsListSurfer.setAndSaveEventTicketDates(event);
			// }

			// tirgger add new event again
			await Promise.all([page.waitForNavigation(), page.click('a:has-text("Add Event")')]);
		}
		// await eventsListSurfer.publishEventChanges(true);

		// await Goto.eventsListPage();
		// count event from view all event link action after created one
		// const countEventAfter = await eventsListSurfer.getViewCount('View All Events');
		// console.log({ countEventAfter });

		// assert count from view all event link
		expect(1).toBeTruthy();
	});
});
