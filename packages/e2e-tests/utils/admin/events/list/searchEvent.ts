export const searchEvent = async (searchText: null | undefined | string, expected: boolean) => {
	let returnValue: boolean;
	// fill searchText into search field
	await page.fill('input#toplevel_page_espresso_events-search-input', searchText ? searchText : '');

	// trigger the search event button
	await Promise.all([page.waitForNavigation(), page.click('input:has-text("Search Events")')]);

	// target all events inside table
	const tableRows = await page.$$('table.wp-list-table tbody#the-list tr');

	// Loop rows inside the tableRows result
	if (tableRows.length && expected) {
		// Fetch event name in a row
		const searchResult = await (await tableRows[0].$('td.column-name a.row-title')).innerText();
		returnValue = searchResult.trim() ? true : false;
	} else {
		returnValue = false;
	}

	return returnValue;
};
