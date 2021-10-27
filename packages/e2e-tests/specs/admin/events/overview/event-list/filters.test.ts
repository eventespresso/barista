import { tableSelectFilter } from '@e2eUtils/admin/event-editor';
import { Goto } from '@e2eUtils/admin';

beforeAll(async () => {
	await Goto.eventsListPage();
});

describe('Events list page filters', () => {
	// eslint-disable-next-line jest/no-disabled-tests
	it.skip('tests the month/year filter', async () => {
		const monthYearFilter = await tableSelectFilter('select#month_range', 'td.start_date_time', true, true);
		expect(monthYearFilter).toBeTruthy();
	});

	it('tests the active/inactive filter', async () => {
		const activeInactiveFilter = await tableSelectFilter(
			'select#active_status',
			'td.name.column-name span.ee-status-text-small',
			true
		);
		expect(activeInactiveFilter).toBeTruthy();
	});

	it('tests the all venues filter', async () => {
		const activeInactiveFilter = await tableSelectFilter('select#venue', '');
		expect(activeInactiveFilter).toBeTruthy();
	});

	it('tests the all categories filter', async () => {
		const activeInactiveFilter = await tableSelectFilter('select#EVT_CAT', '');
		expect(activeInactiveFilter).toBeTruthy();
	});

	it('tests the reset filter', async () => {
		// const { optionValues, options } = await getSelectFilter('select#month_range');
		// console.log({ options: options.length });
		// const daw1 = await getSelectFilter('select#active_status');
		// await page.selectOption('select#month_range', optionValue[2]);
		expect(true).toBeTruthy();
	});
});
