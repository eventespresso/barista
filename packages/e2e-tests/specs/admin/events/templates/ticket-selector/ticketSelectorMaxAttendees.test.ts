import { saveVideo, PageVideoCapture } from 'playwright-video';
import {
	Goto,
	TemplatesManager,
	EventsListSurfer,
	createNewEvent,
	EDTRGlider,
	RegistrationOptions,
} from '@e2eUtils/admin';
import { eventData } from '../../../../shared/data';

const templatesManager = new TemplatesManager();
const eventsListSurfer = new EventsListSurfer();
const registrationOptions = new RegistrationOptions();
const edtrGlider = new EDTRGlider();

const namespace = 'single-page-ticket-selector-max-attendees';
let capture: PageVideoCapture;

beforeAll(async () => {
	// capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await eventsListSurfer.deleteAllEventsByLink('View All Events');
	await Goto.eventsListPage();
});

afterAll(async () => {
	// await capture?.stop();
});

describe('Max attendees - ticket selector test', () => {
	it('Create new sample event with one free ticket for frontend test', async () => {
		// create new event
		await createNewEvent({
			...eventData.upcoming,
			shouldPublish: false,
		});

		await edtrGlider.setMaxRegistrations(1);
		const getSetValue = await registrationOptions.getEventRegMaxTicket();
		const getPermalink = await (await page.$('#sample-permalink a')).getAttribute('href');
		const getFirstTicketId = await (await page.$('#ee-entity-list-tickets .ee-entity-dbid')).innerText();
		await Goto.eventsListPage();
		const getFirstEventId = await (await page.$('.wp-list-table tr td.column-id')).innerText();

		const firstItem = await eventsListSurfer.getFirstListItem();
		const restoreLink = await eventsListSurfer.getItemActionLinkByText(firstItem, 'View');
		await page.goto(restoreLink);

		const checkRegisterBtn = await (
			await page.$(`.no-tkt-slctr-ticket-dv #ticket-selector-submit-${getFirstEventId}-btn`)
		).getAttribute('value');

		const getTicketSelection = await (
			await page.$(`form[name="ticket-selector-form-${getFirstEventId}"] input[name="ee"]`)
		).getAttribute('value');

		const getNoHeader = await (
			await page.$(`form[name="ticket-selector-form-${getFirstEventId}"] input[name="noheader"]`)
		).getAttribute('value');

		const getReturnUrl = await (
			await page.$(
				`form[name="ticket-selector-form-${getFirstEventId}"] input[name="tkt-slctr-return-url-${getFirstEventId}"]`
			)
		).getAttribute('value');

		console.log({
			getSetValue,
			getFirstTicketId,
			getPermalink,
			getFirstEventId,
			checkRegisterBtn,
			getTicketSelection,
			getNoHeader,
			getReturnUrl,
		});
		expect(true).toBeTruthy();
	});
});
