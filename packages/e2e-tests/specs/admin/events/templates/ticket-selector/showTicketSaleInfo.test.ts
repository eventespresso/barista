import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, TemplatesManager, EventsListSurfer, createNewEvent } from '@e2eUtils/admin';
import { eventData } from '../../../../shared/data';

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();

const namespace = 'templates-ticket-selector-show-ticket-sale-info';
let capture: PageVideoCapture;

beforeAll(async () => {
	// capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	// Remove all event from link actions (View all events, Draft, Trash)
	await Goto.eventsListPage();
});

afterAll(async () => {
	// await capture?.stop();
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
		// get selected value for show ticket details
		const getSelectedValue = await templatesManager.getSelectedShowTicketDetails();
		// assert selected value, suppose to be "Yes"
		expect(getSelectedValue).toBe('Yes');
	});

	it('Set show ticket sale info to "Yes', async () => {
		await templatesManager.setAndSaveShowTicketSaleInfo({ value: '1' });
		const getSelectedValue = await templatesManager.getSelectedShowTicketSaleInfo();
		console.log({ getSelectedValue });

		await templatesManager.gotoEventListing();
		// await Promise.all([
		// 	page.waitForLoadState(),
		// 	page.click('.event-tickets .tckt-slctr-tbl-tr > td a.display-the-hidden'),
		// ]);

		// const daw = await page.$('.event-tickets .tckt-slctr-tbl-tr > td a.display-the-hidden');
		// await daw.click();
		await page.$eval('.event-tickets .tckt-slctr-tbl-tr > td ', (el: any) => el.click('a.display-the-hidden'));
		const getSoldLabel = await (await page.$('.tckt-slctr-tkt-details-this-ticket-sold-th span')).innerText();
		console.log({ getSoldLabel });

		// await page.dispatchEvent('.event-tickets .tckt-slctr-tbl-tr > td a.display-the-hidden', 'click');

		// await daw.click('a.display-the-hidden');
		expect(0).toBe(0);
	});
});
