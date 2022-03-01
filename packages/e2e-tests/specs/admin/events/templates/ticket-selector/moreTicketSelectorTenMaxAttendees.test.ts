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
	TicketEditor,
} from '@e2eUtils/admin';
import { sub, add } from '@eventespresso/dates';
import { formatDateTime } from '@e2eUtils/common';
import { eventData, ticketData } from '../../../../shared/data';
// import { ElementHandle } from 'packages/e2e-tests/types';
import type { ElementHandle } from 'playwright-core';

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();
const registrationOptions = new RegistrationOptions();
const ticketEditor = new TicketEditor();
const edtrGlider = new EDTRGlider();

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
	let getTicketRows: ElementHandle<SVGElement | HTMLElement>[];
	const ticketAmount: number = 10;
	const ticketAmountPlusTax: string = (ticketAmount * 0.15 + ticketAmount).toFixed(2);
	const ticketDetails: {
		titles: string[];
		ids: string[];
	} = { titles: [], ids: [] };
	let ticketRows: any = [];

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
				setDirectPrice: true,
				amount: ticketAmount,
			});
		}

		// set maximum registrations per transaction to 10 (max attendees)
		await edtrGlider.setMaxRegistrations(10);
		// get set max value for max attendees
		getSetMaxValue = await registrationOptions.getEventRegMaxTicket();
		// assert set max, suppose to be 1 after set
		expect(getSetMaxValue).toBe('10');
		// get all tickets added
		ticketRows = await page.$$('#ee-entity-list-tickets .ee-entity-list__card-view > .ee-entity-list-item');

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

		const ticketDetailsWrapper = `table#tkt-slctr-tbl-${getFirstEventId} > tbody > tr.tckt-slctr-tbl-tr`;

		// get all ticket rows at frontend
		getTicketRows = await page.$$(ticketDetailsWrapper);
		// loop all tickets and check the value
		for (const [index, row] of getTicketRows.entries()) {
			// check ticket title
			const checkTicketTitle = await (await row.$('.tckt-slctr-tbl-td-name strong')).innerText();
			// assert ticket title
			expect(ticketDetails.titles.includes(checkTicketTitle)).toBeTruthy();

			// check ticket price
			const checkTicketPrice = await (await row.$('.tckt-slctr-tbl-td-price .tckt-price--nowrap')).innerText();
			// assert ticket price
			if (index === 0) {
				expect(checkTicketPrice).toBe(`$0.00 (USD)`);
				// await row.selectOption('td.tckt-slctr-tbl-td-qty select.ticket-selector-tbl-qty-slct', { value: '4' });
			} else {
				expect(checkTicketPrice).toBe(`$${ticketAmountPlusTax} (USD)`);
			}

			const checkFirstQtyOptions = await (
				await row.$('.ticket-selector-tbl-qty-slct option:first-child')
			).getAttribute('value');
			expect(checkFirstQtyOptions).toBe('0');

			const checkLastQtyOptions = await (
				await row.$('.ticket-selector-tbl-qty-slct option:last-child')
			).getAttribute('value');
			expect(checkLastQtyOptions).toBe('10');
			// console.log({ checkFirstQtyOptions, checkLastQtyOptions });

			// check radio button value
			const checkRadioBtnValue = await (
				await row.$('.tckt-slctr-tbl-td-qty input[type="hidden"]')
			).getAttribute('value');
			// assert radio button value
			expect(ticketDetails.ids.includes(checkRadioBtnValue)).toBeTruthy();
		}

		// const daw = await page.$('select.ticket-selector-tbl-qty-slct');
		// await getTicketRows[1].selectOption('select.ticket-selector-tbl-qty-slct', { value: '4' });
		await page.selectOption(`${ticketDetailsWrapper}:nth-child(3) select.ticket-selector-tbl-qty-slct`, {
			value: '4',
		});

		// const resultText = await (
		// 	await page.$(`${ticketDetailsWrapper}:nth-child(3) select.ticket-selector-tbl-qty-slct`)
		// ).getAttribute('value');
		getSetValueSecondRow = await page.$eval(
			`${ticketDetailsWrapper}:nth-child(3) select.ticket-selector-tbl-qty-slct`,
			(sel: any) => sel.value
		);
		console.log({ getSetValueSecondRow });
	});

	it('Trigger register button and check ticket details', async () => {
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
		expect(getTicketQty).toBe(getSetValueSecondRow);

		const getTicketPrice = await (await page.$('table.spco-ticket-details tr td:nth-child(3)')).innerText();
		// assert price
		expect(getTicketPrice).toBe(`$${ticketAmountPlusTax}`);

		const getTicketTotal = await (await page.$('table.spco-ticket-details tr td:nth-child(4)')).innerText();
		console.log({
			getDescriptionTicket,
			getTicketQty,
			getSetValueSecondRow,
			getSetMaxValue,
			getTicketTotal,
			ticketAmountPlusTax,
			daw: Number(ticketAmountPlusTax) * Number(getSetValueSecondRow),
		});
		// assert total
		expect(getTicketTotal).toBe(`$${(Number(ticketAmountPlusTax) * Number(getSetValueSecondRow)).toFixed(2)}`);
	});

	it('Set minimum ticket value to 4 and max value to 6 and test DOM value', async () => {
		await Goto.eventsListPage();
		// get first event
		const firstItem = await eventsListSurfer.getFirstListItem();
		getFirstEventId = await (await firstItem.$('td.column-id')).innerText();
		const restoreLink = await eventsListSurfer.getItemActionLinkByText(firstItem, 'Edit');
		await page.goto(restoreLink);

		ticketRows = await page.click(
			'#ee-entity-list-tickets .ee-entity-list__card-view > .ee-entity-list-item:nth-child(2) [aria-label="ticket main menu"]'
		);

		await page.click('#menu-list-71-menuitem-74');
		await page.focus('#min');
		await page.fill('#min', '4');
		await page.focus('#max');
		await page.fill('#max', '6');
		await page.click('#field-192-label');
		const isCheck = await page.isChecked('#isRequired');
		console.log({ isCheck });

		await page.click('text=Skip prices - assign dates');
		// await page.click('button[type=submit]');
		await Promise.all([page.waitForLoadState(), page.click('button[type=submit]')]);
		await Goto.eventsListPage();

		// get first event
		const firstItemAgain = await eventsListSurfer.getFirstListItem();
		// get first event ID for examine DOM value at next test
		getFirstEventId = await (await firstItemAgain.$('td.column-id')).innerText();

		// go to frontend to test DOM value
		const goToFrontEnd = await eventsListSurfer.getItemActionLinkByText(firstItemAgain, 'View');
		await page.goto(goToFrontEnd);

		const ticketDetailsWrapper = `table#tkt-slctr-tbl-${getFirstEventId} > tbody > tr.tckt-slctr-tbl-tr`;

		// get all ticket rows at frontend
		getTicketRows = await page.$$(ticketDetailsWrapper);

		for (const [index, row] of getTicketRows.entries()) {
			if (index === 1) {
				const checkFirstQtyOptions = await (
					await row.$('.ticket-selector-tbl-qty-slct option:first-child')
				).getAttribute('value');
				expect(checkFirstQtyOptions).toBe('4');

				const checkLastQtyOptions = await (
					await row.$('.ticket-selector-tbl-qty-slct option:last-child')
				).getAttribute('value');
				expect(checkLastQtyOptions).toBe('6');
				console.log({ checkFirstQtyOptions, checkLastQtyOptions });
			}
		}
	});

	it('Set ticket to expired and goes on sale', async () => {
		await Goto.eventsListPage();
		// get first event
		const firstItem = await eventsListSurfer.getFirstListItem();
		getFirstEventId = await (await firstItem.$('td.column-id')).innerText();
		const restoreLink = await eventsListSurfer.getItemActionLinkByText(firstItem, 'Edit');
		await page.goto(restoreLink);

		// get all tickets added
		ticketRows = await page.$$('#ee-entity-list-tickets .ee-entity-list__card-view > .ee-entity-list-item');
		console.log({ ticketRows: ticketRows.length });

		for (const ticket of ticketRows) {
			await ticket.click('.ee-container__sidebar--before .ee-edit-calendar-date-range-btn');
			// await ticketEditor.editTicket(ticket, ticketData.goesOnSale);
			// startDate: add('days', NOW, 20),
			// 		endDate: add('days', NOW, 22),
			// ee-dropdown-menu__list
			await page.click('.ee-dropdown-menu__list:nth-child(1)');
			const startDate = add('days', NOW, 20);
			const endDate = add('days', NOW, 22);
			await page.focus('input[aria-label="Start Date"]');
			await page.fill('input[aria-label="Start Date"]', await formatDate(startDate));

			await page.focus('input[aria-label="End Date"]');
			await page.fill('input[aria-label="End Date"]', await formatDate(endDate));
			await page.click('text=Skip prices - assign dates');
			// await page.click('button[type=submit]');
			await Promise.all([page.waitForLoadState(), page.click('button[type=submit]')]);
		}
		expect(1).toBe(1);
	});
});
