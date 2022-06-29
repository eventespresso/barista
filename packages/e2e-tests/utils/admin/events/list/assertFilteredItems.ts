import { DateFormatter } from '@e2eUtils/admin';

export const getSelectFilter = async (selector: string) => {
	// lets get all its option elements
	const options = await page.$$(`select${selector} option`);
	// lets convert the array of options to the array of promises that resolve to option value
	const optionValuePromises = options.map((option) => option.getAttribute('value'));
	// The option values without the first empty or literally 'none' value
	const optionValues = (await Promise.all(optionValuePromises)).filter((option) => option && option !== 'none');

	return { optionValues, options };
};

export const assertFilteredItems = async (
	filterSelector: string,
	filterColumnSelector: string,
	hasAssertionColumn = false,
	isDate = false
) => {
	const { optionValues, options } = await getSelectFilter(filterSelector);
	if (optionValues.length) {
		// loop through all of the optionValues that is available inside the select filter
		for (const value of optionValues) {			
			await page.selectOption(filterSelector, { value });

			await Promise.all([page.waitForNavigation(), page.click('input:has-text("Filter")')]);

			// These are all the rows in event list table
			const tableRows = await page.$$('table.wp-list-table tbody tr');

			// hasAssertionColumn - if theres no comparison from selection into column results data
			// check if tableRows has more than one index because the first index/[0] will be the header of the column
			if (hasAssertionColumn && tableRows.length > 1 && filterColumnSelector) {
				// lets loop through all the rows for assertions
				for (const row of tableRows) {
					// getting the desired inner text in a column
					let columnText = await (await row.$(filterColumnSelector)).innerText();

					// start date text can be in some format set by the user in WP date format settings
					//if isDate true "November 24, 2021 8:00 am" becomes "November 2021"
					if (isDate) columnText = await DateFormatter.monthYearDateFromat(columnText);

					// ensure to trim the values before assertion
					// somtimes the result for columnText is all lower case so to prevent inequality convert to lower case all the words
					expect(columnText.trim().toLowerCase()).toBe(value.trim().toLowerCase());
				}
			}

			await Promise.all([page.waitForNavigation(), page.click('a:has-text("Reset Filters")')]);
		}
	}

	return options.length;
};
