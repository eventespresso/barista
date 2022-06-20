import { assertFilteredItems, assertSelectedDefaultOption } from '@e2eUtils/admin/events';
import { EventsListSurfer, Goto } from '@e2eUtils/admin';

const eventsListSurfer = new EventsListSurfer();

beforeAll(async () => {
	await Goto.eventsListPage();
});

beforeEach(async () => {
	await eventsListSurfer.resetFilters();
});

describe('Events list page filters', () => {
	// eslint-disable-next-line jest/no-disabled-tests
	it('tests the month/year filter', async () => {
		const monthYearFilter = await assertFilteredItems('#month_range', 'td.start_date_time', true, true);
		expect(monthYearFilter).toBeTruthy();
	});

	// eslint-disable-next-line jest/no-disabled-tests
	it('tests the active/inactive filter', async () => {
		const activeInactiveFilter = await assertFilteredItems('#active_status', '');
		expect(activeInactiveFilter).toBeTruthy();
	});

	it('tests the all venues filter', async () => {
		const venuesFilter = await assertFilteredItems('#venue', '');
		expect(venuesFilter).toBeTruthy();
	});

	it('tests the all categories filter', async () => {
		const categoriesFilter = await assertFilteredItems('#EVT_CAT', '');
		expect(categoriesFilter).toBeTruthy();
	});

	it('tests the reset filter', async () => {
		// gather all unique indentity for select element and it's default value
		const selectorList = [
			{ value: 'Select a Month/Year', selector: '#month_range' },
			{ value: 'Show Active/Inactive', selector: '#active_status' },
			{ value: 'All Venues', selector: '#venue' },
			{ value: 'All Categories', selector: '#EVT_CAT' },
		];
		// trigger the reset filter first
		await eventsListSurfer.resetFilters();
		// loop all list of select element identity
		for (const { value, selector } of selectorList) {
			// check default value and asset every iteration
			const selectDefault = await assertSelectedDefaultOption(selector, value);
			// ensure the default select innertext will not be empty.
			expect(selectDefault).toBeTruthy();
		}
	});
});
