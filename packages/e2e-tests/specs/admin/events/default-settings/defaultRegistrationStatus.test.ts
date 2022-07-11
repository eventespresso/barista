import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, DefaultSettingsManager } from '@e2eUtils/admin';
import { defaultSettingsData } from '../../../shared/data';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

const baristaPlugin = 'barista/ee-barista.php';

const defaultSettingsManager = new DefaultSettingsManager();

const namespace = 'default-settings-registration-status';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);

	await activatePlugin(baristaPlugin);

	await Goto.eventsListPage();
	// go to default settings tab
	await defaultSettingsManager.gotoDefaultSettings();
	await defaultSettingsManager.selectDefaultEditor('1');

});

afterAll(async () => {
	await deactivatePlugin(baristaPlugin);
	
	await capture?.stop();
});

describe('Default registration status test', () => {
	it('Check selected default registration status', async () => {
		// Get selected default status and return weither option value or innertext of the option
		const getSelectedDefaultStatus = await defaultSettingsManager.getSelectedDefaultStatus({ value: true });
		// assert the current selected registration status
		expect(getSelectedDefaultStatus).toBe(
			defaultSettingsData.defaultRegStatusOptions[getSelectedDefaultStatus].value
		);
	});

	it('Select approved default registration status', async () => {
		// Process to select default registration status base on option value
		const afterSelectStatus = await defaultSettingsManager.processToSelectRegStatus(
			defaultSettingsData.defaultRegStatusOptions.RAP.value
		);
		// assert before and after selecting new registration status
		expect(afterSelectStatus).toBe(defaultSettingsData.defaultRegStatusOptions.RAP.value);
	});

	it('Select not approved default registration status', async () => {
		// Process to select default registration status base on option value
		const afterSelectStatus = await defaultSettingsManager.processToSelectRegStatus(
			defaultSettingsData.defaultRegStatusOptions.RNA.value
		);
		// assert before and after selecting new registration status
		expect(afterSelectStatus).toBe(defaultSettingsData.defaultRegStatusOptions.RNA.value);
	});
});
