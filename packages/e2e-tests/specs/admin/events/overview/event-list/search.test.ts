import { Goto } from '@e2eUtils/admin';

beforeAll(async () => {
	await Goto.eventsListPage();
});

describe('Search events', () => {
	it('tests search events', async () => {
		let searchText = '';

		// first show all events
		await Promise.all([page.waitForNavigation(), page.click('a:has-text("View All Events")')]);
		// target all events inside table
		const tableRows = await page.$$('table.wp-list-table tbody#the-list tr');

		if (tableRows.length) {
			// get random index in event list
			const randomIndexInTableRows = Math.floor(Math.random() * tableRows.length + 1);
			// fetch random name in event list
			searchText = await (await tableRows[randomIndexInTableRows].$('td.column-name a.row-title')).innerText();
			// assert search bar if it search anything
			expect(searchText).toBeTruthy();
		}

		// fill the search input base on the random pick
		await page.fill('input#toplevel_page_espresso_events-search-input', searchText);

		// trigger the search event button
		await Promise.all([page.waitForNavigation(), page.click('input:has-text("Search Events")')]);
	});
});
