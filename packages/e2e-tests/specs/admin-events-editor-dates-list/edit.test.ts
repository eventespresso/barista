import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, DefaultSettingsManager } from '@e2eUtils/admin';
import { NOW } from '@eventespresso/constants';
import { add, getMonthName } from '@eventespresso/dates';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

import { createNewEvent, setListDisplayControl, DateEditor, DateFields } from '@e2eUtils/admin/events';

import { expectCardToContain } from '../../assertions';

const baristaPlugin = 'barista/ee-barista.php';

const namespace = 'event.dates.edit';

const defaultSettingsManager = new DefaultSettingsManager();

const editor = new DateEditor();

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

const formData: DateFields = {
	name: 'new date name',
	description: 'new date description',
	capacity: '1000',
	startDate: add('months', NOW, 1),
	endDate: add('months', NOW, 1),
};

describe(namespace, () => {
	// eslint-disable-next-line jest/expect-expect
	it('should edit an existing datetime', async () => {
		const dateItem = await editor.getItem();
		await editor.editDate(dateItem, formData);

		await setListDisplayControl('datetime', 'both');

		await expectCardToContain({
			...formData,
			endDate: formData.endDate.getDate(),
			endDateMonth: getMonthName(formData.endDate),
			startDate: formData.startDate.getDate(),
			startDateMonth: getMonthName(formData.startDate),
			type: 'datetime',
		});
	});
});
