import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, DefaultSettingsManager } from '@e2eUtils/admin';
import { defaultRegStatusOptions } from '../../../shared/data';

const defaultSettingsManager = new DefaultSettingsManager();

const namespace = 'default-settings-registration-status';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await Goto.eventsListPage();
	// go to default settings tab
	await defaultSettingsManager.gotoDefaultSettings();
});

afterAll(async () => {
	await capture?.stop();
});

describe('Default registration status test', () => {
	it('Check selected default registration status', async () => {
		// Get selected default status and return weither option value or innertext of the option
		const getSelectedDefaultStatus = await defaultSettingsManager.getSelectedDefaultStatus({ value: true });
		// assert the current selected registration status
		expect(getSelectedDefaultStatus).toBe(defaultRegStatusOptions[getSelectedDefaultStatus].value);
	});

	it('Select approved default registration status', async () => {
		// Process to select default registration status base on option value
		const afterSelectStatus = await defaultSettingsManager.processToSelectRegStatus(
			defaultRegStatusOptions.RAP.value
		);
		// assert before and after selecting new registration status
		expect(afterSelectStatus).toBe(defaultRegStatusOptions.RAP.value);
	});

	it('Select not approved default registration status', async () => {
		// Process to select default registration status base on option value
		const afterSelectStatus = await defaultSettingsManager.processToSelectRegStatus(
			defaultRegStatusOptions.RNA.value
		);
		// assert before and after selecting new registration status
		expect(afterSelectStatus).toBe(defaultRegStatusOptions.RNA.value);
	});
});
