import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, DefaultSettingsManager } from '@e2eUtils/admin';
import { createNewEvent, getTicketQuantityByName, TicketEditor } from '@e2eUtils/admin/events';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

const baristaPlugin = 'barista/ee-barista.php';

const namespace = 'event.tickets.card.view.inline-inputs';

const editor = new TicketEditor();
const defaultSettingsManager = new DefaultSettingsManager();

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
	it('should check the ticket card inline inputs', async () => {
		const newTicketName = 'new ticket name';
		const newTicketDesc = 'new ticket description';
		const newTicketQty = '123';

		// first/only item
		const item = await editor.getItem();

		await editor.updateNameInline(item, newTicketName);
		await editor.updateDescInline(item, newTicketDesc);
		await editor.updateQuantityInline(item, newTicketQty);

		expect(await editor.getItemName(item)).toContain(newTicketName);

		expect(await editor.getItemDesc(item)).toContain(newTicketDesc);

		const quantity = await getTicketQuantityByName(newTicketName);

		expect(quantity).toBe(newTicketQty);
	});
});
