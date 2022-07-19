import { saveVideo, PageVideoCapture } from 'playwright-video';
import {
	Goto,
	TemplatesManager,
	EventsListSurfer,
	createNewEvent,
	EDTRGlider,
	RegistrationOptions,
	DefaultSettingsManager,
} from '@e2eUtils/admin';
import { eventData } from '../../shared/data';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

const baristaPlugin = 'barista/ee-barista.php';

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();
const registrationOptions = new RegistrationOptions();
const edtrGlider = new EDTRGlider();
const defaultSettingsManager = new DefaultSettingsManager();

const namespace = 'single-page-free-ticket-selector-one-max-attendees';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await activatePlugin(baristaPlugin);
	
	await Goto.eventsListPage();
	//go to default settings tab
	await defaultSettingsManager.gotoDefaultSettings();
	await defaultSettingsManager.selectDefaultEditor('1');

	await eventsListSurfer.deleteAllEventsByLink('View All Events');
	await Goto.eventsListPage();
});

afterAll(async () => {
	await deactivatePlugin(baristaPlugin);
	
	await capture?.stop();
});

describe('One Max Attendees and free ticket - ticket selector test', () => {
	let getFirstEventId: string;
	let getPermalink: string;
	let getFirstTicketId: string;
	let getSetMaxValue: string;
	let getSelectorQty: string;

	it('Create new sample event with one free ticket for frontend test', async () => {
		// create new event
		await createNewEvent({
			...eventData.upcoming,
		});
		// set maximum registrations per transaction to 1 (max attendees)
		await edtrGlider.setMaxRegistrations(1);
		// get set max value for max attendees
		getSetMaxValue = await registrationOptions.getEventRegMaxTicket();
		// assert set max, suppose to be 1 after set
		expect(getSetMaxValue).toBe('1');

		// get permalink for examine DOM value at next test
		let selector = '#sample-permalink a';
		const checkTagExists = await page.$eval(selector, () => true).catch(() => false)
		if(!checkTagExists){
			selector = '#sample-permalink';
		}
		getPermalink = await (await page.$(selector)).getAttribute('href');
		// get free ticket ID for examine DOM value at next test
		getFirstTicketId = await (await page.$('#ee-entity-list-tickets .ee-entity-dbid')).innerText();

		// go back to event overview to count event created
		await Goto.eventsListPage();
		// suppose to be 1 after reset and created 1
		const countAfterCreateEvent = await templatesManager.goToViewAndCount('View All Events');
		// assert count event after reset and create 1
		expect(countAfterCreateEvent).toBe(1);
	});

	it('verify that only a submit button is displayed', async () => {
		// get first event
		const firstItem = await eventsListSurfer.getFirstListItem();
		// get first event ID for examine DOM value at next test
		getFirstEventId = await (await firstItem.$('td.column-id')).innerText();
		// go to frontend to test DOM value
		const restoreLink = await eventsListSurfer.getItemActionLinkByText(firstItem, 'View');
		await page.goto(restoreLink);
		// check if Register now label exist in ticket
		const checkRegisterBtn = await (
			await page.$(`.no-tkt-slctr-ticket-dv #ticket-selector-submit-${getFirstEventId}-btn`)
		).getAttribute('value');
		// assert label
		expect(checkRegisterBtn).toBe('Register Now');
	});

	it('examine DOM and verify that all tkt-slctr- input values are correct', async () => {
		// checl if value process_ticket_selections is exist
		const getTicketSelection = await (
			await page.$(`form[name="ticket-selector-form-${getFirstEventId}"] input[name="ee"]`)
		).getAttribute('value');
		// assert value
		expect(getTicketSelection).toBe('process_ticket_selections');

		// check no header value
		const getNoHeader = await (
			await page.$(`form[name="ticket-selector-form-${getFirstEventId}"] input[name="noheader"]`)
		).getAttribute('value');
		// assert no header value
		expect(getNoHeader).toBe('true');

		// check return url value
		const getReturnUrl = await (
			await page.$(
				`form[name="ticket-selector-form-${getFirstEventId}"] input[name="tkt-slctr-return-url-${getFirstEventId}"]`
			)
		).getAttribute('value');
		// assert return url value
		expect(getReturnUrl).toBe(`${getPermalink}#tkt-slctr-tbl-${getFirstEventId}`);

		// check ticket selector rows value
		const getSelectorRow = await (
			await page.$(
				`form[name="ticket-selector-form-${getFirstEventId}"] input[name="tkt-slctr-rows-${getFirstEventId}"]`
			)
		).getAttribute('value');
		// assert ticket selector rows value
		expect(getSelectorRow).toBe('1');

		// check ticket max attendeez value
		const getTicketMaxAttndz = await (
			await page.$(
				`form[name="ticket-selector-form-${getFirstEventId}"] input[name="tkt-slctr-max-atndz-${getFirstEventId}"]`
			)
		).getAttribute('value');
		// asset ticket max attendeez value
		expect(getTicketMaxAttndz).toBe(getSetMaxValue);

		// check ticket selector event id value
		const getSelectorEventId = await (
			await page.$(`form[name="ticket-selector-form-${getFirstEventId}"] input[name="tkt-slctr-event-id"]`)
		).getAttribute('value');
		// asset ticket selector event id value
		expect(getSelectorEventId).toBe(getFirstEventId);

		// check ticket selector QTY value
		getSelectorQty = await (
			await page.$(
				`form[name="ticket-selector-form-${getFirstEventId}"] input[name="tkt-slctr-qty-${getFirstEventId}[${getFirstTicketId}]"]`
			)
		).getAttribute('value');
		// assert ticket selector QTY value
		expect(getSelectorQty).toBe(getSetMaxValue);

		// check ticket selector ID
		const getSelectorTicketId = await (
			await page.$(
				`form[name="ticket-selector-form-${getFirstEventId}"] input[name="tkt-slctr-ticket-id-${getFirstEventId}[]"]`
			)
		).getAttribute('value');
		// assert ticket selector ID
		expect(getSelectorTicketId).toBe(getFirstTicketId);
	});

	it('click "Register Now" button and verify that checkout loads and selected ticket is correct', async () => {
		// tigger Register Now button
		await Promise.all([
			page.waitForNavigation(),
			page.click(`.no-tkt-slctr-ticket-dv #ticket-selector-submit-${getFirstEventId}-btn`),
		]);

		// get title event for ticket after trigger register
		const getEventForTicket = await (
			await page.$('table.spco-ticket-details tr td:nth-child(1) .line-item-desc-spn')
		).innerText();
		// assert title event for ticket after trigger register
		expect(getEventForTicket).toBe(`: (For ${eventData.upcoming.title})`);

		// check ticket quantity after trigger register
		const getTicketQty = await (await page.$('table.spco-ticket-details tr td:nth-child(2)')).innerText();
		// assert ticket quantity after register
		expect(getTicketQty).toBe(getSelectorQty);

		// check number of attendees after trigger register
		const getNumberAttendees = await (
			await page.$('#spco-step-attendee_information-display-hdr .spco-step-big-nmbr')
		).innerText();
		// assert number of attendees after trigger register
		expect(getNumberAttendees).toBe(getSetMaxValue);
	});
});
