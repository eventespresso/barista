import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, EventsListSurfer, TemplatesManager, VenuesManager, DefaultSettingsManager } from '@e2eUtils/admin';
import { eventVenueData, eventData } from '../shared/data';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

const baristaPlugin = 'barista/ee-barista.php';

const templatesManager = new TemplatesManager();
const venuesManager = new VenuesManager();
const eventsListSurfer = new EventsListSurfer();
const defaultSettingsManager = new DefaultSettingsManager();

const namespace = 'templates-single-display-venue-details';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await activatePlugin(baristaPlugin);
	
	await Goto.eventsListPage();
	//go to default settings tab
	await defaultSettingsManager.gotoDefaultSettings();
	await defaultSettingsManager.selectDefaultEditor('1');

	// delete all events from view all events link
	await eventsListSurfer.deleteAllEventsByLink('View All Events');
	await eventsListSurfer.deleteAllEventsByLink('Draft');
	// delete permanently all events at trash link
	await eventsListSurfer.deleteAllPermanentlyFromTrash();
});

afterAll(async () => {
	await deactivatePlugin(baristaPlugin);
	
	await capture?.stop();
});

describe('Display venue details - single test', () => {
	it('Create new venue', async () => {
		// this function is to delete all venues first then create one and return the before and after count venue
		const { countAfterCreate, countBeforeCreate, addedVenue } = await venuesManager.processToCreateNewVenue(
			eventVenueData
		);
		// assert added venue
		expect(countAfterCreate).toBe(countBeforeCreate + addedVenue);
		expect(addedVenue).not.toBe(0);
	});

	it('Create new event and set created venue', async () => {
		// this function is to create new event first then assign the venue that already created then return before and after count event
		const { countAfterCreate, countBeforeCreate, addedEvent, getVenueTitle } =
			await venuesManager.processToAssignVenueAtEvent({
				...eventData.upcoming,
				shouldPublish: true,
				venueTitle: eventVenueData.title,
			});
		// assert added event
		expect(countAfterCreate).toBe(countBeforeCreate + addedEvent);
		// assert venue title at first event
		expect(eventVenueData.title).toBe(getVenueTitle);
		expect(countAfterCreate).not.toBe(0);
	});

	it('Set display venue details to "Yes" and check if venue title display at frontend single event', async () => {
		//  go to templates tab
		await templatesManager.gotoTemplates();
		// set and select display venue details to 'Yes'
		await templatesManager.setAndSaveDisplayVenueDetails({ value: '1', archive: false });
		// go to event main page
		await Goto.eventsListPage();
		// get the first event
		const firstItem = await venuesManager.getFirstListItem();
		// go to view action to check the venue details
		const restoreLink = await venuesManager.getItemActionLinkByText(firstItem, 'View');
		await page.goto(restoreLink);
		// check if venue title is exist at frontend single event
		const checkVenueContainer = await (await page.$('.espresso-venue-dv a span')).innerText();
		// assert venue title if exist
		expect(checkVenueContainer).toBe(eventVenueData.title);
	});
});