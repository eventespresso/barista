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

describe('Create new category test', () => {
	let countCategory: number;

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
		const countCategoryAfterAddedOne = await categoryManager.getViewCount('All');
		const countAddedEvent = countCategoryAfterAddedOne - countCategory;
		// assert remaing category
		expect(countCategoryAfterAddedOne).toBe(countCategory + countAddedEvent);
	});
});
