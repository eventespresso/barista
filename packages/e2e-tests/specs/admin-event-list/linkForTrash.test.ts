import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, EventsListSurfer, createNewEvent, DefaultSettingsManager } from '@e2eUtils/admin';
import { eventData } from '../../../../shared/data';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

const baristaPlugin = 'barista/ee-barista.php';

const eventsListSurfer = new EventsListSurfer();
const defaultSettingsManager = new DefaultSettingsManager();

const namespace = 'events-trash-clickable-actions-links';
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
	// delete permanently all events at trash link
	await eventsListSurfer.deleteAllPermanentlyFromTrash();
	// Loop and create event base on the eventData
	for (const args of Object.values(eventData)) {
		await createNewEvent(args);
	}
	await Goto.eventsListPage();
});

afterAll(async () => {
	await deactivatePlugin(baristaPlugin);
	
	await capture?.stop();
});

describe('Trash link test', () => {
	let countBeforeRestore: number;
	let countViewAllEventBeforRestore: number;
	let countAfterTrash: number;

	it('Count event at trash', async () => {
		// count trash link
		countBeforeRestore = await eventsListSurfer.getViewCount('Trash');
		// // go to view all link and count event
		await eventsListSurfer.goToView('View All Events');
		// assert to confirm that trash is empty
		expect(countBeforeRestore).toBe(0);
	});

	it('Trash event that contain name "Test One" and "Test Two"', async () => {
		// select all event that contain name Test One
		await eventsListSurfer.selectEventToTrash('Test One');
		// get the number and elements of rows availble
		countAfterTrash = await eventsListSurfer.goToViewAndCount('Trash');
		//count event added
		const countTrashedEvent = countAfterTrash - countBeforeRestore;
		// assert to confirm that trash is not empty
		expect(countAfterTrash).toBe(countBeforeRestore + countTrashedEvent);
	});

	it('Restore first event row in trash link', async () => {
		// go to view all link and count event
		countViewAllEventBeforRestore = await eventsListSurfer.getViewCount('View All Events');
		// get the first event in trash
		const firstItem = await eventsListSurfer.getFirstListItem();
		// got to "restore from trash" action link for the selected first event
		const restoreLink = await eventsListSurfer.getItemActionLinkByText(firstItem, 'Restore from Trash');
		await page.goto(restoreLink);
		// check again the trash count if it is already less than before
		const countAfterRestore = await eventsListSurfer.getViewCount('View All Events');
		//count event added
		const countAddedEvent = countAfterRestore - countViewAllEventBeforRestore;
		// assert the before and after trash count
		expect(countAfterRestore).toBe(countViewAllEventBeforRestore + countAddedEvent);
	});

	it('Count the remaing event inside trash', async () => {
		// get the number and elements of rows available
		const countBeforeDeletePermanently = await eventsListSurfer.goToViewAndCount('Trash');
		//count event trashed
		const countTrashedEvent = countAfterTrash - countBeforeDeletePermanently;
		// assert the remaining event in trash
		expect(countBeforeDeletePermanently).toBe(countAfterTrash - countTrashedEvent);
	});

	it('Delete permanently the first event row in trash link', async () => {
		// get the first event in trash
		const firstItemForDeletePermanently = await eventsListSurfer.getFirstListItem();
		// get IDs by its event
		const filteredRows = await eventsListSurfer.getEventID([firstItemForDeletePermanently]);
		// got to "Delete Permanently" action link for the selected first event
		const deletePermanentlyLink = await eventsListSurfer.getItemActionLinkByText(
			firstItemForDeletePermanently,
			'Delete Permanently'
		);
		await page.goto(deletePermanentlyLink);

		// select all the event checkbox to delete permanently
		await eventsListSurfer.checkEventToDeletePermanently(filteredRows);
		// confirmation for delete permanently
		await eventsListSurfer.confirmAllDeletePermanently();
		//Go to Event List
		await eventsListSurfer.goToView('View All Events');
		// check again the trash count if it is already less than before
		const countAfterDeletePermanently = await eventsListSurfer.getViewCount('Trash');
		// assert the before and after trash count
		expect(countAfterDeletePermanently).toBe(0);
	});
});
