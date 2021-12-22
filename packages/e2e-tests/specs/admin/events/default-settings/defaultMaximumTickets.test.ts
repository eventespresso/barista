import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, DefaultSettingsManager, EventsListSurfer, createNewEvent } from '@e2eUtils/admin';
import { eventData, defaultSettingsData, ticketData } from '../../../shared/data';

const defaultSettingsManager = new DefaultSettingsManager();
const eventsListSurfer = new EventsListSurfer();

const namespace = 'default-settings-default-maximum-tickets-allowed';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	// delete all events from view all events link
	await eventsListSurfer.deleteAllEventsByLink('View All Events');
	// delete all events from draft link
	await eventsListSurfer.deleteAllEventsByLink('Draft');
	// delete permanently all events at trash link
	await eventsListSurfer.deleteAllPermanentlyFromTrash();
	await Goto.eventsListPage();
});

afterAll(async () => {
	await capture?.stop();
});

describe('Default maximum tickets allowed test', () => {
	let countEvents: number;
	let getDefaultMaxBeforeChange: string;

	it('Count view all events link for test starting', async () => {
		// Get selected default status and return weither option value or innertext of the option
		countEvents = await defaultSettingsManager.getViewCount('View All Events');
		// assert the current selected registration status
		expect(countEvents).toBe(0);
	});

	it('Create new event for default maximum tickets allowed test', async () => {
		//create new event
		await createNewEvent({
			...eventData.upcoming,
		});
		await Goto.eventsListPage();
		// go to view all events
		const countEventsAfterCreatedNew = await defaultSettingsManager.getViewCount('View All Events');
		// get added event
		const countAddedEvent = countEventsAfterCreatedNew - countEvents;
		// assert event count
		expect(countEventsAfterCreatedNew).toBe(countAddedEvent + countEvents);
	});

	it('Change default maximum tickets allowed to two or two plus one if equal to default', async () => {
		await defaultSettingsManager.gotoDefaultSettings();
		// Get the default value set on default maximum ticket allowed field
		getDefaultMaxBeforeChange = await defaultSettingsManager.getDefaultMaxTicket();
		// check if defaul value for max ticket allowe is equal to two, if true add one else do nothing
		const toSetValue =
			defaultSettingsData.defaultMaxTicket === getDefaultMaxBeforeChange
				? Number(defaultSettingsData.defaultMaxTicket) + 1
				: defaultSettingsData.defaultMaxTicket;

		// Set new value for default maximum ticket allowed
		await defaultSettingsManager.setNewValueForDefaultMaxTIcket(String(toSetValue));
		await Goto.eventsListPage();
		//go to default settings tab
		await defaultSettingsManager.gotoDefaultSettings();
		// Get the default value set on default maximum ticket allowed field
		const getDefaultMaxAfterChange = await defaultSettingsManager.getDefaultMaxTicket();
		// get added number
		const getAdded = Number(getDefaultMaxAfterChange) - Number(getDefaultMaxBeforeChange);
		await Goto.eventsListPage();
		// assert before and after set new value for default maximum ticket allowed
		expect(Number(getDefaultMaxAfterChange)).toBe(getAdded + Number(getDefaultMaxBeforeChange));
	});

	it('Create sample ticket', async () => {
		// get the first event
		const firstItem = await defaultSettingsManager.getFirstListItem();
		// Get the action link for a list item given by text 'Edit'
		const restoreLink = await defaultSettingsManager.getItemActionLinkByText(firstItem, 'Edit');
		await page.goto(restoreLink);
		// Trigger add new ticket button
		await eventsListSurfer.clickAddNewTicket();
		// Create sample event ticket
		await eventsListSurfer.createTicketEvent(ticketData);
		await Goto.eventsListPage();
		// get the first event
		const firstItemAfterTicketAdded = await defaultSettingsManager.getFirstListItem();
		// Get the action link for a list item given by text 'Registrations'
		const restoreLinkAfterTicketAdded = await defaultSettingsManager.getItemActionLinkByText(
			firstItemAfterTicketAdded,
			'Registrations'
		);
		await page.goto(restoreLinkAfterTicketAdded);
		// Go to add new registration
		await defaultSettingsManager.goToAddNewReg();
		// Check if the value exist in select option innertext
		const checkSelectOptionValue = await defaultSettingsManager.checkSelectOptionValue(getDefaultMaxBeforeChange);
		// assert value in select option for default maximum ticket allowed
		expect(checkSelectOptionValue.trim()).toBe(getDefaultMaxBeforeChange);
	});
});
