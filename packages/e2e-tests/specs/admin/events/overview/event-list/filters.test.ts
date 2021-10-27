import { DateFormatter } from '@e2eUtils/admin/event-editor';
import { Goto } from '@e2eUtils/admin';

const dateFormatter = new DateFormatter();

beforeAll(async () => {
	await Goto.eventsListPage();
});

describe('Events list page filters', () => {
	it('tests the month/year filter', async () => {
		// lets get the first select element
		const select = await page.$('select#month_range');
		// lets get all its option elements
		const options = await select.$$('option');
		// lets convert the array of options to the array of promises that resolve to option value
		const optionValuePromises = options.map((option) => option.getAttribute('value'));
		// The option values without the first empty value
		const optionValues = (await Promise.all(optionValuePromises)).filter(Boolean);

		// loop through all of the optionValues like ["November 2021"]
		for (const value of optionValues) {
			await page.selectOption('select#month_range', { value });
			await Promise.all([page.waitForNavigation(), page.click('input:has-text("Filter")')]);

			// These are all the rows in event list table
			const tableRows = await page.$$('table.wp-list-table tbody tr');

			// lets loop through all the rows to assert that their start dates match the selected filter
			for (const row of tableRows) {
				// start date text can be in some format set by the user in WP date format settings
				const startDateText = await (await row.$('td.start_date_time')).innerText();

				// "November 24, 2021 8:00 am" becomes "November 2021"
				const startDate = await dateFormatter.eventMonthlyFilter(startDateText);
				// ensure to trim the values before assertion
				expect(startDate.trim()).toBe(value.trim());
			}
		}
		expect(options.length).toBeTruthy();
	});
});
