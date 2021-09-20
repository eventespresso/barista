import { saveVideo } from 'playwright-video';

import { createNewEvent, getTicketQuantityByName, TicketEditor } from '@e2eUtils/admin/event-editor';

const namespace = 'event.tickets.card.view.inline-inputs';

beforeAll(async () => {
	await saveVideo(page, `artifacts/${namespace}.mp4`);

	await createNewEvent({ title: namespace });
});

const editor = new TicketEditor();

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
