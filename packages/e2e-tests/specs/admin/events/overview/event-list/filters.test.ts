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
});
