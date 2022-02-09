import { saveVideo, PageVideoCapture } from 'playwright-video';
import { NOW } from '@eventespresso/constants';
import {
	Goto,
	TemplatesManager,
	EventsListSurfer,
	createNewEvent,
	EDTRGlider,
	addNewDate,
	addNewTicket,
} from '@e2eUtils/admin';
import { eventData } from '../../../../shared/data';

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();
const edtrGlider = new EDTRGlider();

const namespace = 'templates-ticket-selector-date-and-time-filter-threshold';
let capture: PageVideoCapture;

beforeAll(async () => {
	// capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await Goto.eventsListPage();
});

afterAll(async () => {
	// await capture?.stop();
});

describe('Date and time filter threshold - ticket selector test', () => {
	it('Create new sample event', async () => {
		const events = Object.values(eventData);
		const slicedEvents: any = events.slice(0, 2);

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
		// create sample event dates for date filter

		await addNewDate({
			description: eventData.upcoming.description,
			name: eventData.upcoming.title,
			singleDate: true,
		});

		// count event date after creating new event dates
		const countEventDateAfterCreate = await edtrGlider.countEventDates();
		// assert count after create, suppose to be count is equal to 3
		expect(countEventDateAfterCreate).toBeTruthy();

		// count tickets before creating new 3 tickets
		const countTicketBeforeCreate = await edtrGlider.countTickets();
		// assert count ticket before create new, suppose to be count ticket is equal to one by default
		expect(countTicketBeforeCreate).toBe(1);

		// create 3 sample tickets for date filter
		for (const iterator of [1, 2, 3]) {
			NOW.setDate(NOW.getDate() + iterator * 30);
			// This function is to trigger add new ticket then save after fill in all required fields
			await addNewTicket({
				name: 'Ticket test',
				description: 'Ticket test description',
				startDate: NOW,
			});
		}

		// publish after creating event dates and tickets
		await edtrGlider.saveEvent(true);
		// wait edtr container to load
		await page.waitForSelector('#ee-event-editor');

		// count tickets after creating new 3 tickets
		const countTicketAfterCreate = await edtrGlider.countTickets();
		// assert count ticket after create new 3 ticket, suppose to be equal to 4 because there is already existing 1 by default
		expect(countTicketAfterCreate).toBe(countTicketBeforeCreate + 3);

		// go back to event list main page
		await Goto.eventsListPage();

		// count event first before creating one
		const countAfterCreateEvent = await templatesManager.goToViewAndCount('View All Events');
		//assert count event
		expect(countAfterCreateEvent).toBeTruthy();
	});
});
