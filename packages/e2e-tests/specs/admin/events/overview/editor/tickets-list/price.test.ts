import { saveVideo } from 'playwright-video';

import { createNewEvent, getTicketPrice, TicketEditor, TPCSafari } from '@e2eUtils/admin/event-editor';

const namespace = 'event-tickets-price-change';

beforeAll(async () => {
	await saveVideo(page, `artifacts/${namespace}.mp4`);

	await createNewEvent({ title: namespace });
});

const editor = new TicketEditor();
const tpcSafari = new TPCSafari();

describe(namespace, () => {
	it('tests the price of default free ticket', async () => {
		// first/only item
		let item = await editor.getItem();

		let price = await getTicketPrice(item);
		expect(Number(price)).toBe(0);

		// Lets change the list view
		await editor.switchView('table');

		item = await editor.getItem();
		price = await getTicketPrice(item);
		expect(Number(price)).toBe(0);

		// switch the view back to card
		await editor.switchView('card');
		editor.reset();
	});

	it('tests the price update in TPC and in the ticket card and table row', async () => {
		// for the only ticket we have
		await tpcSafari.launch();
		await tpcSafari.setBasePrice({ amount: 13 });

		const ticketTotal = await tpcSafari.getTicketTotal();

		// Since there are no modifiers, totol is equal to base price
		expect(Number(ticketTotal)).toBe(13);

		// Now lets submit.
		await tpcSafari.submit();

		// first/only item
		let item = await editor.getItem();

		let price = await getTicketPrice(item);
		expect(Number(price)).toBe(13);

		// Lets change the list view
		await editor.toggleView();

		item = await editor.getItem();
		price = await getTicketPrice(item);
		expect(Number(price)).toBe(13);
	});

	it('tests the price update in inline edit input', async () => {
		// Ensure that we are in card view
		await editor.switchView('card');

		// first/only item
		let item = await editor.getItem();

		await editor.updatePriceInline(item, 47);
		let price = await getTicketPrice(item);
		expect(Number(price)).toBe(47);

		// Lets change the list view
		await editor.switchView('table');

		item = await editor.getItem();
		price = await getTicketPrice(item);
		expect(Number(price)).toBe(47);
	});
});
