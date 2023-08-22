import { test, DateFactory } from '@eventespresso/e2e';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { Button } from '../fixtures/Events';

// this is a *silly* test just to verify functionality of E2E
// if perceived to be redundant, there is *no* harm in removing it
test('open events page', async ({ navigate }) => {
	const page = await navigate.to('admin:ee:events');

	const header = page.getByRole('heading', { name: /Event.*Espresso.*Events/i });

	await expect(header).toBeVisible();

	await page.close();
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

	await page.close();
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

		await eventPage.close();
		await settingsPage.close();
	});

	// TODO: Flaky E2E test. Will address it once critical tests are done:
	// https://github.com/eventespresso/barista/issues/1249
	// BUG:  Error: Timed out 5000ms waiting for expect(received).toBeVisible()
	// BUG:  Call log:
	// BUG:    - expect.toBeVisible with timeout 5000ms
	// BUG:    - waiting for getByText('Max Registrations per Transaction2').getByRole('button')
	test.fixme('max tickets per order', async ({ navigate }) => {
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

		await events.close();
		await settings.close();
	});

	test('quick links (subsubsub menu)', async ({ navigate, events }) => {
		const date = new DateFactory();

		type EventParameter = {
			start: Date;
			end: Date;
			type: Button;
		};

		type EventName =
			| 'drafted today'
			| 'published today'
			| 'published last month'
			| 'published this month'
			| 'trashed today';

		// object key is used for event name
		type EventParameters = Record<EventName, EventParameter>;

		const eventParams: EventParameters = {
			'drafted today': {
				start: date.make(),
				end: date.make(),
				type: 'Save Draft',
			},
			'published today': {
				start: date.minutes(-5).make(),
				end: date.minutes(+5).make(),
				type: 'Publish',
			},
			'published last month': {
				start: date.months(-1).make(),
				end: date.months(-1).make(),
				type: 'Publish',
			},
			'published this month': {
				start: date.days(+1).make(),
				end: date.days(+2).make(),
				type: 'Publish',
			},
			'trashed today': {
				start: date.make(),
				end: date.make(),
				type: 'Move to Trash',
			},
		};

		for (const key in eventParams) {
			const name = key;
			// workaround until TS is updated
			// https://github.com/microsoft/TypeScript/issues/21732
			const { start, end, type } = eventParams[key as keyof typeof eventParams];
			await events.name(name).setStart(start).setEnd(end).make(type);
		}

		// clean up
		await events.close();

		type QuickLink = 'View All Events' | 'Draft' | 'Trash' | 'Today' | 'This Month';

		const page = await navigate.to('admin:ee:events');

		const openQuickLink = async (link: QuickLink): Promise<void> => {
			await page.locator('.subsubsub').getByRole('link', { name: link, exact: true }).click();
		};

		const expectToSee = async (event: EventName): Promise<void> => {
			await expect(page.getByRole('row').filter({ hasText: event })).toHaveCount(1);
		};

		const expectNotToSee = async (event: EventName): Promise<void> => {
			await expect(page.getByRole('row').filter({ hasText: event })).toHaveCount(0);
		};

		// "View All Events" is selected by default
		// the key emphasis here is ".current" selector
		await expect(page.locator('.subsubsub .current', { hasText: 'View All Events' })).toHaveCount(1);

		// view all events
		await openQuickLink('View All Events');

		await expectToSee('drafted today');
		await expectToSee('published today');
		await expectToSee('published last month');
		await expectToSee('published this month');
		await expectNotToSee('trashed today');

		// draft
		await openQuickLink('Draft');

		await expectToSee('drafted today');
		await expectNotToSee('published today');
		await expectNotToSee('published last month');
		await expectNotToSee('published this month');
		await expectNotToSee('trashed today');

		// today
		await openQuickLink('Today');

		await expectToSee('drafted today');
		await expectToSee('published today');
		await expectNotToSee('published last month');
		await expectNotToSee('published this month');
		await expectNotToSee('trashed today');

		// this month
		await openQuickLink('This Month');

		await expectToSee('drafted today');
		await expectToSee('published today');
		await expectNotToSee('published last month');
		await expectToSee('published this month');
		await expectNotToSee('trashed today');

		// trash
		await openQuickLink('Trash');

		await expectNotToSee('drafted today');
		await expectNotToSee('published today');
		await expectNotToSee('published last month');
		await expectNotToSee('published this month');
		await expectToSee('trashed today');

		// clean up
		await page.close();
	});
});
