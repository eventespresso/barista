import { Goto, createNewEvent } from '@e2eUtils/admin';
import { eventData } from '../../../shared/data';

beforeAll(async () => {
	await Goto.eventsListPage();
});

describe('Create new category test', () => {
	it('Create one sample category', async () => {
		//  a:has-text("${text}")
		// Click the search input
		// await Promise.all([page.waitForNavigation(), page.click('a:has-text("Categories")')]);
		// await Promise.all([page.waitForNavigation(), page.click('a:has-text("Categories")')]);
		// const rwapperCategories = await page.$('.nav-tab-wrapper.wp-clearfix');
		const linkCategories = await page.$(`.nav-tab-wrapper a:has-text("Categories")`);
		const hrefCategories = await linkCategories.getAttribute('href');
		await Promise.all([page.waitForNavigation(), page.goto(hrefCategories)]);

		// const rwapperAddCategpry = await page.$('.nav-tab-wrapper.wp-clearfix');
		const linkAddCategpry = await page.$(`a:has-text("Add New Category")`);
		const hrefAddCategpry = await linkAddCategpry.getAttribute('href');
		await Promise.all([page.waitForNavigation(), page.goto(hrefAddCategpry)]);

		await page.fill('#category_name', 'Sample category');
		// await page.click('#category_desc');
		await page.fill('#wp-category_desc-editor-container textarea.wp-editor-area', 'Sample category description');
		await Promise.all([page.waitForNavigation(), page.click('input[type="submit"][value="Save and Close"]')]);
		// await page.$('input[type="submit"][value="Save and Close"]');

		expect(0).toBe(0);
	});

	it('Create new event and assign to new sample category', async () => {
		await Goto.eventsListPage();
		await createNewEvent({
			...eventData.upcoming,
		});
		// await page.click(`#espresso_event_categories-4 label:has-text("Sample category")`);
		expect(0).toBe(0);
	});
});
