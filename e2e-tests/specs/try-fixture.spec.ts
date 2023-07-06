import { test } from '@e2e/fixtures';
import { expect } from '@playwright/test';

test('Try my new fixtures', async ({ context }) => {
	const page = await context.newPage();
	await page.goto('http://localhost:8889/wp-admin/');
	await expect(page.getByText('Welcome to WordPress!')).toBeVisible();
});
