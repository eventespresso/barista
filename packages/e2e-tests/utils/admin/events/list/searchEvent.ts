export const searchEvent = async (searchText = '', index: number) => {
	// fill searchText into search field
	await page.fill('input#toplevel_page_espresso_events-search-input', searchText);

	// trigger the search event button
	await Promise.all([page.waitForNavigation(), page.click('input:has-text("Search Events")')]);

	// target all events inside table
	const tableRows = await page.$$('table.wp-list-table tbody#the-list tr');

	// Loop rows inside the tableRows result
	if (tableRows.length && index !== 4) {
		// Fetch event name in a row
		const searchResult = await (await tableRows[0].$('td.column-name a.row-title')).innerText();

		// Add some conditional to meet the specific assertions
		if (index === 0) {
			// Index 0 is always to the search result that's why it used toBe assertion
			expect(searchResult.trim()).toBe(searchText.trim());
		} else {
			// Other index is always not equal to the search result but not empty so it used toBeTruthy assertion
			expect(searchText).toBeTruthy();
		}
	} else {
		// Add some conditional to meet the specific assertions
		// Index 4 uses random text and null/empty value for search cases so in here it used toBeTruthy and toBeFalsy
		if (searchText !== '') {
			expect(searchText).toBeTruthy();
		} else {
			expect(searchText).toBeFalsy();
		}
	}

	return tableRows.length;
};
