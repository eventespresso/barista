import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, TemplatesManager, EventsListSurfer, createNewEvent, EDTRGlider, VenuesManager } from '@e2eUtils/admin';
import { eventData, eventVenueData } from '../../../../shared/data';

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();
const venuesManager = new VenuesManager();
const edtrGlider = new EDTRGlider();

const namespace = 'templates-archives-display-description';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
});

afterAll(async () => {
	await capture?.stop();
});

describe('Display description - archives test', () => {
	let getFirstVenueTitle: string;
	// this variable is to assert first event title into archive
	let getFirstEventTitle: string;
	// this variable is to assert first event status into archive
	let getFirstEventStatus: string;
	// this variable is to assert first event description into archive
	let getFirstEventDescription: string;

	it('Create new venue if there is no existing one', async () => {
		// this function is to delete all venues first then create one and return the before and after count venue
		const { countAfterCreate, countBeforeCreate, addedVenue } = await venuesManager.processToCreateNewVenue(
			eventVenueData
		);
		// get the first venue
		const firstItem = await venuesManager.getFirstListItem();
		getFirstVenueTitle = await venuesManager.getVenueName(firstItem);

		// assert added venue
		expect(countAfterCreate).toBe(countBeforeCreate + addedVenue);
		expect(addedVenue).not.toBe(0);
		expect(getFirstVenueTitle).toBeTruthy();
	});

	it('Create new event if there is no existing one', async () => {
		await Goto.eventsListPage();
		//count event if there is existing one or not
		const countBeforeCreate = await templatesManager.getViewCount('View All Events');
		if (!countBeforeCreate) {
			// create new event
			await createNewEvent({
				...eventData.upcoming,
				shouldPublish: false,
			});
			// set and select venue for event
			await venuesManager.setAndSelectVenue(getFirstVenueTitle);
			// get event description for assert
			getFirstEventDescription = eventData.upcoming.description;
			// get event title for assert
			getFirstEventTitle = eventData.upcoming.title;
			// get event status for assert
			getFirstEventStatus = eventData.upcoming.status;
			// now save the new event
			await edtrGlider.saveEvent(true);
		} else {
			// get the first event
			const firstItem = await eventsListSurfer.getFirstListItem();
			// get event title for assert
			getFirstEventTitle = await eventsListSurfer.getEventName(firstItem);
			// get event status for assert
			getFirstEventStatus = await eventsListSurfer.getEventStatus(firstItem);
			// go to view action to check the venue details
			const restoreLink = await eventsListSurfer.getItemActionLinkByText(firstItem, 'Edit');
			await page.goto(restoreLink);
			// set and select venue for event
			await venuesManager.setAndSelectVenue(getFirstVenueTitle);
			// wait to load venue content
			getFirstEventDescription = await (
				await page.$('#wp-content-editor-container textarea.wp-editor-area')
			).innerHTML();

			// now save the new event
			await edtrGlider.saveEvent(true);
		}
		await Goto.eventsListPage();
		// count event after checking
		const countAfterCheckEvent = await eventsListSurfer.getViewCount('View All Events');

		expect(getFirstEventDescription).toBeTruthy();
		expect(getFirstEventTitle).toBeTruthy();
		expect(getFirstEventStatus).toBeTruthy();
		// list of event should not equal to zero
		expect(countAfterCheckEvent).not.toBe(0);
	});

	it('Set display description to "full description"', async () => {
		//  go to templates tab
		await templatesManager.gotoTemplates();
		// set display description to "full description" and save
		await templatesManager.setAndSaveDisplayDescription({ status: '2' });
		// get the selected display description after selecting one
		const getSelectedValue = await templatesManager.getSelectedDisplayDescription();
		// go to event listing url
		const getEventListingUrl = await templatesManager.getEventListingUrl();
		await page.goto(getEventListingUrl);
		// get event description at archive link
		const getDescriptionAtArchiveLink = await (
			await page.$(`.event-content p:has-text("${getFirstEventDescription}")`)
		).innerText();

		// assert event description from event list and on archive link
		expect(getFirstEventDescription).toBe(getDescriptionAtArchiveLink);
		// assert selected display description
		expect(getSelectedValue).toBe('full description');
	});

	it('Set display description to "excerpt (short desc)"', async () => {
		await Goto.eventsListPage();
		// go to templates tab
		await templatesManager.gotoTemplates();
		// set display description to "excerpt (short desc)" and save
		await templatesManager.setAndSaveDisplayDescription({ status: '1' });
		// get the selected display description after selecting one
		const getSelectedValue = await templatesManager.getSelectedDisplayDescription();
		// go to event listing url
		const getEventListingUrl = await templatesManager.getEventListingUrl();
		await page.goto(getEventListingUrl);
		// check and get excerpt value
		const getExcerptText = await (
			await page.$(`.event-content a:has-text("Continue reading ${getFirstEventStatus}${getFirstEventTitle}")`)
		).innerText();

		// assert excerpt text
		expect(getExcerptText).toBe(`Continue reading ${getFirstEventStatus}${getFirstEventTitle}`);
		// assert selected display description
		expect(getSelectedValue).toBe('excerpt (short desc)');
	});
});
