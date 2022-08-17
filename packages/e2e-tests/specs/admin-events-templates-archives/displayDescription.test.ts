import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, TemplatesManager, EventsListSurfer, createNewEvent, EDTRGlider } from '@e2eUtils/admin';
import { eventData } from '../shared/data';

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();
const edtrGlider = new EDTRGlider();

const namespace = 'templates-archives-display-description';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);

	await eventsListSurfer.deleteAllEventsByLink('View All Events');
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

	// process to set display description and return selected status for checking
	const processToSetDisplayDescription = async ({
		status,
	}: {
		status: string;
	}): Promise<{
		getSelectedValue: string;
	}> => {
		//  go to templates tab
		await templatesManager.gotoTemplates();
		// set display description to "full description" and save
		await templatesManager.setAndSaveDisplayDescription({ status });
		// get the selected display description after selecting one
		const getSelectedValue = await templatesManager.getSelectedDisplayDescription();
		// go to event listing url
		const getEventListingUrl = await templatesManager.getEventListingUrl();
		await page.goto(getEventListingUrl);

		return { getSelectedValue };
	};

	it('Create new event if there is no existing one', async () => {
		await Goto.eventsListPage();
		
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
		// process to set display description and return selected status for checking
		const { getSelectedValue } = await processToSetDisplayDescription({ status: '2' });
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
		// process to set display description and return selected status for checking
		const { getSelectedValue } = await processToSetDisplayDescription({ status: '1' });
		// check and get excerpt value
		const getExcerptText = await (
			await page.$(`.event-content p a`)
		).innerText();
		
		// assert excerpt text
		expect(getExcerptText).toBeTruthy();
		// assert selected display description
		expect(getSelectedValue).toBe('excerpt (short desc)');
	});

	it('Set display description to "none"', async () => {
		await Goto.eventsListPage();
		// process to set display description and return selected status for checking
		const { getSelectedValue } = await processToSetDisplayDescription({ status: '0' });
		// get event description at archive link suppose to be null
		const getDescriptionAtArchiveLink = await page?.$(`.event-content p:has-text("${getFirstEventDescription}")`);

		// assert if selected display description is "none"
		expect(getSelectedValue).toBe('none');
		// assert if description is not there anymore after selected display to "none"
		expect(getDescriptionAtArchiveLink).not.toBe(getFirstEventDescription)
	});
});
