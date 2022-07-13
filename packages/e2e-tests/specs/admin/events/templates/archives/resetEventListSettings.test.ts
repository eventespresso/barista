import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, TemplatesManager, DefaultSettingsManager } from '@e2eUtils/admin';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

const baristaPlugin = 'barista/ee-barista.php';

const templatesManager = new TemplatesManager();
const defaultSettingsManager = new DefaultSettingsManager();

const namespace = 'templates-archive-reset-event-list-settings';
let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await activatePlugin(baristaPlugin);
	
	await Goto.eventsListPage();
	//go to default settings tab
	await defaultSettingsManager.gotoDefaultSettings();
	await defaultSettingsManager.selectDefaultEditor('1');

	await Goto.eventsListPage();
	//  go to templates tab
	await templatesManager.gotoTemplates();
});

afterAll(async () => {
	await deactivatePlugin(baristaPlugin);
	
	await capture?.stop();
});

describe('Reset event list settings - archive test', () => {
	it('Set display status banner to yes', async () => {
		// first set/select value at display status banner and save then return the innertext value selected
		const getSelectedValue = await templatesManager.setAndGetValueForDisplayStatusBanner({
			status: '1',
			single: false,
		});

		// assert display status banner value, it should be equal to "Yes"
		expect(getSelectedValue).toBe('Yes');
	});

	it('Set display description to "full description"', async () => {
		// set display description to "full description" and save
		await templatesManager.setAndSaveDisplayDescription({ status: '2' });
		// get the selected display description after selecting one
		const getSelectedValue = await templatesManager.getSelectedDisplayDescription();
		// assert selected display description
		expect(getSelectedValue).toBe('full description');
	});

	it('Set display ticket selector to "Yes"', async () => {
		// set display ticket selector to "Yes"
		await templatesManager.setAndSaveDisplayTicketSelector({ value: '1' });
		// gett selected display ticket selector at templates archive section
		const getSelectedValue = await templatesManager.getSelectedDisplayTicketSelector();
		// assert selected value, suppose to be "Yes"
		expect(getSelectedValue).toBe('Yes');
	});

	it('Set display datetimes to "No"', async () => {
		// set and save for display datetimes at archive template settings
		await templatesManager.setAndSaveDisplayDatetimes({ value: '0' });
		// get selected value for display datetimes at archive template settings
		const getSelectedValue = await templatesManager.getSelectedDisplayDatetimes();
		// assert selected value
		expect(getSelectedValue).toBe('No');
	});

	it('Set display venue details to "Yes"', async () => {
		// set and select display venue details to 'Yes'
		await templatesManager.setAndSaveDisplayVenueDetails({ value: '1', archive: true });
		// get selected display venue details at templates archive section
		const getSelectedValue = await templatesManager.getSelectedDisplayVenueDetails({ archive: true });
		// assert selected value
		expect(getSelectedValue).toBe('Yes');
	});

	it('Set display expired events to "Yes"', async () => {
		// set and save for display expired events at archive template settings
		await templatesManager.setAndSaveDisplayExpiredEvents({ value: '1' });
		// get selected value for display expired events at archive template settings
		const getSelectedValue = await templatesManager.getSelectedDisplayExpiredEvents();
		// assert selected value for expired notice, suppose to "Yes"
		expect(getSelectedValue).toBe('Yes');
	});

	it('Set use custom display order to Yes', async () => {
		// set custom display order to "Yes" and get custom order classname value
		await templatesManager.setCustomDisplayOrder({ value: '1', archive: true });
		// get selected custom display at templates tab
		const getSelectedValue = await templatesManager.getSelectedCustomDisplayOrder({ archive: true });
		// assert if already selected "Yes"
		expect(getSelectedValue).toBe('Yes');
	});

	it('Set reset event list settings to "Yes', async () => {
		// trigger the reset event list settings
		await templatesManager.setAndSaveResetEventListSettings({ value: '1' });

		// get selected value for status banner at archive
		const getSelectedStatusBanner = await templatesManager.getSelectedStatusBanner({ text: true, single: false });
		// assert slected value for status banner
		expect(getSelectedStatusBanner).toBe('No');

		// get selected value for display description at archive
		const getSelectedDisplayDescription = await templatesManager.getSelectedDisplayDescription();
		// assert selected value for display description
		expect(getSelectedDisplayDescription).toBe('excerpt (short desc)');

		// get selected value for display ticket selector at archive
		const getSelectedDisplayTicketSelector = await templatesManager.getSelectedDisplayTicketSelector();
		// assert selected value for display ticket description
		expect(getSelectedDisplayTicketSelector).toBe('No');

		// get selected value for display datetimes at archive
		const getSelectedDisplayDatetimes = await templatesManager.getSelectedDisplayDatetimes();
		// assert selected value for display datetimes
		expect(getSelectedDisplayDatetimes).toBe('Yes');

		// get selected value for display venue details at archive
		const getSelectedDisplayVenueDetails = await templatesManager.getSelectedDisplayVenueDetails({ archive: true });
		// assert selected value for display venue details
		expect(getSelectedDisplayVenueDetails).toBe('No');

		// get selected value for display expired events at archive
		const getSelectedDisplayExpiredEvents = await templatesManager.getSelectedDisplayExpiredEvents();
		// assert selected value for display expired events
		expect(getSelectedDisplayExpiredEvents).toBe('No');

		// get selected value for custom display order
		const getSelectedCustomDisplayOrder = await templatesManager.getSelectedCustomDisplayOrder({ archive: true });
		// assert selected value for custom display order
		expect(getSelectedCustomDisplayOrder).toBe('No');
	});
});
