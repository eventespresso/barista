import { test } from '@eventespresso/e2e';
import { expect } from '@playwright/test';

// the purpose of this spec is to verify that E2E environment is fully functional

test('homepage', async ({ navigate }) => {
	const page = await navigate.to('home');

	const h1 = page.locator('h1');

	await expect(page).toHaveTitle('barista');

	await expect(h1).toContainText('Mindblown: a blog about philosophy.');

	await page.close();
});

test('authentication', async ({ navigate }) => {
	const page = await navigate.to('admin');

	const header = page.getByRole('heading', { name: 'Dashboard' });

	await expect(header).toBeVisible();

	await page.close();
});
