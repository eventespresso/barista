import { Goto, WPListTable, createNewCategory, gotoCategories, deleteAllCategory } from '@e2eUtils/admin';

const wpListTable = new WPListTable();

beforeAll(async () => {
	await Goto.eventsListPage();
});

describe('Create new category test', () => {
	let countCategory: number;

	it('Remove all existing category and count category list', async () => {
		// go to category tab
		await gotoCategories();
		// count category if there is any
		countCategory = await wpListTable.getViewCount('All');
		// if there is any category exist remove all, otherwise do nothing
		if (countCategory) {
			await deleteAllCategory();
		}
		// count again category
		const countCategoryAfterRemoveALl = await wpListTable.getViewCount('All');
		// assert category reamaining, suppose to be it is equal to zero for starting
		expect(countCategoryAfterRemoveALl).toBe(0);
	});

	it('Create one sample category', async () => {
		// create one sample category
		await createNewCategory({ title: 'Sample category', description: 'Sample category description' });
		// go to category tab
		await gotoCategories();
		// count category if the new created category is already exist
		const countCategoryAfterAddedOne = await wpListTable.getViewCount('All');
		const countAddedEvent = countCategoryAfterAddedOne - countCategory;
		// assert remaing category
		expect(countCategoryAfterAddedOne).toBe(countCategory + countAddedEvent);
	});
});
