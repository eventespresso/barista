import { createNewEvent, getTicketPrice, TicketEditor, TPCSafari } from '@e2eUtils/admin/event-editor';

import { crazyTestCases } from './data';

const namespace = 'event-tickets-price-craziness';

const editor = new TicketEditor();
const tpcSafari = new TPCSafari();

beforeAll(async () => {
	await createNewEvent({ title: namespace });
	// Ensure that we are in card view
	await editor.switchView('card');
});

describe(namespace, () => {
	for (const { name, inputTotal, expectedTotal } of crazyTestCases) {
		it(name, async () => {
			// first/only item
			const item = await editor.getItem();

			await editor.updatePriceInline(item, inputTotal);
			const price = await getTicketPrice(item);
			expect(Number(price)).toBe(expectedTotal);
			expect(tpcSafari.getFormattedAmount(price)).toBe(tpcSafari.getFormattedAmount(expectedTotal));
		});
	}
});
