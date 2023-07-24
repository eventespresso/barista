import { expect } from '@playwright/test';
import { test } from '@eventespresso/e2e';

test.describe('pagination for Event Dates', () => {
	test('card view', async ({ navigate, eventFactory }, testInfo) => {
		// we create 10 entities (5 datimes + 5 tickets)
		// we manually go through 3+3 pages
		// we manually remove filtering
		// that's why this test is slow...
		test.slow();

		const name = 'pagination test';

		eventFactory.name(name);

		// for performance reasons, I will assume that pagination calculation for "2/page" and "48/page" (consideration: creating multiple datetimes and tickets)
		const pageMap = {
			1: [`${name} 2`], // we skip first item because there is one default item
			2: [`${name} 3`, `${name} 4`],
			3: [`${name} 5`, `${name} 6`],
		} as const;

		const nameArr = Object.values(pageMap).flat();

		for (const name of nameArr) {
			eventFactory.addDatetime({ name });
			eventFactory.addTicket({ name });
		}

		await eventFactory.make('Publish');

		await eventFactory.close();

		const page = await navigate.to('admin:ee:events');

		await page.getByRole('link').filter({ hasText: name }).click();

		const headings = ['Event Dates', 'Available Tickets'] as const;

		for (const h of headings) {
			const section = page.getByRole('heading', { name: h, exact: true }).locator('..');

			await section.getByRole('combobox', { name: 'items per page' }).selectOption('2');

			for (const page in pageMap) {
				await section.getByLabel('pagination').getByRole('listitem', { name: page }).click();

				for (const name of pageMap[page]) {
					await expect(section.getByText(name, { exact: true })).toBeVisible();
				}
			}
		}

		await page.close();
	});

	test.fixme('table view', async () => {});
});

test.describe('pagination for Available Tickets', () => {
	test.fixme('card view', async () => {});
	test.fixme('table view', async () => {});
});

test.describe('search functionality', () => {
	test.fixme('basic search query', async () => {});
	test.fixme('case insensitive search query', async () => {});
	test.fixme('partial search query', async () => {});
	test.fixme('non English search query', async () => {});
	test.fixme('name and description', async () => {});
});
