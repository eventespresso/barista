import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, DefaultSettingsManager, EventsListSurfer, createNewEvent } from '@e2eUtils/admin';
import { eventData, defaultSettingsData, ticketData } from '../../../shared/data';
import { Input } from '@chakra-ui/input';

const defaultSettingsManager = new DefaultSettingsManager();
const eventsListSurfer = new EventsListSurfer();

const namespace = 'default-settings-default-maximum-tickets-allowed';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await Goto.eventsListPage();
});

afterAll(async () => {
	await capture?.stop();
});

describe('Default maximum tickets allowed test', () => {
	let toSetValue: number | string;

	it('Create new event for default maximum tickets allowed test', async () => {
		//create new event
		await createNewEvent(eventData.upcoming);
		await Goto.eventsListPage();
		// check if added event is already exist in event list (check by event title)
		const checkAddedEvent = await eventsListSurfer.getRowsByDetails({ eventDetails: eventData.upcoming.title });
		// assert if event successfully created
		expect(checkAddedEvent.length).toBeTruthy();
	});

	it('Change default maximum tickets allowed to two or two plus one if equal to default', async () => {
		await defaultSettingsManager.gotoDefaultSettings();
		// Get the default value set on default maximum ticket allowed field
		const getDefaultMaxBeforeChange = await defaultSettingsManager.getDefaultMaxTicket();
		// check if defaul value for max ticket allowe is equal to two, if true add one else do nothing
		toSetValue =
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

	it('Check EDTR maximum number of tickets allowed are equal to new value', async () => {
		// get the first event
		const firstItem = await defaultSettingsManager.getFirstListItem();
		// Get the action link for a list item given by text 'Edit'
		const restoreLink = await defaultSettingsManager.getItemActionLinkByText(firstItem, 'Edit');
		await page.goto(restoreLink);
		// check maximum ticket allowed at EDTR
		const checkEDTRMaxTicket = await (await page.$('#max-registrants')).getAttribute('value');
		// assert maximum ticket allowed at EDTR
		expect(checkEDTRMaxTicket).toBe(toSetValue);
	});
});
