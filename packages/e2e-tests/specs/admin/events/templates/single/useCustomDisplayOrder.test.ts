import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, TemplatesManager } from '@e2eUtils/admin';

const templatesManager = new TemplatesManager();

const namespace = 'templates-single-use-custom-display-order';
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

describe('Use custom display order - single test', () => {
	it('Set use custom display order to No', async () => {
		// set custom display order to "No"
		await templatesManager.setCustomDisplayOrder({ value: '0' });
		// get event single sortable attribute classname value
		const getClassName = await templatesManager.getEventSingleSortableAttribute('class');
		// assert attribute classname value
		expect(getClassName).toBe('ui-sortable ui-sortable-disabled');
	});

	it('Set use custom display order to Yes', async () => {
		// set custom display order to "Yes"
		await templatesManager.setCustomDisplayOrder({ value: '1' });
		// get event single sortable attribute classname value
		const getClassName = await templatesManager.getEventSingleSortableAttribute('class');
		// assert attribute classname value
		expect(getClassName).toBe('ui-sortable');
	});
});
