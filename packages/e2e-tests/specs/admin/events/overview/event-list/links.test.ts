import { createNewEvent } from '@e2eUtils/admin/events';
import { Goto } from '@e2eUtils/admin';
import { eventList } from '../../../../shared/data';
import { ElementHandle } from 'playwright-core';

beforeAll(async () => {
	// Loop and create event base on the eventList
	for (const args of [...eventList, ...eventList]) {
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

		const count = hasNoItems ? 0 : tableRows.length;

		return { tableRows, count };
	};

	const moveToTrash = async () => {
		await page.selectOption('select#bulk-action-selector-', 'trash_events');
		await Promise.all([page.waitForNavigation(), page.click('input#doaction')]);
	};

	it('View all events', async () => {
		await Promise.all([page.waitForNavigation(), page.click('a:has-text("View All Events")')]);
		let titleList: string[];

		const { tableRows, count } = await tableRowsChecker();

		if (count) {
			expect(count).toBeGreaterThanOrEqual(1);

			const filteredRows = (
				await Promise.all(
					tableRows.map(async (row) => {
						const title = await (await row.$('td.column-name a.row-title')).innerText();
						return title === 'Test One' ? row : null;
					})
				)
			).filter(Boolean);

			const fetchInputValue = await Promise.all(
				filteredRows.map(
					async (ro) => await (await ro.$('.check-column input[type="checkbox"]')).getAttribute('value')
				)
			);

			for (const iterator of fetchInputValue) {
				await page.check(`.check-column input[value="${iterator}"]`);
			}

			await moveToTrash();
			const { tableRows: removeIndividual } = await tableRowsChecker();

			// const dawwwww = await Promise.all(
			// 	rowsChecker.map(async (ro) => await (await ro.$('td.column-name a.row-title')).innerText())
			// );
			titleList = await rowTitleList(removeIndividual);
			expect(titleList).not.toContain('Test One');
			await page.check('input#cb-select-all-1');
			await moveToTrash();

			// expect(titleList).toBe(0);

			const { tableRows: removeAll, count: countCkecker } = await tableRowsChecker();
			// titleList = await rowTitleList(removeAll);
			// console.log({ countCkecker });
			// if (!countCkecker) {
			// 	const titleList = await rowTitleList(removeAll);
			expect(countCkecker).toBe(0);
			// 	console.log({ titleList });
			// }
		} else {
			expect(count).toBe(0);
		}
	});
});
