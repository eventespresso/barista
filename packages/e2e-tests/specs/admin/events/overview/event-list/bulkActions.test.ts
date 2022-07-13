import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, EventsListSurfer, createMultipleEvents, DefaultSettingsManager } from '@e2eUtils/admin';
import { eventData } from '../../../../shared/data';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

const baristaPlugin = 'barista/ee-barista.php';

const eventsListSurfer = new EventsListSurfer();
const defaultSettingsManager = new DefaultSettingsManager();

const namespace = 'events-bulk-actions-links';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await activatePlugin(baristaPlugin);
	
	await Goto.eventsListPage();
	//go to default settings tab
	await defaultSettingsManager.gotoDefaultSettings();
	await defaultSettingsManager.selectDefaultEditor('1');

	// delete all events from view all events link
	await eventsListSurfer.deleteAllEventsByLink('View All Events');
	await eventsListSurfer.deleteAllEventsByLink('Draft');
	// delete permanently all events at trash link
	await eventsListSurfer.deleteAllPermanentlyFromTrash();

	await Goto.eventsListPage();
});

afterAll(async () => {
	await deactivatePlugin(baristaPlugin);
	
	await capture?.stop();
});

describe('Test overview bulk actions', () => {
	const events = Object.values(eventData);
	let countBeforeViewAllEvents: number;
	let countBeforeDraft: number;
	let countDraftAfterDeleteAll: number;

	it('Count events from view all events', async () => {
		// go to event link and get total count events
		countBeforeViewAllEvents = await eventsListSurfer.getViewCount('View All Events');
		// assert count events at view all events
		expect(countBeforeViewAllEvents).toBe(0);
	});

	it('Count events from draft', async () => {
		// go to event link and get total count events
		countBeforeDraft = await eventsListSurfer.getViewCount('Draft');
		// assert count events at draft
		expect(countBeforeDraft).toBe(0);
	});

	it('Create events for view all event link', async () => {
		// trigger add new event button
		await Promise.all([page.waitForNavigation(), page.click('#add-new-event')]);
		// create four events for view all event link test
		for (const event of events.slice(0, 4)) {
			await createMultipleEvents(event);
		}
		await Goto.eventsListPage();
		// count events from view all event link
		const countAfterAddedEvents = await eventsListSurfer.getViewCount('View All Events');
		const countAddedEvent = countAfterAddedEvents - countBeforeViewAllEvents;
		// assert the added events from view all event link
		expect(countAfterAddedEvents).toBe(countAddedEvent);
	});

	it('Create events for draft', async () => {
		// trigger add new event button
		await Promise.all([page.waitForNavigation(), page.click('#add-new-event')]);
		// create four events for draft link test
		for (const event of events.slice(0, 4)) {
			await createMultipleEvents({ shouldPublish: false, ...event });
		}
		await Goto.eventsListPage();

		// count events from draft link
		const countAfterAddedEvents = await eventsListSurfer.getViewCount('Draft');
		const countAddedEvent = countAfterAddedEvents - countBeforeDraft;
		// assert the added events from draft link
		expect(countAfterAddedEvents).toBe(countAddedEvent);
	});

	it('Remove all event from draft using bulk option', async () => {
		// remove all events from draft link
		await eventsListSurfer.deleteAllEventsByLink('Draft');
		await Goto.eventsListPage();
		// count events from draft after removing all events
		countDraftAfterDeleteAll = await eventsListSurfer.getViewCount('Draft');
		// assert left events from draft
		expect(countDraftAfterDeleteAll).toBe(0);
	});

	it('Restore two events from trash into draft using bulk option', async () => {
		// count event from trash before restore two events into draft
		const countTrashBeforeRestore = await eventsListSurfer.goToViewAndCount('Trash');
		// get events from trash
		const getEventsFromTrash = await eventsListSurfer.getListItems();
		// select the first two to events from trash and select those two
		for (const event of getEventsFromTrash.slice(0, 1)) {
			await eventsListSurfer.selectItemCheckbox(event);
		}
		// select restore from trash in bulk action
		await eventsListSurfer.selectBulkAction({ label: 'Restore From Trash' });
		// trigger the apply button to restore the two selected events
		await eventsListSurfer.applyBulkAction();
		// count again the remaining events from trash after restoring the two events
		const countTrashAfterRestore = await eventsListSurfer.getViewCount('Trash');
		const countLeftEvent = countTrashBeforeRestore - countTrashAfterRestore;
		// assert the remaining events from trash
		expect(countTrashAfterRestore).toBe(countTrashBeforeRestore - countLeftEvent);
	});

	it('Count event from draft after restore two events from trash', async () => {
		// count again the events from draft after restoring two events from trash
		const countDraftAfterRestore = await eventsListSurfer.getViewCount('draft');
		const countLeftEvent = countDraftAfterRestore - countDraftAfterDeleteAll;
		// assert the count events from draft after restore
		expect(countLeftEvent).toBe(countDraftAfterDeleteAll + countLeftEvent);
	});

	it('Remove permanently the remaining events from trash using bulk option', async () => {
		// delete the remaining events from trash permanently using bulk action
		await eventsListSurfer.deleteAllPermanentlyFromTrash();
		
		await eventsListSurfer.goToView('Trash');

		await Goto.eventsListPage();
		// count again the trash after deleting permanently the events from trash
		const countTrashAfterRemoveAllEvents = await eventsListSurfer.getViewCount('Trash');

		if(countTrashAfterRemoveAllEvents !== 0){
			await eventsListSurfer.deleteAllPermanentlyFromTrash();
			await Goto.eventsListPage();
		}

		// assert the remaining events from trash
		expect(countTrashAfterRemoveAllEvents).toBe(0);
	});

	it('Delete all events for all action links using bulk option', async () => {
		// remove all events from view all event link
		await eventsListSurfer.deleteAllEventsByLink('View All Events');
		// remove all events from draft
		await eventsListSurfer.deleteAllEventsByLink('Draft');
		// remove all events from trash
		await eventsListSurfer.deleteAllPermanentlyFromTrash();

		await eventsListSurfer.goToView('Trash');

		await Goto.eventsListPage();

		// count the remaining events from all action link
		let countTrashEvents = await eventsListSurfer.getViewCount('Trash');
		if(countTrashEvents !== 0){
			await eventsListSurfer.deleteAllPermanentlyFromTrash();
			await Goto.eventsListPage();
		}

		const countViewAllEvents = await eventsListSurfer.getViewCount('View All Events');
		const countDraftEvents = await eventsListSurfer.getViewCount('Draft');
		countTrashEvents = await eventsListSurfer.getViewCount('Trash');
		const countTodayEvent = await eventsListSurfer.getViewCount('Today');
		const countThisMonthEvent = await eventsListSurfer.getViewCount('This Month');

		// assert the remaining events from all action link
		expect(countViewAllEvents).toBe(0);
		expect(countDraftEvents).toBe(0);
		expect(countTrashEvents).toBe(0);
		expect(countTodayEvent).toBe(0);
		expect(countThisMonthEvent).toBe(0);
	});
});
