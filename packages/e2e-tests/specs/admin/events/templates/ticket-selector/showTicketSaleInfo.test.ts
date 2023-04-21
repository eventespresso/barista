import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, TemplatesManager, EventsListSurfer, createNewEvent } from '@e2eUtils/admin';
import { SingleEventPageManager } from '@e2eUtils/frontend';
import { eventData } from '../../../../shared/data';

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();
const singleEventPageManager = new SingleEventPageManager();

const namespace = 'templates-ticket-selector-show-ticket-sale-info';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);

	await Goto.eventsListPage();
});

afterAll(async () => {
	await capture?.stop();
});

describe('Show ticket sale info - ticket selector test', () => {
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
		// get selected value for show ticket details to test show ticket sale info settings
		const getSelectedValue = await templatesManager.getSelectedShowTicketDetails();
		// assert selected value, suppose to be "Yes"
		expect(getSelectedValue).toBe('Yes');
	});

	it('Set show ticket sale info to "Yes', async () => {
		// set show ticket sale info to "Yes"
		await templatesManager.setAndSaveShowTicketSaleInfo({ value: '1' });
		// get selected value for show ticket sale info
		const getSelectedValue = await templatesManager.getSelectedShowTicketSaleInfo();
		// assert selected value suppose to be "Yes"
		expect(getSelectedValue).toBe('Yes');

		// go to event listing page
		await templatesManager.gotoEventListing();
		// show ticket details at event listing page
		await singleEventPageManager.showTicketDetails();
		// check if sold info is appear at ticket details
		const getSoldLabel = await (await singleEventPageManager.getSoldLabel()).innerText();
		// assert sold label after cheking
		expect(getSoldLabel.trim()).toBe('Sold');
	});

	it('Set show ticket sale info to "No', async () => {
		// go to main event page
		await Goto.eventsListPage();
		// set show ticket sale info to "Yes"
		await templatesManager.setAndSaveShowTicketSaleInfo({ value: '0' });
		// get selected value for show ticket sale info
		const getSelectedValue = await templatesManager.getSelectedShowTicketSaleInfo();
		// assert selected value suppose to be "No"
		expect(getSelectedValue).toBe('No');

		// go to event listing page
		await templatesManager.gotoEventListing();
		// show ticket details at event listing page
		await singleEventPageManager.showTicketDetails();
		// check if sold info is appear at ticket details, suppose to be null after selecting show to 'No
		const getSoldLabel = await singleEventPageManager.getSoldLabel();
		// assert sold label, suppose to be null
		expect(getSoldLabel).toBe(null);
	});
});
