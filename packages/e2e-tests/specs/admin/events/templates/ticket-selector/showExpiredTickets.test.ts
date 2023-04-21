import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, TemplatesManager, EventsListSurfer, createNewEvent, addNewTicket, EDTRGlider } from '@e2eUtils/admin';
import { eventData, data } from '../../../../shared/data';

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();
const edtrGlider = new EDTRGlider();

const namespace = 'templates-ticket-selector-show-expired-tickets';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);

	await Goto.eventsListPage();
});

afterAll(async () => {
	await capture?.stop();
});

describe('Show expired ticket - ticket selector test', () => {
	it('Create new sample event and assign expired ticket date', async () => {
		// count event first before creating one
		const countBeforeChecking = await templatesManager.goToViewAndCount('View All Events');
		// check if there is already existing event before creating one else edit first event
		if (!countBeforeChecking) {
			// create new event
			await createNewEvent({
				...eventData.upcoming,
				shouldPublish: false,
			});
		} else {
			// get the first event
			const firstItem = await templatesManager.getFirstListItem();
			// go to view action to edit events
			const restoreLink = await templatesManager.getItemActionLinkByText(firstItem, 'Edit');
			await page.goto(restoreLink);
		}
		// remove filter events to show expired tickets
		await edtrGlider.removeEventTicketDatesFilter();
		// create expired ticket
		await addNewTicket({
			...data[0], // expired dates
			name: eventData.expired.title,
			description: eventData.expired.description,
		});

		await Goto.eventsListPage();
		// count event from view all event link action after created one
		const countEventAfter = await eventsListSurfer.getViewCount('View All Events');
		// assert count from view all event link
		expect(countEventAfter).toBeTruthy();
	});

	it('Set display ticket selector to "Yes" - at archive section', async () => {
		await templatesManager.gotoTemplates();
		// set display ticket selector to "Yes"
		await templatesManager.setAndSaveDisplayTicketSelector({ value: '1' });
		// gett selected display ticket selector at templates archive section
		const getSelectedValue = await templatesManager.getSelectedDisplayTicketSelector();
		// assert selected value for display ticket selector, suppose to be "Yes"
		expect(getSelectedValue).toBe('Yes');
	});

	it('Set show expired tickets to "Yes', async () => {
		// set show expired tickets to "Yes"
		await templatesManager.setAndSaveShowExpiredTickets({ value: '1' });
		// get selected value for show expired tickets
		const getSelectedValue = await templatesManager.getSelectedShowExpiredTickets();
		// assert selected value, suppose to be "Yes"
		expect(getSelectedValue).toBe('Yes');

		// go to event listing page
		await templatesManager.gotoEventListing();
		// get qty label at ticket selector container, suppose to be qty label equal to "Expired"
		const getTicketExpireQty = await (await page.$('span.ticket-sales-expired')).innerText();
		// assert ticket qty label suppose to be expired, because ticket is set to expired date
		expect(getTicketExpireQty).toBe('Expired');
	});

	it('Set show expired tickets to "No', async () => {
		// go back to event main page
		await Goto.eventsListPage();
		// set show expired tickets to "No"
		await templatesManager.setAndSaveShowExpiredTickets({ value: '0' });
		// get selected value for show expired tickets
		const getSelectedValue = await templatesManager.getSelectedShowExpiredTickets();
		// assert selected value, suppose to be "No"
		expect(getSelectedValue).toBe('No');

		// go to event listing page
		await templatesManager.gotoEventListing();
		// get qty label at ticket selector container, suppose to be null
		const getTicketExpireQty = await page?.$('span.ticket-sales-expired');
		expect(getTicketExpireQty).toBe(null);

		// get the ticket notice after selecting show expired ticket to "No"
		const checkTicketNotice = await (await page.$('.event-tickets .important-notice')).innerText();
		expect(checkTicketNotice).toBeTruthy();
	});
});
