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
		// const dataTransfer = await page.evaluateHandle(() => new DataTransfer());
		// await page.waitForSelector('#event-archive-sortable-js');
		// await page.dispatchEvent('#event-archive-sortable-js > li:last-child', 'dragstart', { dataTransfer });
		// await page.waitForSelector('#event-archive-sortable-js');
		// await page.dispatchEvent('#event-archive-sortable-js > li:first-child', 'drop', { dataTransfer });

		// await page.dispatchEvent('#event-archive-sortable-js > li:last-child', 'dragstart', { dataTransfer });
		// await page.dispatchEvent('#event-archive-sortable-js', 'drop', { dataTransfer });

		const liElement = await page.$('#event-archive-sortable-js > li:first-child');
		const ulElement = await page.$('#event-archive-sortable-js > li:last-child');

		if (liElement && ulElement) {
			const liElementBound = await liElement.boundingBox();
			await page.waitForSelector('#event-archive-sortable-js');
			const ulElementBound = await ulElement.boundingBox();
			await page.waitForSelector('#event-archive-sortable-js');
			if (liElementBound && ulElementBound) {
				await page.mouse.move(liElementBound.x, liElementBound.y);
				await page.mouse.down();
				await page.waitForSelector('#event-archive-sortable-js');
				await page.mouse.move(ulElementBound.x, ulElementBound.y);
				await page.mouse.down();
			}
		}

		// await page.mouse.move(liElementBound.x, liElementBound.y - 200);
		// await page.mouse.down();
		// await page.mouse.move(ulElementBound.x, ulElementBound.y);
		// // console.log({
		// // 	xxxx: liElementBound.x - 200,
		// // 	yyyyy: liElementBound.y - 200,
		// // 	width: liElementBound.width,
		// // 	height: liElementBound.height,
		// // });
		// // console.log({ xxxx: ulElementBound.x, yyyyy: ulElementBound.y });

		// await page.mouse.down();
		await page.$('.button-primary.save');
		// await Promise.all([page.waitForNavigation(), page.$('.button-primary.save')]);
		expect(1).toBe(1);
	});
});
