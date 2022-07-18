import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, TemplatesManager, DefaultSettingsManager } from '@e2eUtils/admin';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

const baristaPlugin = 'barista/ee-barista.php';

const templatesManager = new TemplatesManager();
const defaultSettingsManager = new DefaultSettingsManager();

const namespace = 'templates-single-use-custom-display-order';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await activatePlugin(baristaPlugin);
	
	await Goto.eventsListPage();
	//go to default settings tab
	await defaultSettingsManager.gotoDefaultSettings();
	await defaultSettingsManager.selectDefaultEditor('1');

	// Remove all event from link actions (View all events, Draft, Trash)
	await Goto.eventsListPage();
	//  go to templates tab
	await templatesManager.gotoTemplates();
});

afterAll(async () => {
	await deactivatePlugin(baristaPlugin);
	
	await capture?.stop();
});

describe('Use custom display order - single test', () => {
	it('Set use custom display order to No', async () => {
		// set custom display order to "No" and get custom order classname value
		const { getClassName, getSelectedValue } = await templatesManager.processToSetCustomDisplayOrder({
			value: '0',
			archive: false,
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
			archive: false,
		});
		// assert attribute classname value
		expect(getClassName).toBe('ui-sortable');
		// assert if already selected "Yes"
		expect(getSelectedValue).toBe('Yes');
	});
});
