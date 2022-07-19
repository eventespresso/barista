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
	DefaultSettingsManager,
} from '@e2eUtils/admin';
import { eventData } from '../shared/data';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

const baristaPlugin = 'barista/ee-barista.php';

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();
const edtrGlider = new EDTRGlider();
const defaultSettingsManager = new DefaultSettingsManager();

const namespace = 'templates-ticket-selector-date-and-time-filter-threshold';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await activatePlugin(baristaPlugin);
	
	await Goto.eventsListPage();
	//go to default settings tab
	await defaultSettingsManager.gotoDefaultSettings();
	await defaultSettingsManager.selectDefaultEditor('1');

	await eventsListSurfer.deleteAllEventsByLink('View All Events');
	await Goto.eventsListPage();
});

afterAll(async () => {
	await deactivatePlugin(baristaPlugin);
	
	await capture?.stop();
});

describe('Date and time filter threshold - ticket selector test', () => {
	it('Create new sample event', async () => {
		// count event first before creating one
		const countBeforeCreating = await templatesManager.goToViewAndCount('View All Events');
		// assert count event before create one
		expect(countBeforeCreating).toBe(0);

		// create new event
		await createNewEvent({
			...eventData.upcoming,
			shouldPublish: false,
		});

		// create sample event dates for threshold
		const countBeforeCreateEventDate = await edtrGlider.countEventDates();
		// assert count even date before create one
		expect(countBeforeCreateEventDate).toBe(1);

		// create new event date
		await addNewDate({
			description: eventData.upcoming.description,
			name: eventData.upcoming.title
		});

		// count event date after creating new one
		const countAfterCreateEventDate = await edtrGlider.countEventDates();
		// assert count after create new event date, suppose to be count is equal to 2
		expect(countAfterCreateEventDate).toBe(countBeforeCreateEventDate + 1);

		// count tickets before creating new one
		const countBeforeTicketCreate = await edtrGlider.countTickets();
		// assert count ticket before create one
		expect(countBeforeTicketCreate).toBe(1);

		// remove first the filter to show pending and on sale ticket
		await edtrGlider.removeEventTicketDatesFilter();
		// create new ticket
		await addNewTicket({
			name: 'Ticket test',
			description: 'Ticket test description',
			startDate: NOW,
		});

		// publish after creating event dates and tickets
		await edtrGlider.saveEvent(true);

		// count tickets after creating new one tickets
		const countAfterTicketCreate = await edtrGlider.countTickets();
		// assert count ticket after creating one, suppose to be equal to 2
		expect(countAfterTicketCreate).toBe(countBeforeTicketCreate + 1);

		// go back to event list main page
		await Goto.eventsListPage();

		// count event after creating one
		const countAfterCreateEvent = await templatesManager.goToViewAndCount('View All Events');
		// assert count event after create one
		expect(countAfterCreateEvent).toBe(countBeforeCreating + 1);
	});

	it('Set display ticket selector to "Yes"', async () => {
		await templatesManager.gotoTemplates();
		// set display ticket selector to "Yes"
		await templatesManager.setAndSaveDisplayTicketSelector({ value: '1' });
		// get selected display ticket selector at templates archive section
		const getSelectedValue = await templatesManager.getSelectedDisplayTicketSelector();
		// assert selected value suppose to be "Yes"
		expect(getSelectedValue).toBe('Yes');
	});

	it('Set show date and time filter to "Maybe show date & time filter"', async () => {
		// set and save for show date & time filter at ticket selector template settings
		await templatesManager.setAndSaveShowDateAndTimeFilter({ value: 'maybe_datetime_selector' });
		// get selected value for show date & time filter  at ticket selector template settings
		const getSelectedValue = await templatesManager.getSelectedShowDateAndTimeFilter();
		// assert selected filter
		expect(getSelectedValue).toBe('Maybe show date & time filter');
	});

	it('Set date & time filter threshold to "2"', async () => {
		// set and save for date & time filter threshold at ticket selector template settings
		await templatesManager.setAndSaveDateAndTimeFilterThreshold({ value: '1' });
		// get selected value for date & time filter threshold at ticket selector template settings
		const getSelectedValue = await templatesManager.getSelectedDateAndTimeFilterThreshold();
		// assert selected threshold
		expect(getSelectedValue).toBe('1');

		// go to event listing page
		await templatesManager.gotoEventListing();
		// get filter text if exist after selecting 2 for threshold
		const getTextLabel = await (await page.$('span.checkbox-dropdown-selector-selected-spn')).innerText();
		// assert innert text for filter button
		expect(getTextLabel.trim().toLowerCase()).toBe('filter by date');
	});
});
