import { saveVideo, PageVideoCapture } from 'playwright-video';
import { NOW } from '@eventespresso/constants';
import {
	Goto,
	TemplatesManager,
	EventsListSurfer,
	createNewEvent,
	addNewDate,
	addNewTicket,
	EDTRGlider,
} from '@e2eUtils/admin';
import { eventData } from '../shared/data';

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();
const edtrGlider = new EDTRGlider();

const namespace = 'templates-ticket-selector-show-date-and-time-filter';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);

	await eventsListSurfer.deleteAllEventsByLink('View All Events');
	await Goto.eventsListPage();
});

afterAll(async () => {
	await capture?.stop();
});

describe('Show date and time filter - ticket selector test', () => {
	it('Create new sample events for date filter', async () => {
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
		// count event date before creating new 2 event dates
		const countEventDateBeforeCreate = await edtrGlider.countEventDates();
		// assert event dates before creating new, suppose to be equal to one for default existing one event date
		expect(countEventDateBeforeCreate).toBe(1);

		// create 2 sample event dates for date filter
		for (const event of slicedEvents) {
			// await eventsListSurfer.newEventDates(event);
			await addNewDate({ description: event.description, name: event.title});
		}

		// count event date after creating new 2 event dates
		const countEventDateAfterCreate = await edtrGlider.countEventDates();
		// assert count after create, suppose to be count is equal to 3
		expect(countEventDateAfterCreate).toBe(slicedEvents.length + countEventDateBeforeCreate);

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
		expect(countAfterCreateEvent).toBe(1);
	});

	it('Set date & time filter threshold to "2"', async () => {
		await templatesManager.gotoTemplates();
		// set and save for date & time filter threshold at ticket selector template settings
		await templatesManager.setAndSaveDateAndTimeFilterThreshold({ value: '2' });
		// get selected value for date & time filter threshold at ticket selector template settings
		const getSelectedValue = await templatesManager.getSelectedDateAndTimeFilterThreshold();
		// assert selected threshold
		expect(getSelectedValue).toBe('2');
	});

	it('Set show date & time filter to "Maybe show date & time filter"', async () => {
		await templatesManager.setAndSaveDisplayTicketSelector({ value: '1' });
		// set and save for show date & time filter at ticket selector template settings
		await templatesManager.setAndSaveShowDateAndTimeFilter({ value: 'maybe_datetime_selector' });
		// get selected value for show date & time filter  at ticket selector template settings
		const getSelectedValue = await templatesManager.getSelectedShowDateAndTimeFilter();
		// assert selected filter
		expect(getSelectedValue).toBe('Maybe show date & time filter');

		// set 1 in order to see the events in the next step
		await templatesManager.setAndSaveDateAndTimeFilterThreshold({ value: '1' });

		// go to event listing page
		await templatesManager.gotoEventListing();
		// get filter text
		const getTextLabel = await (await page.$('text= Filter by Date')).innerText();
		// assert innert text for filter button
		expect(getTextLabel.trim().toLowerCase()).toBe('filter by date');
			
		// trigger filter dropdown
		await page.click('.datetime_selector-dv button.checkbox-dropdown-selector-btn');
		// get all filter dropdown list
		const getFilterList = await page?.$$('.checkbox-dropdown-selector ul li');
		// assert dropdown list item
		expect(getFilterList.length).toBeTruthy();

		// count ticket list before uncheck all at event listing page
		const countSelectorBeforeHidden = await page?.$$('.tkt-slctr-tbl > tbody > tr.ee-hidden-ticket-tr');
		// assert dropdown before uncheck list item, suppose to be zero because theres no hidden ticket yet
		expect(countSelectorBeforeHidden.length).toBe(0);

		// uncheck all ticket filter
		for (const filter of getFilterList) {
			const checkbox = await filter.$('input.datetime-selector-option');
			await checkbox.uncheck();
		}
		// count ticket list after uncheck all at event listing page
		const countSelectorAfterHidden = await page?.$$('.tkt-slctr-tbl > tbody > tr.ee-hidden-ticket-tr');
		// assert dropdown after uncheck list item
		expect(countSelectorAfterHidden.length).toBeTruthy();
	});

	it('Set show date & time filter to "Do not show date & time filter"', async () => {
		await Goto.eventsListPage();
		await templatesManager.gotoTemplates();
		// selecte display ticket filter to not display
		await templatesManager.setAndSaveShowDateAndTimeFilter({ value: 'no_datetime_selector' });
		// get selected show date & time filter
		const getSelectedValue = await templatesManager.getSelectedShowDateAndTimeFilter();
		// assert selected value
		expect(getSelectedValue).toBe('Do not show date & time filter');

		// go to event listing page
		await templatesManager.gotoEventListing();
		// check if filter still exist suppose to be null
		const getTextLabel = await page?.$('text= Filter by Date');
		// assert checking filter
		expect(getTextLabel).toBeNull();
	});
});
