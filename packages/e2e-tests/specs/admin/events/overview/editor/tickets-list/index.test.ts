import { saveVideo } from 'playwright-video';

import { addNewTicket, createNewEvent, EntityListParser } from '@e2eUtils/admin/event-editor';

const parser = new EntityListParser('ticket');

describe('availableTickets', () => {
	it('should add new ticket', async () => {
		const capture = await saveVideo(page, 'artifacts/new-ticket.mp4');

		await createNewEvent({ title: 'to be deleted' });

		const newTicketName = 'one way ticket';
		const newTicketAmount = 1234;

		await addNewTicket({ amount: newTicketAmount, name: newTicketName });

		const item = await parser.getItemBy('name', newTicketName);

		expect(await parser.getItemName(item)).toContain(newTicketName);

		const newTicketCurrencyNode = await item.innerText();

		expect(newTicketCurrencyNode).toContain('1419.10');

		await capture.stop();
		await browser.close();
	});
});
