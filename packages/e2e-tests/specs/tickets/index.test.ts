/// <reference types="jest-playwright-preset" />
/// <reference types="expect-playwright" />

import { saveVideo } from 'playwright-video';

import { addNewTicket, createNewEvent, EntityListParser } from '../../utils';

const parser = new EntityListParser('ticket');

describe('availableTickets', () => {
	it('should add new ticket', async () => {
		const capture = await saveVideo(page, 'artifacts/new-ticket.mp4');

		await page.waitForTimeout(500);

		await createNewEvent({ title: 'to be deleted' });

		const newTicketName = 'one way ticket';
		const newTicketAmount = 1234;

		await addNewTicket({ amount: newTicketAmount, name: newTicketName });

		expect(await parser.getItemName()).toContain(newTicketName);

		const item = await parser.getItemBy('name', newTicketName);

		const newTicketCurrencyNode = await item.evaluate(
			(e) =>
				e
					.closest('.ee-entity-card-wrapper')
					.querySelector('.ee-currency-input .ee-tabbable-text__inner_wrapper').innerHTML
		);

		expect(newTicketCurrencyNode).toContain('1419.10');

		await capture.stop();
		await browser.close();
	});
});
