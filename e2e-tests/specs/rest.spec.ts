import { test } from '@eventespresso/e2e';
import { expect } from '@playwright/test';

// BUG:   Error: Timed out 5000ms waiting for expect(received).toBeVisible()
// BUG:   Call log:
// BUG:    - expect.toBeVisible with timeout 5000ms
// BUG:    - waiting for getByRole('heading', { name: 'Event Dates', exact: true }).locator('xpath=..').filter({ hasText: 'datetime 0' })

test.fixme('make event', async ({ page, navigate, factory }, { title }) => {
	for (let i = 0; i < 5; i++) {
		const event = factory.event();
		await event.make({ EVT_name: `${title} ${i}` });
		for (let j = 0; j < 5; j++) {
			await event.addDatetimes({
				DTT_name: `datetime ${j}`,
			});
		}
		for (const datetime of event.datetimes) {
			for (let j = 0; j < 3; j++) {
				await event.addTickets(datetime, {
					TKT_name: `${datetime.DTT_name} ticket ${j}`,
				});
			}
		}
	}
	for (let i = 0; i < 5; i++) {
		await page.goto(navigate.routes['admin:ee:events']);
		const link = page.getByRole('link').filter({ hasText: `${title} ${i}` });
		await expect(link).toBeVisible();
		await link.click();
		const datetimes = page.getByRole('heading', { name: 'Event Dates', exact: true }).locator('..');
		const tickets = page.getByRole('heading', { name: 'Available Tickets', exact: true }).locator('..');
		await datetimes.getByLabel('items per page').selectOption('48');
		await tickets.getByLabel('items per page').selectOption('48');
		for (let k = 0; k < 5; k++) {
			await expect(datetimes.filter({ hasText: `datetime ${k}` })).toBeVisible();
			for (let j = 0; j < 3; j++) {
				await expect(tickets.filter({ hasText: `datetime ${k} ticket ${j}` })).toBeVisible();
			}
		}
	}
});
