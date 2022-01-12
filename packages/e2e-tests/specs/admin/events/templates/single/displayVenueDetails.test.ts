import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, TemplatesManager, VenuesManager } from '@e2eUtils/admin';
import { eventVenueData, eventData } from '../../../../shared/data';

const templatesManager = new TemplatesManager();
const venuesManager = new VenuesManager();

const namespace = 'templates-single-display-venue-details';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
});

afterAll(async () => {
	await capture?.stop();
});

describe('Display venue details test', () => {
	it('Create new venue', async () => {
		// this function is to delete all venues first then create one and return the before and after count venue
		const { countAfterCreate, countBeforeCreate, addedVenue } = await venuesManager.processToCreateNewVenue(
			eventVenueData
		);
		// assert added venue
		expect(countAfterCreate).toBe(countBeforeCreate + addedVenue);
	});

	it('Create new event and set created venue', async () => {
		// this function is to create new event first then assign the venue that already created then return before and after count event
		const { countAfterCreate, countBeforeCreate, addedEvent, getVenueTitle } =
			await venuesManager.processToAssignVenueAtEvent({
				...eventData.upcoming,
				shouldPublish: false,
				venueTitle: eventVenueData.title,
			});
		// assert added event
		expect(countAfterCreate).toBe(countBeforeCreate + addedEvent);
		// assert venue title at first event
		expect(eventVenueData.title).toBe(getVenueTitle);
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
