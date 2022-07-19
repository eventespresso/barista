import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, DefaultSettingsManager } from '@e2eUtils/admin';
import { NOW } from '@eventespresso/constants';
import { add, getMonthName } from '@eventespresso/dates';
import { createNewEvent, setListDisplayControl, TicketFields, TicketEditor } from '@e2eUtils/admin/events';
import { expectCardToContain } from '../../assertions';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

const baristaPlugin = 'barista/ee-barista.php';

const namespace = 'event.tickets.edit';

const defaultSettingsManager = new DefaultSettingsManager();

const formData: TicketFields = {
	name: 'new ticket name',
	description: 'new ticket description',
	quantity: '1000',
	startDate: add('months', NOW, 1),
	endDate: add('months', NOW, 1),
};
const editor = new TicketEditor();

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
	// eslint-disable-next-line jest/expect-expect
	it('should edit an existing ticket', async () => {
		const item = await editor.getItem();
		await editor.editTicket(item, formData);

		await setListDisplayControl('ticket', 'both');

		await expectCardToContain({
			...formData,
			endDate: formData.endDate.getDate(),
			endDateMonth: getMonthName(formData.endDate),
			startDate: formData.startDate.getDate(),
			startDateMonth: getMonthName(formData.startDate),
			type: 'ticket',
		});
	});
});
