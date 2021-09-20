import { saveVideo } from 'playwright-video';

import { PLUS_ONE_MONTH } from '@eventespresso/constants';

import { clickButton, clickLabel } from '@e2eUtils/common';
import { createNewEvent, DateEditor } from '@e2eUtils/admin/event-editor';

import { addDatesAndTickets } from './utils';

const tamSelector = '.ee-ticket-assignments-manager';
const editor = new DateEditor();

beforeAll(async () => {
	await saveVideo(page, 'artifacts/tam-filters.mp4');

	await createNewEvent({ title: 'TAM Filters Test' });

	/**
	 * Ensure that the default date is for the next month
	 * It is to take care of the default date added on the first day
	 * of a month with 31 days which falls in the same month (after 30 days)
	 * @see https://github.com/eventespresso/barista/pull/945#issuecomment-872468475
	 */
	await editor.editDate(null, { startDate: PLUS_ONE_MONTH });

	await addDatesAndTickets();

	await clickButton('Ticket Assignments');
});

describe('TAM:Filters', () => {
	it('tests the "show trashed dates" filter', async () => {
		const rowsWithoutTrashed = await page.$$(`${tamSelector} tbody tr`);
		const countWithoutTrashed = rowsWithoutTrashed.length;

		// Now lets "show trashed dates"
		await clickLabel('show trashed dates');

		const rowsWithTrashed = await page.$$(`${tamSelector} tbody tr`);
		const countWithTrashed = rowsWithTrashed.length;
		// Now that one trashed date should also be visible, making it +1
		expect(countWithTrashed).toBe(countWithoutTrashed + 1);

		// Ensure to turn off "show trashed dates"
		await clickLabel('show trashed dates');
	});

	it('tests the "dates by month" filter', async () => {
		const nextMonthYear = PLUS_ONE_MONTH.getFullYear();
		const nextMonth = PLUS_ONE_MONTH.getMonth();

		// Lets set the filter to next month.
		await page.selectOption('#ee-dates-by-month', {
			value: `${nextMonthYear}:${nextMonth}`,
		});

		const rowsWithoutTrashed = await page.$$(`${tamSelector} tbody tr`);
		const countWithoutTrashed = rowsWithoutTrashed.length;
		// We added 2 non-trashed dates and 1 trashed dates for next month
		// Also, one default date should also be for the next month
		expect(countWithoutTrashed).toBe(3);

		// Now lets "show trashed dates"
		await clickLabel('show trashed dates');

		const rowsWithTrashed = await page.$$(`${tamSelector} tbody tr`);
		const countWithTrashed = rowsWithTrashed.length;
		// Now that one trashed date should also be visible, making it +1
		expect(countWithTrashed).toBe(4);
	});

	it('tests the "show expired tickets" filter', async () => {
		const columnsWithoutExpired = await page.$$(`${tamSelector} tbody tr:first-child td`);
		const countWithoutExpired = columnsWithoutExpired.length;

		// Now lets "show expired tickets"
		await clickLabel('show expired tickets');

		const columnsWithExpired = await page.$$(`${tamSelector} tbody tr:first-child td`);

		const countWithExpired = columnsWithExpired.length;
		// We added 2 expired tickets, but one ticket is added with dates set to NOW,
		// It is possible that till the the test case reaches here, that ticket is marked as expired.
		expect(countWithExpired - countWithoutExpired).toBeGreaterThanOrEqual(2);

		// Ensure to turn off "show expired tickets"
		await clickLabel('show expired tickets');
	});

	it('tests the "show trashed tickets" filter', async () => {
		const columnsWithoutTrashed = await page.$$(`${tamSelector} tbody tr:first-child td`);
		const countWithoutTrashed = columnsWithoutTrashed.length;

		// Now lets "show trashed tickets"
		await clickLabel('show trashed tickets');

		const columnsWithTrashed = await page.$$(`${tamSelector} tbody tr:first-child td`);
		const countWithTrashed = columnsWithTrashed.length;
		// Now that one trashed ticket should also be visible, making it +1
		expect(countWithTrashed).toBe(countWithoutTrashed + 1);

		// Ensure to turn off "show trashed tickets"
		await clickLabel('show trashed tickets');
	});
});
