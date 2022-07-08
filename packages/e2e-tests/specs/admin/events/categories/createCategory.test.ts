import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, CategoryManager, DefaultSettingsManager } from '@e2eUtils/admin';
import { categoryData } from '../../../shared/data';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

const baristaPlugin = 'barista/ee-barista.php';

const categoryManager = new CategoryManager();
const defaultSettingsManager = new DefaultSettingsManager();

const namespace = 'categories-create-category';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	
	await activatePlugin(baristaPlugin);
	
	await Goto.eventsListPage();
	//go to default settings tab
	await defaultSettingsManager.gotoDefaultSettings();
	await defaultSettingsManager.selectDefaultEditor('1');

	await Goto.eventsListPage();
	// process to delete all categories in a list
	await categoryManager.processToDeleteAllCategory();
});

afterAll(async () => {
	await deactivatePlugin(baristaPlugin);
	
	await capture?.stop();
});

describe('Create new category test', () => {
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
});
