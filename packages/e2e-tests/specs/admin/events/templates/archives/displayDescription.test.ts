import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, TemplatesManager, EventsListSurfer, createNewEvent, EDTRGlider } from '@e2eUtils/admin';
import { eventData } from '../../../../shared/data';

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();
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
	// this variable is to assert first event title into archive
	let getFirstEventTitle: string;
	// this variable is to assert first event status into archive
	let getFirstEventStatus: string;
	// this variable is to assert first event description into archive
	let getFirstEventDescription: string;

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

	it('Set display description to "none"', async () => {
		await Goto.eventsListPage();
		// go to templates tab
		await templatesManager.gotoTemplates();
		// set display description to "none" and save
		await templatesManager.setAndSaveDisplayDescription({ status: '0' });
		// get the selected display description after selecting one
		const getSelectedValue = await templatesManager.getSelectedDisplayDescription();
		// get event description at archive link suppose to be null
		const getDescriptionAtArchiveLink = await page?.$(`.event-content > p`);

		// assert if selected display description is "none"
		expect(getSelectedValue).toBe('none');
		// assert if description is not there anymore after selected display to "none"
		expect(getDescriptionAtArchiveLink).toBe(null);
	});
});
