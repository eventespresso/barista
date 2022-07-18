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
import { eventData } from '../../../../shared/data';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

const baristaPlugin = 'barista/ee-barista.php';

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();
const edtrGlider = new EDTRGlider();
const defaultSettingsManager = new DefaultSettingsManager();

const namespace = 'templates-ticket-selector-date-and-time-filter-max-checked';
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

describe('Date and time filter max checked - ticket selector test', () => {
	let getSelectedMaxValue: string;

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

		for (const event of [1, 2, 3]) {
			NOW.setDate(NOW.getDate() + event * 30);
			// create new event date
			await addNewDate({
				name: `Event date title - test ${event}`,
				description: `Event date description - test ${event}`,
				startDate: NOW
			});
		}

		// remove first the filter to show pending and on sale ticket
		await edtrGlider.removeEventTicketDatesFilter();
		for (const ticket of [1, 2, 3]) {
			NOW.setDate(NOW.getDate() + ticket * 30);
			// create new ticket
			await addNewTicket({
				name: `Ticket date title - test ${ticket}`,
				description: `Ticket date description - test ${ticket}`,
				startDate: NOW,
			});
		}

		// publish after creating event dates and tickets
		await edtrGlider.saveEvent(true);

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
		await templatesManager.setAndSaveDateAndTimeFilterThreshold({ value: '2' });
		// get selected value for date & time filter threshold at ticket selector template settings
		const getSelectedValue = await templatesManager.getSelectedDateAndTimeFilterThreshold();
		// assert selected threshold
		expect(getSelectedValue).toBe('2');
	});

	it('Set date & time filter max checked to "2"', async () => {
		// set and save for date & time filter max checked at ticket selector template settings
		await templatesManager.setAndSaveDateAndTimeMax({ value: '2' });
		// get selected value for date & time filter max checked at ticket selector template settings
		getSelectedMaxValue = await templatesManager.getSelectedDateAndTimeMax();
		// assert selected filter max
		expect(getSelectedMaxValue).toBe('2');
	});

	it('Test if filter check only 2 checkboxes', async () => {
		// go to event listing page
		await templatesManager.gotoEventListing();
		// trigger filter dropdown
		await page.click('.datetime_selector-dv button.checkbox-dropdown-selector-btn');
		// get all filter dropdown list
		const getFilterList = await page?.$$('.checkbox-dropdown-selector ul li');

		// initialize count checked
		let countCheckedFilter = 0;
		// loop every checkbox
		for (const box of getFilterList) {
			// select checkbox
			const checkbox = await box.$('[type=checkbox]');
			// check if checkbox is checked
			const checkboxState = await checkbox.evaluate((node: any) => node.checked);
			// add count if true else do do nothing
			countCheckedFilter = checkboxState ? countCheckedFilter + 1 : countCheckedFilter;
		}

		// assert selected filter max
		expect(getSelectedMaxValue).toBe(String(countCheckedFilter));
	});
});
