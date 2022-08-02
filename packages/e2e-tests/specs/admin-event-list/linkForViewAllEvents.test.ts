import { saveVideo, PageVideoCapture } from 'playwright-video';
import { createNewEvent } from '@e2eUtils/admin/events';
import { EventsListSurfer, Goto } from '@e2eUtils/admin';
import { eventData } from '../shared/data';
import { ElementHandle } from 'packages/e2e-tests/types';

const eventsListSurfer = new EventsListSurfer();
const eventDataArray = Object.values(eventData);

const namespace = 'events-overview-clickable-actions-links';

let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);

	// delete all events from view all events link
	await eventsListSurfer.deleteAllEventsByLink('View All Events');
	// delete permanently all events at trash link
	await eventsListSurfer.deleteAllPermanentlyFromTrash();
	// Loop and create event base on the eventData
	for (const event of Object.values(eventData)) {
		await createNewEvent(event);
	}
	await Goto.eventsListPage();
});

afterAll(async () => {
	await capture?.stop();
});

describe('View all events link test', () => {
	let filteredRows: ElementHandle[];
	const filteredEventName = eventDataArray.filter((event) => event.title === 'Test One').length;

	it('Go to view all events and select all event that contain name "Test One"', async () => {
		// go to view all event
		await eventsListSurfer.goToView('View All Events');
		// get only rows that is only contain "Test One" event name
		filteredRows = await eventsListSurfer.getRowsByDetails({ eventDetails: 'Test One' });
		// assert filtered events, filtered rows should equal
		expect(filteredRows.length).toBe(filteredEventName);
	});

	it('Trash all selected event that contain name "Test One', async () => {
		// check all the checkbox that the name contain 'Test One' event
		for (const item of filteredRows) {
			await eventsListSurfer.selectItemCheckbox(item);
		}
		// Check first the total count in view all events
		const countForViewAllBefore = await eventsListSurfer.getViewCount('View All Events');
		// Check first the total count in trash
		const countForTrashBefore = await eventsListSurfer.getViewCount('Trash');
		// after selecting all the rows that contain "Test One" trash all the selected rows
		await eventsListSurfer.trashSelected();
		// assert view all events before deletion happen, count before deletion should equal
		expect(countForViewAllBefore).toBe(eventDataArray.length);
		// assert trash after deletion happen, count after deletion should equal to 0
		expect(countForTrashBefore).toBe(0);
	});

	it('Compare before and after deleted the event "Test One"', async () => {
		// Check the total count in view all events after trashing
		const countForViewAllAfter = await eventsListSurfer.getViewCount('View All Events');
		// Check the total count in trash link after trashing
		const countForTrashAfter = await eventsListSurfer.getViewCount('Trash');
		// assert event count from view all events it should equal
		expect(countForViewAllAfter).toBe(eventDataArray.length - filteredEventName);
		// assert event count from trash it should equal
		expect(countForTrashAfter).toBe(filteredRows.length);
	});
});
