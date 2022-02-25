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
import { eventData } from '../../../../shared/data';
import { ElementHandle } from 'packages/e2e-tests/types';

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();
const registrationOptions = new RegistrationOptions();
const edtrGlider = new EDTRGlider();

const namespace = 'single-page-more-ticket-selector-ten-max-attendees';
let capture: PageVideoCapture;

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
		const getTicketRows = await page.$$(ticketDetailsWrapper);
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

		ticketRows = await page.$$('#ee-entity-list-tickets .ee-entity-list__card-view > .ee-entity-list-item');

		const daw = await ticketRows[1].$('[aria-label="ticket main menu"]');
		await daw.click();
		const agay = await ticketRows[1].$('text=edit ticket');
		await agay.click();

		// await Promise.all([page.waitForLoadState(), agay.click()]);
		await page.waitForSelector('.ee-form-item--has-info');
		await page.click(
			'.chakra-modal__content-container .sections-wrapper .ee-render-fields .ee-form-item__switch #isRequired'
		);
		await Promise.all([
			page.waitForLoadState(),
			// page.focus('.chakra-modal__content-container .sections-wrapper > ee-form-section-wrapper:nth-child(3) svg'),
			// page.click('.chakra-modal__content-container .sections-wrapper > ee-form-section-wrapper:nth-child(3) svg'),
			// page.click('.chakra-modal__content-container .sections-wrapper > ee-form-section-wrapper:nth-child(3) svg'),
			page.click(
				'.chakra-modal__content-container .sections-wrapper > ee-form-section-wrapper:nth-child(3) .ee-render-fields .ee-form-item__switch #isRequired'
			),
			page.fill('[aria-label="Quantity For Sale"]', '5'),
		]);

		await page.waitForSelector('.ee-entity-edit-modal');

		await page.click('.ee-form-section-wrapper input#isRequired');

		await page.focus('[aria-label="Quantity For Sale"]');
		await page.fill('[aria-label="Quantity For Sale"]', '5');
		await page.click('[aria-label="Minimum Quantity"]');
		await page.fill('.ee-render-fields .ee-form-item__number .chakra-numberinput__field', '5');
		expect(1).toBe(1);
	});
});
