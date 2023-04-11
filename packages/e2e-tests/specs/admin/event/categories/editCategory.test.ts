import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, CategoryManager } from '@e2eUtils/admin';
import { categoryData } from 'packages/e2e-tests/specs/shared/data';

const categoryManager = new CategoryManager();

const namespace = 'categories-edit-category';

let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);

	await Goto.eventsListPage();
	// process to delete all categories in a list
	await categoryManager.processToDeleteAllCategory();
});

afterAll(async () => {
	await capture?.stop();
});

describe('Edit category test', () => {
	it('Remove all existing category and count category list', async () => {
		// count again category after delete all
		const countCategoryAfterDeleteAll = await categoryManager.getViewCount('All');
		// assert category reamaining, suppose to be it is equal to zero for starting
		expect(countCategoryAfterDeleteAll).toBe(0);
	});

	it('Create one sample category', async () => {
		// create one sample category
		const { before: countCategoryBeforeAddOne, after: countCategoryAfterAddedOne } =
			await categoryManager.createNewCategory(categoryData.sample);
		// assert category count before and after added one category
		expect(countCategoryAfterAddedOne).toBe(countCategoryBeforeAddOne);
	});

	it('Update existing category', async () => {
		// count category if the new created category is already exist
		const countCategoryAfterAddedOne = await categoryManager.getViewCount('All');
		// get the first event in trash
		const firstItem = await categoryManager.getFirstListItem();
		// got to "restore from trash" action link for the selected first event
		const restoreLink = await categoryManager.getItemActionLinkByText(firstItem, 'Edit');
		await page.goto(restoreLink);
		// update first category in a list
		await categoryManager.saveNewCategory({
			title: 'Update category',
			description: 'Update category description',
		});
		//Get the list of rows filtered by category name
		const filteredRows = await categoryManager.getCategoryByName('Update category');
		// assert filtered category
		expect(filteredRows.length).toBe(countCategoryAfterAddedOne);
	});
});
