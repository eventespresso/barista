import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, TemplatesManager, EventsListSurfer, createNewEvent } from '@e2eUtils/admin';
import { eventData } from '../shared/data';

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();

const namespace = 'templates-ticket-selector-show-ticket-details';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);

	await templatesManager.resetTicketSelectorSettings();

	await Goto.eventsListPage();
});

afterAll(async () => {
	await capture?.stop();
});

describe('Show ticket details - ticket selector test', () => {
	it('Create new sample event', async () => {
		// count event from view all event link action
		const countEvent = await eventsListSurfer.getViewCount('View All Events');
		if (!countEvent) {
			await createNewEvent(eventData.upcoming);
			await Goto.eventsListPage();
		}
		// count event from view all event link action after created one
		const countEventAfter = await eventsListSurfer.getViewCount('View All Events');
		// assert count from view all event link
		expect(countEventAfter).toBeTruthy();
	});

	it('Set show ticket details to "Yes', async () => {
		// set show ticket details to "Yes"
		await templatesManager.setAndSaveShowTicketDetails({ value: '1' });

		await templatesManager.setAndSaveDisplayTicketSelector({ value: '1' });

		// get selected value for show ticket details
		const getSelectedValue = await templatesManager.getSelectedShowTicketDetails();
		// assert selected value, suppose to be "Yes"
		expect(getSelectedValue).toBe('Yes');

		await templatesManager.gotoEventListing();
		// get innerHTML instead of innerText because there is some sort of uneexpected bevahiour when using innerText
		const getInnerHTML = await (await page.$('.display-tckt-slctr-tkt-details')).innerHTML();
		// assert innerHTML with &nbsp; on it's spacing
		expect(getInnerHTML).toBe('show&nbsp;details&nbsp;+');
	});

	it('Set show ticket details to "No', async () => {
		// to event page to test again
		await Goto.eventsListPage();
		// set show ticket details to "No"
		await templatesManager.setAndSaveShowTicketDetails({ value: '0' });
		// get selected value for show ticket details
		const getSelectedValue = await templatesManager.getSelectedShowTicketDetails();
		// assert selected value, suppose to be "No"
		expect(getSelectedValue).toBe('No');

		await templatesManager.gotoEventListing();
		// get innetHTML for checking
		const getInnerHTML = await page?.$('.display-tckt-slctr-tkt-details');
		// assert innerHTML, suppose to be null after selecting display "No"
		expect(getInnerHTML).toBe(null);
	});
});
