import { createNewEvent } from '@e2eUtils/admin/events';
import { Goto } from '@e2eUtils/admin';
import { eventList } from '../../../../shared/data';
import { ElementHandle } from 'playwright-core';

beforeAll(async () => {
	// Loop and create event base on the eventList
	for (const args of eventList) {
		await createNewEvent(args);
	}
	await Goto.eventsListPage();
});

describe('Events overview clickable actions/links', () => {
	const rowTitleList = async (rows: ElementHandle<SVGElement | HTMLElement>[]) => {
		const titleList = await Promise.all(
			rows.map(async (row) => (await row.$('td.column-name a.row-title')).innerText())
		);

		return titleList;
	};

	const tableRowsChecker = async () => {
		const tableRows = await page.$$('table.wp-list-table tbody#the-list tr');
		const hasNoItems = (await tableRows[0].innerText()).includes('No items found.');
		// const lolsss = (await tableRows[0].innerText()).includes('Test One');

		const count = hasNoItems ? 0 : tableRows.length;

		return { tableRows, count };
	};

	it('View all events', async () => {
		await Promise.all([page.waitForNavigation(), page.click('a:has-text("View All Events")')]);

		const { tableRows, count } = await tableRowsChecker();

		if (count) {
			expect(count).toBeGreaterThanOrEqual(1);
			// const sadasd = await Promise.all(
			// 	tableRows.map(async (row) => await row?.$('td.column-name a:has-text("Test One")'))
			// );

			// const addd = await Promise.all(
			// 	sadasd.map(async (row) => (await row?.$('td.column-name a.row-title')).innerText())
			// );
			// console.log({ addd });

			// const daw = await Promise.all(
			// 	tableRows.filter(async (row) => (await row.innerText()).includes('Test One'))
			// );

			// const lagat = await Promise.all(
			// 	daw.map(async (row) => (await row.$('td.column-name a.row-title')).innerText())
			// );
			// console.log({ lagat });
			// await page.check('input#cb-select-all-1');

			// console.log({ daw });
			await page.check('input#cb-select-all-1');
			expect(await page.isChecked('input#cb-select-all-1')).toBeTruthy();
			await page.selectOption('select#bulk-action-selector-', 'trash_events');
			await Promise.all([page.waitForNavigation(), page.click('input#doaction')]);

			const { tableRows: rowsChecker, count: countCkecker } = await tableRowsChecker();

			if (countCkecker) {
				const titleList = await rowTitleList(rowsChecker);
				expect(titleList).toBe(0);
			}
		} else {
			expect(count).toBe(0);
		}
	});
});
