import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
	await page.goto('http://localhost:8889');

	await page.waitForLoadState();

	await expect(page).toHaveTitle(/barista/);
});

test('has h1 header', async ({ page }) => {
	await page.goto('http://localhost:8889');

	const h1 = page.locator('h1');

	await h1.waitFor({ state: 'visible' });

	await expect(h1).toContainText('Mindblown: a blog about philosophy.');
});
