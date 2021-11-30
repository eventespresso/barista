import { createNewEvent } from '@e2eUtils/admin/events';
import { EventsListSurfer, Goto } from '@e2eUtils/admin';
import { eventData } from '../../../../shared/data';

const eventsListSurfer = new EventsListSurfer();

beforeAll(async () => {
	// generate lots of events for pagination
	const eventDataFOrPagination = Array(5).fill(Object.values(eventData));
	// delete all events for starting point
	await eventsListSurfer.deleteAllEventsByLink('View All Events');
	// delete permanently all events at trash link
	await eventsListSurfer.deleteAllPermanentlyFromTrash();
	console.log({ eventDataFOrPagination: Object.values(eventData) });

	// create bunch events for testing
	for (const event of Object.values(eventData)) {
		await createNewEvent(event);
	}
	await Goto.eventsListPage();
});

describe('Test overview pagination', () => {
	it('Count how many events from "Vew all events"', async () => {
		// count all events from view all events
		const countAllEventsList = await eventsListSurfer.goToViewAndCount('View All Events');
		// assert count events from View all views link
		expect(countAllEventsList).toBe(36);
	});

	it('test pagination', async () => {
		// count all events from view all events
		const countAllEventsList = await eventsListSurfer.goToViewAndCount('View All Events');
		// click screen option to get the pagination set
		await page.click('#show-settings-link');
		// get the default per page
		const paginationEvents = await (await page.$('#espresso_events_default_per_page')).getAttribute('value');
		// get how many set of page in pagination
		const totalPages = await (await page.$('span.total-pages')).innerText();
		// get the remainder countAllEventsList modulus to default per page
		const getPageRemainder = countAllEventsList % Number(paginationEvents);
		// this will get the number of event in the last pagiantion (this will use for assertion)
		let countLastPageRows = 0;

		// loop the pagination per page
		for (let pages = 1; pages < Number(totalPages); pages++) {
			// first get the link for next page in pagination
			const href = await (await page.$('.pagination-links a.next-page')).getAttribute('href');
			// go to next page link
			await Promise.all([page.waitForLoadState(), page.goto(href)]);
			// count event every paginate page
			const countRowsPerPage = await eventsListSurfer.getItemCount();
			// get the remainder per page by countRowsPerPage modulus to default per page
			countLastPageRows = countRowsPerPage % Number(paginationEvents);
			// assert event count every page pagination
			expect(countRowsPerPage).toBeGreaterThanOrEqual(countLastPageRows);
		}

		// assert the getPageRemainder and countLastPageRows this will always be equal
		expect(getPageRemainder).toBe(countLastPageRows);
	});
});