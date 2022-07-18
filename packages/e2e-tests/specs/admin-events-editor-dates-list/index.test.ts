import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, DefaultSettingsManager } from '@e2eUtils/admin';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';
import { addNewDate, createNewEvent, EntityListParser } from '@e2eUtils/admin/events';

const baristaPlugin = 'barista/ee-barista.php';

const namespace = 'event.dates.index';

const defaultSettingsManager = new DefaultSettingsManager();

const parser = new EntityListParser('datetime');

let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
	await activatePlugin(baristaPlugin);
	
	await Goto.eventsListPage();
	//go to default settings tab
	await defaultSettingsManager.gotoDefaultSettings();
	await defaultSettingsManager.selectDefaultEditor('1');

	await Goto.eventsListPage();
});

afterAll(async () => {
	await deactivatePlugin(baristaPlugin);
	
	await capture?.stop();
});


describe('eventDates', () => {
	it('should add new date', async () => {
		await createNewEvent({ title: 'to be deleted' });

		const newDateName = 'brand new date';

		await addNewDate({ name: newDateName });

		const newDate = await parser.getItemBy('name', newDateName);

		expect(await newDate.innerText()).toContain(newDateName);
	});
});
