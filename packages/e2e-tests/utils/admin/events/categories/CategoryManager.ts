import { WPListTable } from '../../WPListTable';

type Args = {
	title?: string;
	description?: string;
};

const wpListTable = new WPListTable();

export class CategoryManager extends WPListTable {
	/**
	 * remove all category
	 */
	deleteAllCategory = async (): Promise<void> => {
		// select all category list
		await wpListTable.selectAll();
		// select delete category from bulk action
		await page.selectOption('select#bulk-action-selector-', { value: 'delete_categories' });
		// trigger apply button
		await page.click('.bulkactions input[type="submit"][value="Apply"]');
	};

	// save new category
	saveNewCategory = async ({ title, description }: Args): Promise<void> => {
		// fill in category title
		await page.fill('#category_name', title);
		// fill in category description
		await page.fill('#wp-category_desc-editor-container textarea.wp-editor-area', description);
		// trigger save category button
		await Promise.all([page.waitForNavigation(), page.click('input[type="submit"][value="Save and Close"]')]);
	};

	// go to add new category
	gotoAddNewCategory = async (): Promise<void> => {
		const linkAddCategpry = await page.$(`a:has-text("Add New Category")`);
		const hrefAddCategpry = await linkAddCategpry.getAttribute('href');
		await Promise.all([page.waitForNavigation(), page.goto(hrefAddCategpry)]);
	};

	// go to category tab
	gotoCategories = async (): Promise<void> => {
		const linkCategories = await page.$(`.nav-tab-wrapper a:has-text("Categories")`);
		const hrefCategories = await linkCategories.getAttribute('href');
		await Promise.all([page.waitForNavigation(), page.goto(hrefCategories)]);
	};

	// Create new category
	createNewCategory = async ({ title, description }: Args): Promise<void> => {
		// go to category tab
		await this.gotoCategories();
		// go to add new category
		await this.gotoAddNewCategory();
		// save new category
		await this.saveNewCategory({ title, description });
	};
}
