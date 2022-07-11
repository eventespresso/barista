import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, DefaultSettingsManager, RegistrationOptions } from '@e2eUtils/admin';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

const baristaPlugin = 'barista/ee-barista.php';

const defaultSettingsManager = new DefaultSettingsManager();
const registrationOptions = new RegistrationOptions();

const namespace = 'default-settings-default-maximum-tickets-allowed';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);

	await activatePlugin(baristaPlugin);

	await Goto.eventsListPage();
	//go to default settings tab
	await defaultSettingsManager.gotoDefaultSettings();
	await defaultSettingsManager.selectDefaultEditor('1');
});

afterAll(async () => {
	await deactivatePlugin(baristaPlugin);
	
	await capture?.stop();
});

describe('Default maximum tickets allowed test', () => {
	it('Change default maximum ticket allowed and test', async () => {
		// Set new value for default maximum ticket allowed
		await defaultSettingsManager.setNewValueForDefaultMaxTicket('7');
		await Goto.eventsListPage();
		// trigger add new event button
		await Promise.all([page.waitForNavigation(), page.click('#add-new-event')]);
		// check maximum ticket allowed at EDTR
		const checkEDTRMaxTicket = await registrationOptions.getEventRegMaxTicket();
		// assert maximum ticket allowed at EDTR
		expect(checkEDTRMaxTicket).toBe('7');
	});
});
