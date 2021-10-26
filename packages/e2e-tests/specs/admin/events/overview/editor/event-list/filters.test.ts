import { DateFormatter } from '@e2eUtils/admin/event-editor';
import { Goto } from '@e2eUtils/admin';

const dateFormatter = new DateFormatter();

beforeAll(async () => {
	await Goto.eventsListPage();
});

describe('name here', () => {
	it('does something', async () => {
		let options = await (await page.$('select#month_range')).$$('option');

		for (let i = 0; i < options.length; i++) {
			const option = options[i];
			const value = await option.getAttribute('value');
			if (!value) {
				continue;
			}
			const name = await option.innerText();

			await page.selectOption('select#month_range', { value });
			await Promise.all([page.waitForNavigation(), page.click('input:has-text("Filter")')]);

			const tableRows = await page.$$('table.wp-list-table tbody tr');

			for (const row of tableRows) {
				// "November 24, 2021 8:00 am" becomes "November 2021"
				const startDateText = await (await row.$('td.start_date_time')).innerText();
				const startDate = await dateFormatter.eventMonthlyFilter(startDateText);
				expect(startDate.trim()).toBe(name.trim());
			}
			options = await (await page.$('select#month_range')).$$('option');
		}
		expect(options.length).toBeTruthy();
	});
});
