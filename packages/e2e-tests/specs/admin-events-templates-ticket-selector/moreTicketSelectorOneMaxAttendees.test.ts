import { saveVideo, PageVideoCapture } from 'playwright-video';
import { NOW } from '@eventespresso/constants';
import {
	Goto,
	TemplatesManager,
	EventsListSurfer,
	createNewEvent,
	EDTRGlider,
	RegistrationOptions,
	addNewTicket,
} from '@e2eUtils/admin';
import { eventData } from '../shared/data';
import { activateTheme } from '@e2eUtils/admin/wp-themes-page';

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();
const registrationOptions = new RegistrationOptions();
const edtrGlider = new EDTRGlider();

const namespace = 'single-page-more-ticket-selector-one-max-attendees';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await activateTheme('twentytwenty');

	await eventsListSurfer.deleteAllEventsByLink('View All Events');
	await templatesManager.resetTicketSelectorSettings();
	await Goto.eventsListPage();
});

afterAll(async () => {
	await capture?.stop();
});

describe('One Max Attendees and more tickets - ticket selector test', () => {
	let getFirstEventId: string;
	let getSetMaxValue: string;
	const ticketDetails: {
		titles: string[];
		ids: string[];
	} = { titles: [], ids: [] };

	it('Create new sample event with more ticket for frontend test', async () => {
		// create new event
		await createNewEvent({
			...eventData.upcoming,
		});

		// remove first the filter to show pending and on sale ticket
		await edtrGlider.removeEventTicketDatesFilter();
		// add new three tickets
		for (const ticket of [1, 2, 3]) {
			NOW.setDate(NOW.getDate() - 10);

			// create new ticket
			await addNewTicket({
				name: `Ticket date title - test ${ticket}`,
				description: `Ticket date description - test ${ticket}`,
				startDate: NOW,
			});
		}

		// set maximum registrations per transaction to 1 (max attendees)
		await edtrGlider.setMaxRegistrations(1);
		// get set max value for max attendees
		getSetMaxValue = await registrationOptions.getEventRegMaxTicket();
		// assert set max, suppose to be 1 after set
		expect(getSetMaxValue).toBe('1');
		// get all tickets added
		const ticketRows = await page.$$('#ee-entity-list-tickets .ee-entity-list__card-view > .ee-entity-list-item');

		// loop all tickets and get ticket title and id
		for (const row of ticketRows) {
			// get id ticket
			const getTicketId = await (await row.$('.ee-entity-dbid')).innerText();
			// get ticket title
			const getTicketTitle = await (
				await row.$('.entity-card-details__name .ee-tabbable-text__inner_wrapper')
			).innerText();

			ticketDetails.titles.push(getTicketTitle);
			ticketDetails.ids.push(getTicketId);
		}

		// go back to event overview to count event created
		await Goto.eventsListPage();
		// suppose to be 1 after reset and created 1
		const countAfterCreateEvent = await templatesManager.goToViewAndCount('View All Events');
		// assert count event after reset and create 1
		expect(countAfterCreateEvent).toBe(1);
	});

	it('Check DOM value for tickets', async () => {
		// get first event
		const firstItem = await eventsListSurfer.getFirstListItem();
		// get first event ID for examine DOM value at next test
		getFirstEventId = await (await firstItem.$('td.column-id')).innerText();

		// go to frontend to test DOM value
		const restoreLink = await eventsListSurfer.getItemActionLinkByText(firstItem, 'View');
		await page.goto(restoreLink);

		// get all ticket rows at frontend
		const getTicketRows = await page.$$(`table#tkt-slctr-tbl-${getFirstEventId} > tbody > tr.tckt-slctr-tbl-tr`);
		// loop all tickets and check the value
		for (const row of getTicketRows) {
			// check ticket title
			const checkTicketTitle = await (await row.$('.tckt-slctr-tbl-td-name strong')).innerText();
			// assert ticket title
			const isTitleExist = ticketDetails.titles.includes(checkTicketTitle);
			expect(isTitleExist).toBe(true);

			// check ticket price
			const checkTicketPrice = await (await row.$('.tckt-slctr-tbl-td-price .tckt-price--nowrap')).innerText();
			// assert ticket price
			expect(checkTicketPrice).toBe('$0.00 (USD)');

			// check radio button value
			const checkRadioBtnValue = await (
				await row.$('.tckt-slctr-tbl-td-qty input[type="hidden"]')
			).getAttribute('value');
			// assert radio button value
			const isRadioBtnValueExist = ticketDetails.ids.includes(checkRadioBtnValue);
			expect(isRadioBtnValueExist).toBe(true);
		}
	});

	it('Trigger register button and check ticket details', async () => {
		// select one row of ticket before trigger register
		await page.click(`.tckt-slctr-tbl-td-qty input[value="${ticketDetails.ids[1]}-${getSetMaxValue}"]`);

		// tigger Register Now button
		await Promise.all([page.waitForNavigation(), page.click(`.ticket-selector-submit-btn`)]);

		// check desciption ticket
		const getDescriptionTicket = await (
			await page.$('table.spco-ticket-details tr td:nth-child(1) .line-item-desc-spn p')
		).innerText();
		// assert description ticket
		expect(getDescriptionTicket).toBe(ticketDetails.titles[1].replace('title', 'description'));

		// check ticket quantity after trigger register
		const getTicketQty = await (await page.$('table.spco-ticket-details tr td:nth-child(2)')).innerText();
		// assert quantity
		expect(getTicketQty).toBe('1');

		// check number of attendees after trigger register
		const getNumberAttendees = await (
			await page.$('#spco-step-attendee_information-display-hdr .spco-step-big-nmbr')
		).innerText();
		// assert max attendees
		expect(getNumberAttendees).toBe(getSetMaxValue);
	});
});
