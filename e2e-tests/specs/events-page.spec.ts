import { test } from '@eventespresso/e2e';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

// this is a *silly* test just to verify functionality of E2E
// if perceived to be redundant, there is *no* harm in removing it
test('open events page', async ({ navigate }) => {
	const page = await navigate.to('admin:ee:events');

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

test.describe('default settings', () => {
	test('registration status', async ({ navigate }) => {
		const eventPage = await navigate.to('admin:ee:events:new');
		const settingsPage = await navigate.to('admin:ee:events:settings');

		const settingsDropdown = settingsPage.getByRole('combobox', { name: 'Default Registration Status' });
		const eventDropdown = await eventPage.getByRole('combobox', { name: 'Default Registration Status' });

		type Parameter = { code: string; value: string; label: string };

		const parameters: Parameter[] = [
			{ code: 'RAP', value: 'APPROVED', label: 'Approved' },
			{ code: 'RCN', value: 'CANCELLED', label: 'Cancelled' },
			{ code: 'RDC', value: 'DECLINED', label: 'Declined' },
			{ code: 'RIC', value: 'INCOMPLETE', label: 'Incomplete' },
			{ code: 'RNA', value: 'UNAPPROVED', label: 'Not Approved' },
			{ code: 'RPP', value: 'PENDING_PAYMENT', label: 'Pending Payment' },
			{ code: 'RWL', value: 'WAIT_LIST', label: 'Wait List' },
		];

		for (const { code, value, label } of parameters) {
			await settingsDropdown.selectOption(code);

			await settingsPage.getByRole('button', { name: 'Save', exact: true }).click();

			// !! DISCLAIMER !! attribute "select" is broken
			// https://github.com/eventespresso/barista/issues/1232

			// reload page and read values again to make sure they were saved to db
			await settingsPage.reload();

			await expect(settingsDropdown).toHaveValue(code);

			const settingsDropdownOption = await settingsDropdown.locator(
				`option[value=${await settingsDropdown.inputValue()}]`
			);

			await expect(settingsDropdownOption).toHaveText(label);

			// reload page to check if default settings have applied
			await eventPage.reload();

			await expect(eventDropdown).toHaveValue(value);

			const eventDropdownOption = await eventDropdown.locator(
				`option[value=${await eventDropdown.inputValue()}]`
			);

			await expect(eventDropdownOption).toHaveText(label);

			await expect(eventDropdownOption).toHaveAttribute('code', code);
		}
	});

	test('max tickets per order', async ({ navigate }) => {
		const events = await navigate.to('admin:ee:events:new');
		const settings = await navigate.to('admin:ee:events:settings');

		const input = settings.getByLabel('Default Maximum Tickets Allowed Per Order');

		const parameters = ['2', '5', '12'];

		for (const param of parameters) {
			await input.fill(param);

			await settings.getByRole('button', { name: 'Save', exact: true }).click();

			// reload page to fetch new values
			await events.reload();

			// unfortunately, the inline edit field is not implemented properly i.e. missing aria fields, wrong IDs, etc. so programmatic targeting is broken
			const locator = events.getByText(`Max Registrations per Transaction${param}`);

			await expect(locator.getByRole('button')).toBeVisible();
		}
	});

	// TODO: remove only
	test.only('quick links (subsubsub menu)', async ({ navigate, events }) => {
		const page = await navigate.to('admin:ee:events');

		const today = new Date();

		await events.name('drafted event').draft();

		// there is an inherit issue here with today/this month and I believe there is no easy fix for this... consider the following situation:
		// you start running E2E at 23:57 on the last day of the month; let's say it will take 5-7 minutes before we reach this specific E2E suite; by the time this suite is running it is 00:06 of the first day of the *next* month

		await events
			.name('published today')
			.setStart(new Date(new Date().setHours(today.getMinutes() - 5)))
			.setEnd(new Date(new Date().setHours(today.getMinutes() + 5)))
			.publish();

		await events
			.name('published last month')
			.setStart(new Date(new Date().setMonth(today.getMonth() - 1)))
			.publish();

		await events.name('published this month').setStart(today).publish();

		await events.name('trashed event').trash();

		// "View All Events" is selected by default
		// the key emphasis here is ".current" selector
		await expect(page.locator('.subsubsub .current', { hasText: 'View All Events' })).toHaveCount(1);

		// view all events
		await page.getByRole('link', { name: 'View All Events' }).click();

		await expect(page.getByRole('table').locator('tbody').getByRole('row')).toHaveCount(4); // check against "extra" rows

		await expect(page.getByRole('row').filter({ hasText: 'drafted event' })).toHaveCount(1);

		await expect(page.getByRole('row').filter({ hasText: 'published today' })).toHaveCount(1);

		await expect(page.getByRole('row').filter({ hasText: 'published last month' })).toHaveCount(1);

		await expect(page.getByRole('row').filter({ hasText: 'published this month' })).toHaveCount(1);

		// draft
		await page.getByRole('link', { name: 'Draft' }).click();

		await expect(page.getByRole('table').locator('tbody').getByRole('row')).toHaveCount(1); // check against "extra" rows

		await expect(page.getByRole('table').filter({ hasText: 'drafted event' })).toHaveCount(1);

		// today
		await page.getByRole('link', { name: 'Today' }).click();

		await expect(page.getByRole('table').locator('tbody').getByRole('row')).toHaveCount(1); // check against "extra" rows

		await expect(page.getByRole('row').filter({ hasText: 'published today' })).toHaveCount(1);

		// this month
		await page.getByRole('link', { name: 'This Month' }).click();

		await expect(page.getByRole('table').locator('tbody').getByRole('row')).toHaveCount(2); // check against "extra" rows

		await expect(page.getByRole('row').filter({ hasText: 'published today' })).toHaveCount(1);

		await expect(page.getByRole('row').filter({ hasText: 'published this month' })).toHaveCount(1);

		// trash
		await page.getByRole('link', { name: 'Trash', exact: true }).click();

		await expect(page.getByRole('table').locator('tbody').getByRole('row')).toHaveCount(1); // check against "extra" rows

		await expect(page.getByRole('table').filter({ hasText: 'trashed event' })).toHaveCount(1);

		await expect(page.getByRole('table').locator('tbody')).toHaveCount(1);
	});
});
