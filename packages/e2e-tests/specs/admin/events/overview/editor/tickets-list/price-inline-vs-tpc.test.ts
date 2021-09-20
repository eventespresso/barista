import { createNewEvent, getTicketPrice, TicketEditor, TPCSafari } from '@e2eUtils/admin/event-editor';

const namespace = 'event-tickets-price-change-inline-vs-tpc';

const editor = new TicketEditor();
const tpcSafari = new TPCSafari();

beforeAll(async () => {
	await createNewEvent({ title: namespace });
	// Ensure that we are in card view
	await editor.switchView('card');
});

describe(namespace, () => {
	it('tests the price change in inline edit input reflects in TPC', async () => {
		// first/only item
		const item = await editor.getItem();

		await editor.updatePriceInline(item, 63);
		const price = await getTicketPrice(item);
		expect(Number(price)).toBe(63);

		// for the only ticket we have
		await tpcSafari.launch();

		const basePrice = await tpcSafari.getBasePrice();
		const ticketTotal = await tpcSafari.getTicketTotal();
		// Ticket total and base price should reflect in TPC
		expect(Number(basePrice)).toBe(63);
		expect(Number(ticketTotal)).toBe(63);

		// Since we edited the price inline, reverse calculate should be ON
		const isReverseCalculateOn = await tpcSafari.isReverseCalculateOn();
		expect(isReverseCalculateOn).toBe(true);

		await tpcSafari.close();
	});

	it('tests the price change in TPC reflects in inline edit input', async () => {
		// for the only ticket we have
		await tpcSafari.launch();

		await tpcSafari.setReverseCalculate(true);

		// Set ticket total
		await tpcSafari.setTicketTotal(357.87);

		// Now lets submit.
		await tpcSafari.submit();

		// first/only item
		let item = await editor.getItem();

		let price = await getTicketPrice(item);
		expect(Number(price)).toBe(357.87);

		// Lets change the list view to table
		await editor.toggleView();
		// The change should be reflected
		item = await editor.getItem();
		price = await getTicketPrice(item);
		expect(Number(price)).toBe(357.87);
	});
});
