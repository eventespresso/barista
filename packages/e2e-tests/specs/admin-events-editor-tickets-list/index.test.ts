import { saveVideo, PageVideoCapture } from 'playwright-video';
import { Goto, DefaultSettingsManager } from '@e2eUtils/admin';
import { addNewTicket, createNewEvent, EntityListParser } from '@e2eUtils/admin/events';
import { activatePlugin, deactivatePlugin } from '@e2eUtils/admin/wp-plugins-page';

const baristaPlugin = 'barista/ee-barista.php';

const namespace = 'event.tickets.index';

const parser = new EntityListParser('ticket');
const defaultSettingsManager = new DefaultSettingsManager();

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

describe('availableTickets', () => {
	it('should add new ticket', async () => {
		await createNewEvent({ title: 'to be deleted' });

		const newTicketName = 'one way ticket';
		const newTicketAmount = 1234;

		await addNewTicket({ amount: newTicketAmount, name: newTicketName });

		const item = await parser.getItemBy('name', newTicketName);

		expect(await parser.getItemName(item)).toContain(newTicketName);

		const newTicketCurrencyNode = await item.innerText();

		expect(newTicketCurrencyNode).toContain('1419.10');
	});
});
