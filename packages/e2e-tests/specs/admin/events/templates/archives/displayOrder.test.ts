import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, TemplatesManager } from '@e2eUtils/admin';

const templatesManager = new TemplatesManager();

const namespace = 'templates-archives-display-order';
let capture: PageVideoCapture;

beforeAll(async () => {
	// capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await Goto.eventsListPage();
	await templatesManager.gotoTemplates();
});

afterAll(async () => {
	// await capture?.stop();
});

describe('Display order - archives test', () => {
	it('Set custom display order to "Yes', async () => {
		// set acustom display order to "yes" and get classname
		const getClassname = await templatesManager.setCustomDisplayOrder({ value: '1', archive: true });
		// assert class name for cutom order
		expect(getClassname).toBe('ui-sortable');
		// get selected custom order value
		const getSelectedValue = await templatesManager.getSelectedCustomDisplayOrder({ archive: true });
		// assert custom order value, suppose to be "Yes" after select
		expect(getSelectedValue).toBe('Yes');
	});

	it('Drag "dates and times" to into first list', async () => {
		const ulElement = page.$('.ui-sortable');
		const liElement = page.$('#datetimes');
		const ulElementBound = await (await ulElement).boundingBox();
		const liElementBound = await (await liElement).boundingBox();

		await page.mouse.move(liElementBound.x, liElementBound.y - 600);
		await page.mouse.down();
		await page.mouse.move(ulElementBound.x, ulElementBound.y);
		// console.log({
		// 	xxxx: liElementBound.x - 200,
		// 	yyyyy: liElementBound.y - 200,
		// 	width: liElementBound.width,
		// 	height: liElementBound.height,
		// });
		// console.log({ xxxx: ulElementBound.x, yyyyy: ulElementBound.y });

		// await page.mouse.down();
		await page.$('.button-primary.save');
		// await Promise.all([page.waitForNavigation(), page.$('.button-primary.save')]);
		expect(1).toBe(1);
	});
});
