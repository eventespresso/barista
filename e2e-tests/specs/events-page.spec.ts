import { test } from '@eventespresso/e2e';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

// this is a *silly* test just to verify functionality of E2E
// if perceived to be redundant, there is *no* harm in removing it
test('open events page', async ({ navigate }) => {
	const page = await navigate.to('admin:ee');

	const header = page.getByRole('heading', { name: 'Event Espresso - Events' });

	await expect(header).toBeVisible();
});

test('categories', async ({ navigate }) => {
	const page = await navigate.to('admin');

	await page.getByRole('link', { name: 'Event Espresso', exact: true }).click();

	await page.getByRole('link', { name: ' Categories' }).click();

	// create category

	await page.getByRole('link', { name: 'Add new category' }).click();

	const catName = faker.lorem.words(3);

	await page.getByRole('textbox', { name: 'Category name' }).fill(catName);

	await page.getByRole('button', { name: 'Save and close' }).click();

	// read category (refresh page to read actual values)

	await page.reload();

	await expect(page.getByRole('link', { name: catName, exact: true })).toBeVisible();

	// update category

	const row = page.getByRole('row', { name: catName });

	await row.hover();

	const buttons = row.getByText('Edit | Delete | View');

	await buttons.getByRole('link', { name: 'Edit' }).click();

	const newCatName = catName + '-' + faker.lorem.word({ length: 5 });

	await page.getByRole('textbox', { name: 'Category name' }).fill(newCatName);

	await page.getByRole('button', { name: 'Save and close' }).click();

	// read category (refresh page)

	await page.reload();

	await expect(page.getByRole('link', { name: newCatName, exact: true })).toBeVisible();

	// check shortcode format

	const shortcode = `[ESPRESSO_EVENTS category_slug=${catName.replaceAll(' ', '-').toLowerCase()}]`;

	await expect(page.getByText(shortcode)).toBeVisible();

	// delete category

	await row.hover();

	await row.getByRole('link', { name: 'Delete category' }).click();

	// read category (refresh page)

	await page.reload();

	await expect(page.getByText(newCatName)).not.toBeVisible();
});
