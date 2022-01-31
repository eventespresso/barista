import { saveVideo, PageVideoCapture } from 'playwright-video';
import { addDays, addHours, subDays, subHours } from 'date-fns';
import { NOW } from '@eventespresso/constants';
import {
	Goto,
	TemplatesManager,
	EventsListSurfer,
	createNewEvent,
	createMultipleEvents,
	fillEventFields,
	EDTRGlider,
	DateFormatter,
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
		const slicedEvents: any = events.slice(0, 2);
		// console.log({ slicedEvents });

		// count event first before creating one
		const countBeforeChecking = await templatesManager.goToViewAndCount('View All Events');
		// check if there is already existing event before creating one else edit first event
		if (!countBeforeChecking) {
			// create new event
			await createNewEvent({
				...eventData.upcoming,
				shouldPublish: false,
			});
		} else {
			// get the first event
			const firstItem = await templatesManager.getFirstListItem();
			// go to view action to edit events
			const restoreLink = await templatesManager.getItemActionLinkByText(firstItem, 'Edit');
			await page.goto(restoreLink);
		}
		await eventsListSurfer.removeEventDatesFilter();
		await eventsListSurfer.setAndSaveEventDates({ ...eventData.upcoming });

		for (const iterator of slicedEvents) {
			await eventsListSurfer.newEventDates(iterator);
		}
		await eventsListSurfer.removeEventTicketDatesFilter();
		for (const iterator of [1, 2, 3]) {
			// startDate: DateFormatter.eventDateFormat(subDays(NOW, 1)),
			// endDate: DateFormatter.eventDateFormat(addDays(NOW, 1)),

			// await eventsListSurfer.setAndSaveEventTicketDates({
			// 	...eventData.upcoming,
			// 	startDate: DateFormatter.eventDateFormat(addDays(NOW, iterator * 30)),
			// 	shouldPublish: false,
			// });
			await eventsListSurfer.clickAddNewTicket();
			await page.click('.section-body #name');
			await page.fill('.section-body #name', 'Ticket one');
			await page.click('.public-DraftEditor-content');
			await page.fill('.public-DraftEditor-content', 'dateDescription');
			await page.fill('input#startDate', eventData.upcoming.startDate);
			await page.click('text=Skip prices - assign dates');
			// await page.fill('input#endDate', endDate);
			await page.click('#ee-ticket-assignments-manager-table-data-cell-row-0-col-1 button');
			await page.click('.ee-modal__footer button[type="submit"]');
			// await page.click('text=Add New Ticket');

			console.log({ iterator: DateFormatter.eventDateFormat(addDays(NOW, iterator * 30 + iterator)) });
			// await eventsListSurfer.newEventDates(iterator);
		}

		await eventsListSurfer.publishEventChanges(true);

		expect(1).toBeTruthy();
	});
});
