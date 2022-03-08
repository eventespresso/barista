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
import { SingleEventPageManager } from '@e2eUtils/frontend';
import { sub, add } from '@eventespresso/dates';
import { formatDateTime } from '@e2eUtils/common';
import { eventData } from '../../../../shared/data';
import type { ElementHandle } from 'playwright-core';

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();
const registrationOptions = new RegistrationOptions();
const edtrGlider = new EDTRGlider();
const singleEventPageManager = new SingleEventPageManager();

const namespace = 'single-page-more-ticket-selector-ten-max-attendees';
let capture: PageVideoCapture;

const formatDate = formatDateTime();

beforeAll(async () => {
	// capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await eventsListSurfer.deleteAllEventsByLink('View All Events');
	await Goto.eventsListPage();
});

afterAll(async () => {
	// await capture?.stop();
});

describe('One Max Attendees and more tickets - ticket selector test', () => {
	let getFirstEventId: string;
	let getSetMaxValue: string;
	let getSetValueSecondRow: string;
	let frontendticketWrapper: string;
	let getTicketRows: ElementHandle<SVGElement | HTMLElement>[];
	const ticketAmount: number = 10;
	const ticketAmountPlusTax: string = (ticketAmount * 0.15 + ticketAmount).toFixed(2);
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
			const dateNow = NOW;
			// subtract 10 days to make ticket on sale
			const startDate = sub('days', dateNow, 10);
			// create new ticket
			await addNewTicket({
				name: `Ticket date title - test ${ticket}`,
				description: `Ticket date description - test ${ticket}`,
				startDate,
				setDirectPrice: true,
				amount: ticketAmount,
			});
		}

		// set maximum registrations per transaction to 10 (max attendees)
		await edtrGlider.setMaxRegistrations(10);
		// get set max value for max attendees
		getSetMaxValue = await registrationOptions.getEventRegMaxTicket();
		// assert set max, suppose to be 10 after set
		expect(getSetMaxValue).toBe('10');
		// get all tickets added
		const ticketRows = await edtrGlider.ticketRows();

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

		// go back to event overview
		await Goto.eventsListPage();
		// count event created, suppose to be 1 after reset and created 1
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
		frontendticketWrapper = await singleEventPageManager.getTicketwrapper(getFirstEventId);
		getTicketRows = await singleEventPageManager.getTicketRows(frontendticketWrapper);

		// loop all tickets and check it's value
		for (const [index, row] of getTicketRows.entries()) {
			// check ticket titile
			const checkTicketTitle = await (await row.$('.tckt-slctr-tbl-td-name strong')).innerText();
			// assert ticket title
			expect(ticketDetails.titles.includes(checkTicketTitle)).toBeTruthy();

			// check ticket price
			const checkTicketPrice = await (await row.$('.tckt-slctr-tbl-td-price .tckt-price--nowrap')).innerText();

			if (index === 0) {
				// assert price for free ticket, suppose to be $0.00
				expect(checkTicketPrice).toBe(`$0.00 (USD)`);
			} else {
				// assert other ticket price
				expect(checkTicketPrice).toBe(`$${ticketAmountPlusTax} (USD)`);
			}

			// check ticket minimun quatity
			const checkFirstQtyOptions = await (
				await row.$('.ticket-selector-tbl-qty-slct option:first-child')
			).getAttribute('value');
			// assert ticket minimum quantity
			expect(checkFirstQtyOptions).toBe('0');

			// check ticket maximum quantity
			const checkLastQtyOptions = await (
				await row.$('.ticket-selector-tbl-qty-slct option:last-child')
			).getAttribute('value');
			// assert ticket maximum quantity
			expect(checkLastQtyOptions).toBe('10');

			// check radio button value
			const checkRadioBtnValue = await (
				await row.$('.tckt-slctr-tbl-td-qty input[type="hidden"]')
			).getAttribute('value');
			// assert radio button value
			expect(ticketDetails.ids.includes(checkRadioBtnValue)).toBeTruthy();
		}

		const tableWrapper = `${frontendticketWrapper} table > tbody > tr.tckt-slctr-tbl-tr`;
		// set second ticket quantity rows to 4 before trigger register
		await page.selectOption(`${tableWrapper}:nth-child(3) select.ticket-selector-tbl-qty-slct`, {
			value: '4',
		});

		// check if second ticket quantity already set to 4
		getSetValueSecondRow = await page.$eval(
			`${tableWrapper}:nth-child(3) select.ticket-selector-tbl-qty-slct`,
			(sel: any) => sel.value
		);
		// assert ticket quantity set
		expect(getSetValueSecondRow).toBe('4');
	});

	it('Trigger register button and check ticket details', async () => {
		// tigger Register Now button
		await Promise.all([
			page.waitForNavigation(),
			page.click(`${frontendticketWrapper} .ticket-selector-submit-btn`),
		]);

		// check desciption ticket
		const getDescriptionTicket = await (
			await page.$('table.spco-ticket-details tr td:nth-child(1) .line-item-desc-spn p')
		).innerText();
		// assert description ticket
		expect(getDescriptionTicket).toBe(ticketDetails.titles[1].replace('title', 'description'));

		// check ticket quantity after trigger register
		const getTicketQty = await (await page.$('table.spco-ticket-details tr td:nth-child(2)')).innerText();
		// assert quantity
		expect(getTicketQty).toBe(getSetValueSecondRow);

		// check ticket price after register
		const getTicketPrice = await (await page.$('table.spco-ticket-details tr td:nth-child(3)')).innerText();
		// assert ticket price
		expect(getTicketPrice).toBe(`$${ticketAmountPlusTax}`);

		// check ticket total after register
		const getTicketTotal = await (await page.$('table.spco-ticket-details tr td:nth-child(4)')).innerText();
		// assert ticket total
		expect(getTicketTotal).toBe(`$${(Number(ticketAmountPlusTax) * Number(getSetValueSecondRow)).toFixed(2)}`);
	});

	it('Set minimum ticket value to 4 and max value to 6 and test DOM value', async () => {
		// go back to event overview
		await Goto.eventsListPage();
		// get first event
		const firstItem = await eventsListSurfer.getFirstListItem();

		// edit first event to update min and max ticket quantity
		const restoreLink = await eventsListSurfer.getItemActionLinkByText(firstItem, 'Edit');
		await page.goto(restoreLink);

		// select second ticket in a row and trigger main menu to update min and max ticket quantity
		await edtrGlider.ticketMainMenu(2);

		// click edit ticket
		await page.click('#menu-list-71-menuitem-74');
		// focus first the minimum quantity ticket field
		await page.focus('#min');
		// set minimum quantity ticket field
		await page.fill('#min', '4');
		// focus first the maximum quantity ticket field
		await page.focus('#max');
		// set maximum quantity ticket field
		await page.fill('#max', '6');
		// switch on for required ticket
		await page.click('text= Required Ticket');
		// check if required ticket already switch on
		const isCheck = await page.isChecked('#isRequired');
		// assert required ticket value
		expect(isCheck).toBe(true);

		// click skip prices
		await page.click('text=Skip prices - assign dates');
		// submit after updates
		await Promise.all([page.waitForLoadState(), page.click('button[type=submit]')]);
		// go back to event overview
		await Goto.eventsListPage();

		// get first event
		const firstEvent = await eventsListSurfer.getFirstListItem();

		// go to frontend again for DOM checking
		const goToFrontEnd = await eventsListSurfer.getItemActionLinkByText(firstEvent, 'View');
		await page.goto(goToFrontEnd);

		frontendticketWrapper = await singleEventPageManager.getTicketwrapper(getFirstEventId);
		// get all ticket at frontend
		getTicketRows = await singleEventPageManager.getTicketRows(frontendticketWrapper);

		// loop all ticket rows for checking
		for (const [index, row] of getTicketRows.entries()) {
			// check only the second ticket rows because that's the ticket we update for min and max quantity
			if (index === 1) {
				// check if minimum quantity already set to 4
				const checkFirstQtyOptions = await (
					await row.$('.ticket-selector-tbl-qty-slct option:first-child')
				).getAttribute('value');
				// assert minimum quantity value
				expect(checkFirstQtyOptions).toBe('4');

				// check if maximum quantity already set to 6
				const checkLastQtyOptions = await (
					await row.$('.ticket-selector-tbl-qty-slct option:last-child')
				).getAttribute('value');
				// assert maximum quantity value
				expect(checkLastQtyOptions).toBe('6');
			}
		}
	});

	it('Set ticket to expired and goes on sale', async () => {
		// go back to event overview
		await Goto.eventsListPage();
		// get first event
		const firstItem = await eventsListSurfer.getFirstListItem();
		// go to edtr to edit ticket
		const restoreLink = await eventsListSurfer.getItemActionLinkByText(firstItem, 'Edit');
		await page.goto(restoreLink);

		// get all ticket
		const edtrTicketRows = await edtrGlider.ticketRows();

		// loop all ticket to update start and end date
		for (const [index, ticket] of edtrTicketRows.entries()) {
			// set first two ticket to pending for goes on sale and others to expired
			if (index >= 0 && index <= 1) {
				// tirgger edit ticket date
				const triggerEdit = await ticket.$('button[aria-label="Edit Ticket Sale Dates"]');
				await triggerEdit.click();

				const dateNow = NOW;
				// plus 20 days for start date (for goes on sale/pending)
				const startDate = add('days', dateNow, 20);
				// plus 22 days for end date (for goes on sale/pending)
				const endDate = add('days', dateNow, 22);

				// focus first the field
				await page.focus('.date-range-picker__start-input input');
				// fill in start date value
				await page.fill('.date-range-picker__start-input input', await formatDate(startDate));

				// focus first the field
				await page.focus('.date-range-picker__end-input input');
				// fill in end date value
				await page.fill('.date-range-picker__end-input input', await formatDate(endDate));

				// save changes
				await Promise.all([page.waitForLoadState(), page.click('button[aria-label="save"]')]);
			} else {
				// tirgger edit ticket date
				const triggerEdit = await ticket.$('button[aria-label="Edit Ticket Sale Dates"]');
				await triggerEdit.click();

				const dateNow = NOW;
				// subtract 22 days for start date (for expired)
				const startDate = sub('days', dateNow, 22);
				// subtract 20 days for end date (for expired)
				const endDate = sub('days', dateNow, 20);

				// focus first the field
				await page.focus('.date-range-picker__start-input input');
				// fill in start date value
				await page.fill('.date-range-picker__start-input input', await formatDate(startDate));

				// focus first the field
				await page.focus('.date-range-picker__end-input input');
				// fill in end date value
				await page.fill('.date-range-picker__end-input input', await formatDate(endDate));
				// save changes
				await Promise.all([page.waitForLoadState(), page.click('button[aria-label="save"]')]);
			}
		}

		// loop all tickets and check it's status
		for (const [index, ticket] of edtrTicketRows.entries()) {
			// check first two ticket for pening and other for expired
			if (index >= 0 && index <= 1) {
				// get innertext status for pending
				const checkPendingStatus = await (await ticket.$('.ee-entity-status-label')).innerText();
				// assert status
				expect(checkPendingStatus).toBe('PENDING');
			} else {
				// get innertext status for expired
				const checkExpiredStatus = await (await ticket.$('.ee-entity-status-label')).innerText();
				// assert status
				expect(checkExpiredStatus).toBe('EXPIRED');
			}
		}
	});

	it('Test the DOM if goes on sale and expired ticket is reflected', async () => {
		// go back to event overview
		await Goto.eventsListPage();
		// go to templates tab first to enable the show expired ticket
		await templatesManager.gotoTemplates();

		// set show expired ticket to 'Yes'
		await templatesManager.setAndSaveShowExpiredTickets({ value: '1' });
		// check show expired ticket value
		const selectedValue = await templatesManager.getSelectedShowExpiredTickets();
		// assert selected value, suppose to be 'Yes' after set
		expect(selectedValue).toBe('Yes');

		// go back to event overview
		await Goto.eventsListPage();
		// get first event
		const firstItem = await eventsListSurfer.getFirstListItem();
		// go to frontend for DOM checking
		const restoreLink = await eventsListSurfer.getItemActionLinkByText(firstItem, 'View');
		await page.goto(restoreLink);

		frontendticketWrapper = await singleEventPageManager.getTicketwrapper(getFirstEventId);
		// get all ticket rows at frontend
		getTicketRows = await singleEventPageManager.getTicketRows(frontendticketWrapper);

		// loop tickets
		for (const [index, row] of getTicketRows.entries()) {
			// check first two tickets for 'Goes on sale' tickets and others for 'Expired' tickets
			if (index >= 0 && index <= 1) {
				// get ticket status at quantity
				const goesOnsale = await (await row.$('.tckt-slctr-tbl-td-qty span.ticket-pending')).innerHTML();
				// assert ticket quantity status
				expect(goesOnsale).toBe('Goes&nbsp;On&nbsp;Sale');
			} else {
				// get ticket status at quantity
				const expired = await (await row.$('.tckt-slctr-tbl-td-qty .ticket-sales-expired')).innerText();
				// assert ticket quantity status
				expect(expired).toBe('Expired');
			}
		}
	});
});
