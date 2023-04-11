import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, TemplatesManager } from '@e2eUtils/admin';

const templatesManager = new TemplatesManager();

const namespace = 'templates-archive-use-custom-display-order';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);

	// Remove all event from link actions (View all events, Draft, Trash)
	await Goto.eventsListPage();
	//  go to templates tab
	await templatesManager.gotoTemplates();
});

afterAll(async () => {
	await capture?.stop();
});

describe('Use custom display order - archive test', () => {
	it('Set use custom display order to No', async () => {
		// set custom display order to "No" and get custom order classname value
		const { getClassName, getSelectedValue } = await templatesManager.processToSetCustomDisplayOrder({
			value: '0',
			archive: true,
		});
		// assert attribute classname value
		expect(getClassName).toBe('ui-sortable ui-sortable-disabled');
		// assert if already selected "No"
		expect(getSelectedValue).toBe('No');
	});

	it('Set use custom display order to Yes', async () => {
		// set custom display order to "Yes" and get custom order classname value
		const { getClassName, getSelectedValue } = await templatesManager.processToSetCustomDisplayOrder({
			value: '1',
			archive: true,
		});
		// assert attribute classname value
		expect(getClassName).toBe('ui-sortable');
		// assert if already selected "Yes"
		expect(getSelectedValue).toBe('Yes');
	});
});
