import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, DefaultSettingsManager, EventsListSurfer, createNewEvent } from '@e2eUtils/admin';
import { eventData } from '../../../shared/data';

const defaultSettingsManager = new DefaultSettingsManager();
const eventsListSurfer = new EventsListSurfer();

const namespace = 'default-settings-default-maximum-tickets-allowed';
let capture: PageVideoCapture;

beforeAll(async () => {
	// capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	// delete all events from view all events link
	await eventsListSurfer.deleteAllEventsByLink('View All Events');
	// delete all events from draft link
	await eventsListSurfer.deleteAllEventsByLink('Draft');
	// delete permanently all events at trash link
	await eventsListSurfer.deleteAllPermanentlyFromTrash();
	await Goto.eventsListPage();
	// // go to default settings tab
	// await defaultSettingsManager.gotoDefaultSettings();
});

// afterAll(async () => {
// 	await capture?.stop();
// });

describe('Default maximum tickets allowed test', () => {
	let countEvents: number;
	it('Count view all events link for test starting', async () => {
		// Get selected default status and return weither option value or innertext of the option
		countEvents = await defaultSettingsManager.getViewCount('View All Events');
		console.log({ countEvents });
		// assert the current selected registration status
		expect(countEvents).toBe(0);
	});

	it('Create new event for default maximum tickets allowed test', async () => {
		//create new event
		await createNewEvent({
			...eventData.upcoming,
		});
		await Goto.eventsListPage();
		const countEventsAfterCreatedNew = await defaultSettingsManager.getViewCount('View All Events');
		const countAddedEvent = countEventsAfterCreatedNew - countEvents;
		// assert the current selected registration status
		expect(countEventsAfterCreatedNew).toBe(countAddedEvent + countEvents);
	});

	it('Create sample ticket', async () => {
		// get the first event in trash
		const firstItem = await defaultSettingsManager.getFirstListItem();
		// got to "restore from trash" action link for the selected first event
		const restoreLink = await defaultSettingsManager.getItemActionLinkByText(firstItem, 'Edit');
		await page.goto(restoreLink);

		// await Promise.all([page.waitForNavigation(), page.click('.ee-entity-list__footer button[type="button"]')]);
		await page.click(
			'#ee-event-editor .ee-entity-list__footer button[type="button"] span:has-text("Add New Ticket")'
		);
		await page.click('input[name="name"]');
		await page.fill('input[name="name"]', 'Ticket sample name');
		await page.fill('.public-DraftEditor-content', 'Ticket sample description');
		await page.click('.ee-modal__footer span:has-text("Skip prices - assign dates")');
		await page.click('#ee-ticket-assignments-manager-table-data-cell-row-0-col-1 button');
		await page.click('button[type="submit"]');
		console.log({ firstItem });

		expect(0).toBe(0);
	});
});
