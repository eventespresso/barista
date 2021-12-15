import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, CategoryManager } from '@e2eUtils/admin';

const categoryManager = new CategoryManager();

const namespace = 'categories-create-category';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await Goto.eventsListPage();
});

afterAll(async () => {
	await capture?.stop();
});

describe('Edit category test', () => {
	let countCategory: number;
	let countCategoryAfterAddedOne: number;

	it('Remove all existing category and count category list', async () => {
		// go to category tab
		await categoryManager.gotoCategories();
		// count category if there is any
		countCategory = await categoryManager.getViewCount('All');
		// if there is any category exist remove all, otherwise do nothing
		if (countCategory) {
			await categoryManager.deleteAllCategory();
		}
		// count again category
		const countCategoryAfterRemoveALl = await categoryManager.getViewCount('All');
		// assert category reamaining, suppose to be it is equal to zero for starting
		expect(countCategoryAfterRemoveALl).toBe(0);
	});

	it('Create one sample category', async () => {
		// create one sample category
		await categoryManager.createNewCategory({
			title: 'Sample category',
			description: 'Sample category description',
		});
		// go to category tab
		await categoryManager.gotoCategories();
		// count category if the new created category is already exist
		countCategoryAfterAddedOne = await categoryManager.getViewCount('All');
		const countAddedEvent = countCategoryAfterAddedOne - countCategory;
		// assert remaing category
		expect(countCategoryAfterAddedOne).toBe(countCategory + countAddedEvent);
	});

	it('Update existing category', async () => {
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
