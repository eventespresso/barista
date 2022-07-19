import { saveVideo, PageVideoCapture } from 'playwright-video';
import { createMultipleEvents } from '@e2eUtils/admin/events';
import { EventsListSurfer, Goto, DefaultSettingsManager } from '@e2eUtils/admin';
import { eventData } from '../shared/data';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

const baristaPlugin = 'barista/ee-barista.php';

const eventsListSurfer = new EventsListSurfer();
const defaultSettingsManager = new DefaultSettingsManager();

const namespace = 'events-pagination-clickable-actions-links';
let capture: PageVideoCapture;

//Disabled video on this tests due to long running time
beforeAll(async () => {
	await activatePlugin(baristaPlugin);
	
	await Goto.eventsListPage();
	//go to default settings tab
	await defaultSettingsManager.gotoDefaultSettings();
	await defaultSettingsManager.selectDefaultEditor('1');

	await Goto.eventsListPage();
	// delete all events for starting point
	await eventsListSurfer.deleteAllEventsByLink('View All Events');
	// delete permanently all events at trash link
	await eventsListSurfer.deleteAllPermanentlyFromTrash();
});

afterAll(async () => {
	await deactivatePlugin(baristaPlugin);
});

describe('Test overview pagination', () => {
	let events = Object.values(eventData);
	events = [...events, ...events, ...events];
	let countEventsBeforeAdding: number;
	let countAfterAddedEvents: number;
	let totalPages: number;
	let defaultPerPage: number;

	it('Count how many events from "Vew all events"', async () => {
		// count the initial events in view all events, it suppose to start with zero
		countEventsBeforeAdding = await eventsListSurfer.getViewCount('View All Events');
		// assert starting count of events
		expect(countEventsBeforeAdding).toBe(0);
	});

	it('Add lots of events for pagination', async () => {
		jest.setTimeout(600000);

		// generate lots of events for pagination
		await Promise.all([page.waitForNavigation(), page.click('#add-new-event')]);
		for (const event of events) {
			// create new event
			await createMultipleEvents(event);
		}
		await Goto.eventsListPage();
		// view and count events at view all events
		countAfterAddedEvents = await eventsListSurfer.goToViewAndCount('View All Events');
		// assert inserted events
		expect(countAfterAddedEvents).toBe(events.length);
	});

	it('Get total pages', async () => {
		// get the default per page
		defaultPerPage = await eventsListSurfer.getDefaultPerPage();
		// get total page for pagination
		totalPages = await eventsListSurfer.getTotalPagePagination();
		// assert total page count
		expect(totalPages).toBe(Math.ceil(countAfterAddedEvents / defaultPerPage));
	});

	it('Test pagination', async () => {
		// loop the pagination per page
		for (let pages = 1; pages < totalPages; pages++) {
			// first get the link for next page in pagination
			const href = await (await page.$('.pagination-links a.next-page')).getAttribute('href');
			// go to next page link
			await Promise.all([page.waitForLoadState(), page.goto(href)]);
			// count event every paginate page
			const countRowsPerPage = await eventsListSurfer.getItemCount();
			// get the remainder per page by countRowsPerPage modulus to default per page
			const countLastPageRows = countRowsPerPage % defaultPerPage;
			// assert event count every page pagination
			if (totalPages - 1 === pages) {
				// assert last page
				expect(countRowsPerPage).toBe(countLastPageRows);
			} else {
				// assert page count
				expect(countRowsPerPage).toBe(defaultPerPage);
			}
		}
	});
});
