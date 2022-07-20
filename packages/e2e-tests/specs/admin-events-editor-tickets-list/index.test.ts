import { saveVideo, PageVideoCapture } from 'playwright-video';
import { addNewTicket, createNewEvent, EntityListParser } from '@e2eUtils/admin/events';

const namespace = 'event.tickets.index';

const parser = new EntityListParser('ticket');

let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);
});

afterAll(async () => {	
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
