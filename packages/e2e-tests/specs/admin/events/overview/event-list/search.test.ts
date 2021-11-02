import { createNewEvent } from '@e2eUtils/admin/events';
import { Goto } from '@e2eUtils/admin';

beforeAll(async () => {
	await Goto.eventsListPage();
});

describe('Search events', () => {
	it('tests search events', async () => {
		const searchText = '';

		const eventList = ['Test One', 'Test Two', 'Test Three', 'Test Four'];
		const searchByUppercase = eventList.map((name) => name.toUpperCase());
		const searchByLowerCase = eventList.map((name) => name.toLowerCase());
		const searchByPartial = eventList.map((event) => event.slice(0, Math.floor(Math.random() * 6 + 1)));
		const searchByRadmonTextNull = [(Math.random() + 1).toString(36).substring(7), ''];
		const searchCases = [eventList, searchByPartial, searchByUppercase, searchByLowerCase, searchByRadmonTextNull];

		for (const title of eventList) {
			await createNewEvent({ title });
		}
		await Goto.eventsListPage();

		const searchField = async (searchText: string | null, index: number) => {
			await page.fill('input#toplevel_page_espresso_events-search-input', searchText);

			// trigger the search event button
			await Promise.all([page.waitForNavigation(), page.click('input:has-text("Search Events")')]);

			// target all events inside table
			const tableRows = await page.$$('table.wp-list-table tbody#the-list tr');
			const searchResult = await (await tableRows[0].$('td.column-name a.row-title')).innerText();
			if (index === 0) {
				expect(searchResult.trim()).toBe(searchText.trim());
			} else if (searchText === '') {
			} else {
				expect(searchText).toBeTruthy();
			}
			console.log({ searchResult });
			return searchResult;
		};

		for (const [index, value] of searchCases.entries()) {
			if (index === 0) {
				for (const searchText of value) {
					const searchResult = await searchField(searchText, index);
					expect(searchResult.trim()).toBe(searchText.trim());
				}
			} else {
				for (const searchText of value) {
					const searchResult = await searchField(searchText, index);
					expect(searchResult.trim()).toBe(searchText.trim());
				}
			}
		}

		// first show all events
		// await Promise.all([page.waitForNavigation(), page.click('a:has-text("View All Events")')]);

		// for (const search of searchCases) {
		// 	// fill the search input base on the random pick
		// 	await page.fill('input#toplevel_page_espresso_events-search-input', search);

		// 	// trigger the search event button
		// 	await Promise.all([page.waitForNavigation(), page.click('input:has-text("Search Events")')]);
		// 	// expect(columnText.trim()).toBe(value.trim());
		// }

		expect(true).toBeTruthy();
		// if (tableRows.length) {
		// 	// get random index in event list
		// 	const randomIndexInTableRows = Math.floor(Math.random() * tableRows.length + 1);
		// 	// fetch random name in event list
		// 	searchText = await (await tableRows[randomIndexInTableRows].$('td.column-name a.row-title')).innerText();
		// 	// assert search bar if it search anything
		// 	expect(searchText).toBeTruthy();
		// }

		// fill the search input base on the random pick
	});
});
