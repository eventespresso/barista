import { ElementHandle } from 'packages/e2e-tests/types';
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

	/**
	 * process to delete all categories in a list
	 */
	processToDeleteAllCategory = async (): Promise<{
		countBeforeDeleteAllCategory: number;
		countCategoryAfterDeleteAll: number;
	}> => {
		// go to category tab
		await this.gotoCategories();
		// count category if there is any
		const countBeforeDeleteAllCategory = await this.getViewCount('All');
		// if there is any category exist remove all, otherwise do nothing
		if (countBeforeDeleteAllCategory) {
			await this.deleteAllCategory();
		}
		// count again category after delete all
		const countCategoryAfterDeleteAll = await this.getViewCount('All');

		return { countBeforeDeleteAllCategory, countCategoryAfterDeleteAll };
	};

	/**
	 * save new category
	 */
	saveNewCategory = async ({ title, description }: Args): Promise<void> => {
		// fill in category title
		await page.fill('#category_name', title);
		// fill in category description
		await page.fill('#wp-category_desc-editor-container textarea.wp-editor-area', description);
		// trigger save category button
		await Promise.all([page.waitForNavigation(), page.click('input[type="submit"][value="Save and Close"]')]);
	};

	/**
	 * go to add new category
	 */
	gotoAddNewCategory = async (): Promise<void> => {
		const linkAddCategpry = await page.$(`a:has-text("Add New Category")`);
		const hrefAddCategpry = await linkAddCategpry.getAttribute('href');
		await Promise.all([page.waitForNavigation(), page.goto(hrefAddCategpry)]);
	};

	/**
	 * go to category tab
	 */
	gotoCategories = async (): Promise<void> => {
		const linkCategories = await page.$(`.nav-tab-wrapper a:has-text("Categories")`);
		const hrefCategories = await linkCategories.getAttribute('href');
		await Promise.all([page.waitForNavigation(), page.goto(hrefCategories)]);
	};

	/**
	 * Create new category
	 */
	createNewCategory = async ({
		title,
		description,
	}: Args): Promise<{
		after: number;
		before: number;
	}> => {
		// count category before adding one
		const countCategoryBeforeAddOne = await this.getViewCount('All');
		// go to category tab
		await this.gotoCategories();
		// go to add new category
		await this.gotoAddNewCategory();
		// save new category
		await this.saveNewCategory({ title, description });
		// count category if the new created category is already exist
		const countCategoryAfterAddedOne = await this.getViewCount('All');
		// count added category
		const countAddedCategory = countCategoryAfterAddedOne - countCategoryBeforeAddOne;

		return { before: countCategoryBeforeAddOne + countAddedCategory, after: countCategoryAfterAddedOne };
	};

	/**
	 * Get the name of an category from <tr /> handle
	 */
	getCategoryName = async (item: ElementHandle): Promise<string> => {
		return await (await item.$('td.column-name a.row-title')).innerText();
	};

	/**
	 * Get the list of rows filtered by category name
	 */
	getCategoryByName = async (name: string): Promise<ElementHandle[]> => {
		// get all list of category
		const tableRows = await wpListTable.getListItems();
		// filter category by name
		const filteredRows = (
			await Promise.all(
				tableRows.map(async (row) => {
					// action to filter list item by category name
					const eventData = await this.getCategoryName(row);
					return eventData === name ? row : null;
				})
			)
		).filter(Boolean);

		return filteredRows;
	};

	/**
	 * get shortcode in category list base on category title
	 */
	getShortCode = async (categoryTitle: string): Promise<string> => {
		//Get the list of rows filtered by category title
		const filteredRows = await this.getCategoryByName(categoryTitle);
		//get category title
		const shortCode = await (await filteredRows[0].$('td.shortcode')).innerText();
		return shortCode;
	};

	/**
	 * Generate category shortcode base on category title
	 */
	shortcodeGenerator = (categoryTitle: string): string => {
		// convert all string to lower case
		const toLowerCase = categoryTitle.toLowerCase();
		// add dash to every space at string
		const replaceSpaceToDash = toLowerCase.replace(/\s/g, '-');
		// generate category shortcode format
		return `[ESPRESSO_EVENTS category_slug=${replaceSpaceToDash}]`;
	};
}
