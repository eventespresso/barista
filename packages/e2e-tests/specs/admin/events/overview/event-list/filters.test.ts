import { assertListFilter, resetFilter, selectDefaultOption } from '@e2eUtils/admin/event-editor';
import { Goto } from '@e2eUtils/admin';

beforeAll(async () => {
	await Goto.eventsListPage();
});

beforeEach(async () => {
	await resetFilter();
});

describe('Events list page filters', () => {
	// eslint-disable-next-line jest/no-disabled-tests
	it.skip('tests the month/year filter', async () => {
		const monthYearFilter = await assertListFilter('#month_range', 'td.start_date_time', true, true);
		expect(monthYearFilter).toBeTruthy();
	});

	it('tests the active/inactive filter', async () => {
		const activeInactiveFilter = await assertListFilter(
			'#active_status',
			'td.name.column-name span.ee-status-text-small',
			true
		);
		expect(activeInactiveFilter).toBeTruthy();
	});

	it('tests the all venues filter', async () => {
		const venuesFilter = await assertListFilter('#venue', '');
		expect(venuesFilter).toBeTruthy();
	});

	it('tests the all categories filter', async () => {
		const categoriesFilter = await assertListFilter('#EVT_CAT', '');
		expect(categoriesFilter).toBeTruthy();
	});

	it('tests the reset filter', async () => {
		//gather all unique indentity for select element
		const selectorList = ['#month_range', '#active_status', '#venue', '#EVT_CAT'];
		// loop all list of select element identity
		for (const selector of selectorList) {
			const selectDefault = await selectDefaultOption(selector);
			// ensure the default select innertext will not be empty.
			expect(selectDefault).toBeTruthy();
		}
		await resetFilter();
	});
});
