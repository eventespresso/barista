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

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();
const registrationOptions = new RegistrationOptions();
const edtrGlider = new EDTRGlider();

const namespace = 'single-page-more-ticket-selector-one-max-attendees';
let capture: PageVideoCapture;

beforeAll(async () => {
	// capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await eventsListSurfer.deleteAllEventsByLink('View All Events');
	await Goto.eventsListPage();
});

afterAll(async () => {
	// await capture?.stop();
});

describe('One Max Attendees and more ticket - ticket selector test', () => {
	let getFirstEventId: string;
	let getPermalink: string;
	let getFirstTicketId: string;
	let getSetMaxValue: string;
	let getSelectorQty: string;

	it('Create new sample event with more ticket for frontend test', async () => {
		// create new event
		await createNewEvent({
			...eventData.upcoming,
		});

		// remove first the filter to show pending and on sale ticket
		await edtrGlider.removeEventTicketDatesFilter();
		for (const ticket of [1, 2, 3]) {
			const daw = NOW.setDate(NOW.getDate() - 10);

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

		// get permalink for examine DOM value at next test
		getPermalink = await (await page.$('#sample-permalink a')).getAttribute('href');
		// get free ticket ID for examine DOM value at next test
		getFirstTicketId = await (await page.$('#ee-entity-list-tickets .ee-entity-dbid')).innerText();

		// go back to event overview to count event created
		await Goto.eventsListPage();
		// suppose to be 1 after reset and created 1
		const countAfterCreateEvent = await templatesManager.goToViewAndCount('View All Events');
		// assert count event after reset and create 1
		expect(countAfterCreateEvent).toBe(1);

		// get first event
		const firstItem = await eventsListSurfer.getFirstListItem();
		// get first event ID for examine DOM value at next test
		getFirstEventId = await (await firstItem.$('td.column-id')).innerText();

		// go to frontend to test DOM value
		const restoreLink = await eventsListSurfer.getItemActionLinkByText(firstItem, 'View');
		await page.goto(restoreLink);

		const getTicketRows = await page.$$(`table#tkt-slctr-tbl-${getFirstEventId} > tbody > tr.tckt-slctr-tbl-tr`);

		for (const row of getTicketRows) {
			const checkRadioBtn = await (
				await row.$('.tckt-slctr-tbl-td-qty input[type="radio"]')
			).getAttribute('value');
			console.log({ checkRadioBtn });
		}

		console.log({ getFirstTicketId, getFirstEventId, getTicketRows: getTicketRows.length });
	});
});
