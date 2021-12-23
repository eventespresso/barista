import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, DefaultSettingsManager } from '@e2eUtils/admin';

const defaultSettingsManager = new DefaultSettingsManager();

const namespace = 'default-settings-default-maximum-tickets-allowed';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await Goto.eventsListPage();
	//go to default settings tab
	await defaultSettingsManager.gotoDefaultSettings();
});

afterAll(async () => {
	await capture?.stop();
});

describe('Default maximum tickets allowed test', () => {
	it('Change default maximum ticket allowed and test', async () => {
		// Get the default value set on default maximum ticket allowed field
		const getDefaultMaxBeforeChange = await defaultSettingsManager.getDefaultMaxTicket();
		// Set new value for default maximum ticket allowed
		await defaultSettingsManager.setNewValueForDefaultMaxTicket('7');
		await Goto.eventsListPage();
		// trigger add new event button
		await Promise.all([page.waitForNavigation(), page.click('#add-new-event')]);
		// check maximum ticket allowed at EDTR
		const checkEDTRMaxTicket = await defaultSettingsManager.getEventRegMaxTicket();
		// get added number
		const getAdded = Number(checkEDTRMaxTicket) - Number(getDefaultMaxBeforeChange);
		// assert maximum ticket allowed at EDTR
		expect(Number(checkEDTRMaxTicket)).toBe(getAdded + Number(getDefaultMaxBeforeChange));
	});
});
