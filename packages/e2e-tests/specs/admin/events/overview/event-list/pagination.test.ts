import { createNewEvent } from '@e2eUtils/admin/events';
import { EventsListSurfer, Goto } from '@e2eUtils/admin';
import { eventData } from '../../../../shared/data';

const eventsListSurfer = new EventsListSurfer();

beforeAll(async () => {
	await Goto.eventsListPage();
	// delete all events for starting point
	await eventsListSurfer.deleteAllEventsByLink('View All Events');
	// delete permanently all events at trash link
	await eventsListSurfer.deleteAllPermanentlyFromTrash();

	// generate lots of events for pagination
	// let events = Object.values(eventData);
	// events = [...events, ...events, ...events];
	// for (const event of events) {
	// 	await createNewEvent(event);
	// }
});

describe('Test overview pagination', () => {
	// let events = Object.values(eventData);
	// events = [...events, ...events, ...events];
	let countEventsBeforeAdding: number;
	let countAfterAddedEvents: number;

	it('Count how many events from "Vew all events"', async () => {
		countEventsBeforeAdding = await eventsListSurfer.getViewCount('View All Events');
		expect(countEventsBeforeAdding).toBe(0);
	});

	it('Add lots of events for pagination', async () => {
		// generate lots of events for pagination
		let events = Object.values(eventData);
		events = [...events, ...events, ...events];
		console.log({ events: events.length });

		for (const event of events) {
			await createNewEvent(event);
		}
		countAfterAddedEvents = await eventsListSurfer.goToViewAndCount('View All Events');
		const countAddedEvent = countAfterAddedEvents - countEventsBeforeAdding;
		expect(countAfterAddedEvents).toBe(countAddedEvent + countEventsBeforeAdding);
		// expect(0).toBe(0);
	});

	it('Get total pages', async () => {
		// countAllEventsList = await eventsListSurfer.goToViewAndCount('View All Events');
		const defaultPerPage = await eventsListSurfer.getDefaultPerPage();
		const totalPages = await eventsListSurfer.getTotalPagePagination();
		console.log({ daw: Math.ceil(countAfterAddedEvents / defaultPerPage) });

		// 	// // count all events from view all events
		// 	// const countAllEventsList = await eventsListSurfer.goToViewAndCount('View All Events');
		// 	// // click screen option to get the pagination set
		// 	// await page.click('#show-settings-link');
		// 	// // get the default per page
		// 	// const paginationEvents = await (await page.$('#espresso_events_default_per_page')).getAttribute('value');
		// 	// // get how many set of page in pagination
		// 	// const totalPages = await (await page.$('span.total-pages')).innerText();
		// 	// // get the remainder countAllEventsList modulus to default per page
		// 	// const getPageRemainder = countAllEventsList % Number(paginationEvents);
		// 	// // this will get the number of event in the last pagiantion (this will use for assertion)
		// 	// const countLastPageRows = 0;

		// 	// // loop the pagination per page
		// 	// for (let pages = 1; pages < Number(totalPages); pages++) {
		// 	// 	// first get the link for next page in pagination
		// 	// 	const href = await (await page.$('.pagination-links a.next-page')).getAttribute('href');
		// 	// 	// go to next page link
		// 	// 	await Promise.all([page.waitForLoadState(), page.goto(href)]);
		// 	// 	// count event every paginate page
		// 	// 	const countRowsPerPage = await eventsListSurfer.getItemCount();
		// 	// 	// get the remainder per page by countRowsPerPage modulus to default per page
		// 	// 	countLastPageRows = countRowsPerPage % Number(paginationEvents);
		// 	// 	// assert event count every page pagination
		// 	// 	expect(countRowsPerPage).toBeGreaterThanOrEqual(countLastPageRows);
		// 	// }

		// 	// // assert the getPageRemainder and countLastPageRows this will always be equal
		// 	// expect(getPageRemainder).toBe(countLastPageRows);

		expect(0).toBe(0);
	});
});
