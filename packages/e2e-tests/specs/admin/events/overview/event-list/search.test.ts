import { createNewEvent } from '@e2eUtils/admin/events';
import { Goto } from '@e2eUtils/admin';
import { uuid } from '@eventespresso/utils';
import { pluck } from 'ramda';

describe('Search events', () => {
	// Initialize event title to be created for search testing
	const eventList = [
		{ title: 'Test One', description: 'Some description for test one event' },
		{ title: 'Test Two', description: 'Some description for test two event' },
		{ title: 'Test Three', description: 'Some description for test three event' },
		{ title: 'Test Four', description: 'Some description for test four event' },
	];

	const eventTitles = pluck('title', eventList);

	beforeAll(async () => {
		// Loop and create event base on the eventList
		for (const args of eventList) {
			await createNewEvent(args);
		}
		await Goto.eventsListPage();
	});

	const testCases = [
		// Search by event list titles
		{
			desc: 'Search by event titles',
			search: 'Test Two',
			expectedCount: 1,
			expectedTitles: ['Test Two'],
		},
		{
			desc: 'Search by event titles partially',
			search: 'Test',
			expectedCount: 4,
			expectedTitles: eventTitles,
		},
		{
			desc: 'Search by event titles in lowercase',
			search: 'test two',
			expectedCount: 1,
			expectedTitles: ['Test Two'],
		},
		{
			desc: 'Search by event titles in uppercase',
			search: 'TEST TWO',
			expectedCount: 1,
			expectedTitles: ['Test Two'],
		},
		{
			desc: 'Search by event titles partially in lowercase',
			search: 'test',
			expectedCount: 4,
			expectedTitles: eventTitles,
		},
		{
			desc: 'Search by event titles partially in uppercase',
			search: 'TEST',
			expectedCount: 4,
			expectedTitles: eventTitles,
		},
		{
			desc: 'Search by event description',
			search: 'Some description for test three event',
			expectedCount: 1,
			expectedTitles: ['Test Three'],
		},
		{
			desc: 'Search by event description partially',
			search: 'description for test three event',
			expectedCount: 1,
			expectedTitles: ['Test Three'],
		},
		{
			desc: 'Search by event description in lowercase',
			search: 'some description for test three event',
			expectedCount: 1,
			expectedTitles: ['Test Three'],
		},
		{
			desc: 'Search by event description in uppercase',
			search: 'SOME DESCRIPTION FOR TEST THREE EVENT',
			expectedCount: 1,
			expectedTitles: ['Test Three'],
		},
		{
			desc: 'Search by empty string',
			search: '',
			expectedCount: 4,
			expectedTitles: eventTitles,
		},
		{
			desc: 'Search by random string',
			search: uuid(),
			expectedCount: 0,
			expectedTitles: [],
		},
	];

	// // Loop all search cases
	for (const { desc, search, expectedCount, expectedTitles } of testCases) {
		it(desc, async () => {
			// Enter the text in search input
			await page.fill('input#toplevel_page_espresso_events-search-input', search);

			// Click the search input
			await Promise.all([page.waitForNavigation(), page.click('input:has-text("Search Events")')]);

			// count the number of results, discarding the no results row
			const tableRows = await page.$$('table.wp-list-table tbody#the-list tr');

			// check if there is rows contain 'no items found'
			const hasNoItems = (await tableRows[0].innerText()).includes('No items found.');
			// if hasNoItems is true, use it for count else get the table rows count length
			const count = hasNoItems ? 0 : tableRows.length;

			// if expectedCount is greater than zero use assertion toBeGreaterThanOrEqual else use toBe
			if (expectedCount > 0) {
				expect(count).toBeGreaterThanOrEqual(expectedCount);
			} else {
				expect(count).toBe(0);
			}

			// check expectedCount first if it is greater than 0
			if (expectedCount) {
				// get all the inner text value where event title is located
				const titles = await Promise.all(
					tableRows.map(async (row) => (await row.$('td.column-name a.row-title')).innerText())
				);
				// loop all titles
				for (const expectedTitle of expectedTitles) {
					// check if search title is inside the array of expectedTitle
					expect(titles).toContain(expectedTitle);
				}
			}
		});
	}
});