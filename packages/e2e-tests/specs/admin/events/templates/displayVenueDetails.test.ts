import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, TemplatesManager, EDTRGlider, EventsListSurfer, createNewEvent, VenuesManager } from '@e2eUtils/admin';
import { eventVenueData, eventData } from '../../../shared/data';

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();
const venuesManager = new VenuesManager();
const edtrGlider = new EDTRGlider();

const namespace = 'templates-display-venue-details';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await Goto.eventsListPage();
	// Remove all events
	await eventsListSurfer.cleanUpEvents();
});

afterAll(async () => {
	await capture?.stop();
});

describe('Display venue details test', () => {
	it('Create new venue', async () => {
		await Goto.venuesPage();
		// create new venue
		await venuesManager.deleteAllVenue();
		// count venue before create one
		const countBeforeCreate = await venuesManager.getViewCount('View All Venues');
		// create new venue
		await venuesManager.createNewVenue(eventVenueData);
		// go to venue main page
		await Goto.venuesPage();
		// count venue after create one
		const countAfterCreate = await venuesManager.getViewCount('View All Venues');
		// count added venue
		const addedVenue = countAfterCreate - countBeforeCreate;
		// assert added venue
		expect(countAfterCreate).toBe(countBeforeCreate + addedVenue);
	});

	it('Create new event and set created venue', async () => {
		await Goto.eventsListPage();
		//count event before create one
		const countBeforeCreate = await venuesManager.getViewCount('View All Events');
		// fill in event fields and not published yet until venue is not selected
		await createNewEvent({ ...eventData.upcoming, shouldPublish: false });
		// set and select venue for event
		await venuesManager.setAndSelectVenue(eventVenueData.title);
		// now save the new event
		await edtrGlider.saveEvent(true);
		// go to event main page
		await Goto.eventsListPage();
		//count event after created one
		const countAfterCreate = await venuesManager.getViewCount('View All Events');
		// count added event
		const addedVenue = countAfterCreate - countBeforeCreate;
		// assert added event
		expect(countAfterCreate).toBe(countBeforeCreate + addedVenue);
	});

	it('Set display venue details to "Yes" and check if venue title display at frontend single event', async () => {
		//  go to templates tab
		await templatesManager.gotoTemplates();
		// set and select display venue details to 'Yes'
		await templatesManager.setAndSaveDisplayVenueDetails({ value: '1' });
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
