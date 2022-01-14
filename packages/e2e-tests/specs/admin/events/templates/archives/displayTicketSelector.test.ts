import { saveVideo, PageVideoCapture } from 'playwright-video';
import { TemplatesManager, VenuesManager } from '@e2eUtils/admin';
import { eventData, eventVenueData } from '../../../../shared/data';

const templatesManager = new TemplatesManager();
const venuesManager = new VenuesManager();

const namespace = 'templates-archives-display-ticket-selector';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
});

afterAll(async () => {
	await capture?.stop();
});

describe('Display ticket selector - archives test', () => {
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
				shouldPublish: false,
				venueTitle: eventVenueData.title,
			});
		// assert added event
		expect(countAfterCreate).toBe(countBeforeCreate + addedEvent);
		// assert venue title at first event
		expect(eventVenueData.title).toBe(getVenueTitle);
		expect(countAfterCreate).not.toBe(0);
	});

	it('Set display ticket selector to "Yes"', async () => {
		//  go to templates tab
		await templatesManager.gotoTemplates();
		// gett selected display ticket selector at templates archive section
		const getSelectedDisplayDescription = await templatesManager.getSelectedDisplayTicketSelector();
		// check if selected ticket selector is equal to "No" if true se to "Yes" else do nothing
		if (getSelectedDisplayDescription !== 'Yes') {
			// set display ticket selector to "Yes"
			await templatesManager.setAndSaveDisplayTicketSelector({ value: '1' });
		}
		// go to event listing url
		const getEventListingUrl = await templatesManager.getEventListingUrl();
		await page.goto(getEventListingUrl);
		// get ticket container at to event listing url
		const getTicketContainer = await page.$('.tkt-slctr-tbl-wrap-dv');
		// assert if ticket container is exist
		expect(getTicketContainer).toBeTruthy();
	});
});
