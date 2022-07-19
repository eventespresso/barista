import { saveVideo, PageVideoCapture } from 'playwright-video';
import { createNewEvent, EntityListParser } from '@e2eUtils/admin/events';
import { Goto, DefaultSettingsManager } from '@e2eUtils/admin';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

const baristaPlugin = 'barista/ee-barista.php';

const parser = new EntityListParser();
const defaultSettingsManager = new DefaultSettingsManager();

const namespace = 'event-editor-switch-list-view';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await activatePlugin(baristaPlugin);
	
	await Goto.eventsListPage();
	//go to default settings tab
	await defaultSettingsManager.gotoDefaultSettings();
	await defaultSettingsManager.selectDefaultEditor('1');

	await createNewEvent({ title: namespace });
});

afterAll(async () => {
	await deactivatePlugin(baristaPlugin);
	
	await capture?.stop();
});

describe(namespace, () => {
	for (const entityType of ['ticket', 'datetime'] as const) {
		it(`tests the list view change for ${entityType}s list`, async () => {
			let view = await parser.setEntityType(entityType).getCurrentView();
			// card view is the default view
			expect(view).toBe('card');

			// try to switch to the same view
			await parser.switchView('card');
			view = await parser.getCurrentView();
			// view should not have changed
			expect(view).toBe('card');

			// Now lets switch to table view
			await parser.switchView('table');
			view = await parser.getCurrentView();
			expect(view).toBe('table');

			// Now lets switch back to card view
			await parser.switchView('card');
			view = await parser.getCurrentView();
			expect(view).toBe('card');

			// Restore default view
			parser.reset();
		});
	}
});
