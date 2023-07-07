import { test } from '@eventespresso/e2e';
import { expect } from '@playwright/test';

test('Try my new fixtures', async ({ browser }) => {
	const page = await browser.newPage();
	await page.goto('http://localhost:8889/wp-admin/');
	const header = page.getByRole('heading', { name: 'Dashboard' });
	await expect(header).toBeVisible();
});
