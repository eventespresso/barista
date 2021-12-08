import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, EventsListSurfer, createNewEvent, createMultipleEvents } from '@e2eUtils/admin';
import { eventData } from '../../../../shared/data';

const eventsListSurfer = new EventsListSurfer();

const namespace = 'events-bulk-actions-links';
let capture: PageVideoCapture;

beforeAll(async () => {
	// capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	// delete all events from view all events link
	await eventsListSurfer.deleteAllEventsByLink('View All Events');
	await eventsListSurfer.deleteAllEventsByLink('Draft');
	// delete permanently all events at trash link
	await eventsListSurfer.deleteAllPermanentlyFromTrash();

	await Goto.eventsListPage();
});

// afterAll(async () => {
// 	await capture?.stop();
// });

describe('Test overview bulk actions', () => {
	const events = Object.values(eventData);
	let countBeforeViewAllEvents: number;
	let countBeforeDraft: number;
	let countBeforeTrash: number;

	it('Count events from view all events', async () => {
		// go to event link and return total count events
		countBeforeViewAllEvents = await eventsListSurfer.getViewCount('View All Events');
		// assert count events at view all events
		expect(countBeforeViewAllEvents).toBe(0);
	});

	it('Count events from draft', async () => {
		// go to event link and return total count events
		countBeforeDraft = await eventsListSurfer.getViewCount('Draft');
		// assert count events at draft
		expect(countBeforeDraft).toBe(0);
	});

	it('Create events for view all event link', async () => {
		await Promise.all([page.waitForNavigation(), page.click('#add-new-event')]);
		for (const event of events.slice(0, 4)) {
			await createMultipleEvents(event);
		}
		await Goto.eventsListPage();
		const countAfterAddedEvents = await eventsListSurfer.getViewCount('View All Events');
		const countAddedEvent = countAfterAddedEvents - countBeforeViewAllEvents;
		// assert count events at trash
		expect(countAfterAddedEvents).toBe(countAddedEvent);
	});

	it('Create events for draft', async () => {
		await Promise.all([page.waitForNavigation(), page.click('#add-new-event')]);
		for (const event of events.slice(0, 4)) {
			await createMultipleEvents({ shouldPublish: false, ...event });
		}
		await Goto.eventsListPage();
		const getAutoDraft = await eventsListSurfer.getRowsByDetails({ eventDetails: 'Auto Draft' });
		for (const item of getAutoDraft) {
			await eventsListSurfer.selectItemCheckbox(item);
		}
		await eventsListSurfer.trashSelected();
		const countAfterAddedEvents = await eventsListSurfer.getViewCount('Draft');
		const countAddedEvent = countAfterAddedEvents - countBeforeDraft;
		console.log({ countAfterAddedEvents, countAddedEvent });

		// assert count events at trash
		expect(countAfterAddedEvents).toBe(countAddedEvent);
	});

	it('Count events from trash', async () => {
		// go to event link and return total count events
		countBeforeTrash = await eventsListSurfer.getViewCount('Trash');
		// assert count events at trash
		expect(countBeforeTrash).toBe(0);
	});
});
