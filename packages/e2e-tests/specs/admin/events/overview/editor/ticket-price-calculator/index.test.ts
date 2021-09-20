import { saveVideo } from 'playwright-video';
import { isNil } from 'ramda';

import { ticketTotalTestCases } from '@eventespresso/tpc/src/utils/test/ticketTotalData';
import { basePriceTestCases } from '@eventespresso/tpc/src/utils/test/basePriceData';
import { getBasePrice } from '@eventespresso/predicates';

import {
	addNewTicket,
	createNewEvent,
	removeAllTickets,
	removeAllPriceModifiers,
	TPCSafari,
	TicketEditor,
	getTicketPrice,
} from '@e2eUtils/admin/event-editor';

const editor = new TicketEditor();
const tpcSafari = new TPCSafari();

beforeAll(async () => {
	await saveVideo(page, 'artifacts/calculateTicketTotal.mp4');
	const newTicketName = 'one way ticket';
	const newTicketAmount = 10;

	await createNewEvent({ title: 'calculate ticket prices' });

	await removeAllTickets();

	await addNewTicket({ amount: newTicketAmount, name: newTicketName });
});

beforeEach(async () => {
	await tpcSafari.launch();
	await removeAllPriceModifiers();
});

const submitAndAssertTotal = async (total: string | number) => {
	await tpcSafari.submit();

	const item = await editor.getItem();
	const price = await getTicketPrice(item);
	expect(tpcSafari.getFormattedAmount(price)).toBe(tpcSafari.getFormattedAmount(total || 0));
};

describe('TPC:calculateTicketTotal', () => {
	// lets reverse calculate ticket total from the base price test data
	for (const { basePrice, name, prices, total } of basePriceTestCases) {
		if (isNil(total)) {
			continue;
		}

		it('reverses: ' + name, async () => {
			await tpcSafari.updateHeader('reverses: ' + name);
			// set the base price
			await tpcSafari.setBasePrice({ amount: basePrice, name });

			// set modifiers
			await tpcSafari.setPrices(prices);

			const calculatedTotal = await tpcSafari.getTicketTotal();

			expect(calculatedTotal).toEqual(tpcSafari.getFormattedAmount(total));

			await submitAndAssertTotal(calculatedTotal);
		});
	}

	for (const { name, prices, total } of ticketTotalTestCases) {
		it(name, async () => {
			await tpcSafari.updateHeader(name);

			// set modifiers
			await tpcSafari.setPrices(prices);

			const calculatedTotal = await tpcSafari.getTicketTotal();

			expect(calculatedTotal).toEqual(tpcSafari.getFormattedAmount(total));

			await submitAndAssertTotal(calculatedTotal);
		});
	}
});

describe('TPC:calculateBasePrice', () => {
	beforeEach(async () => {
		await tpcSafari.setReverseCalculate(true);
	});

	// lets reverse calculate base price from the ticket total test data
	for (const { name, prices, total } of ticketTotalTestCases) {
		it('reverses: ' + name, async () => {
			const testPrices = tpcSafari.createPrices(prices);

			const basePrice = getBasePrice(testPrices)?.amount || 0;

			await tpcSafari.updateHeader('reverses: ' + name);

			// set prices
			await tpcSafari.setPrices(prices, true);

			// Set ticket total
			await tpcSafari.setTicketTotal(total);

			const calculatedPrice = await tpcSafari.getBasePrice();

			expect(calculatedPrice).toBe(tpcSafari.getFormattedAmount(basePrice));

			await submitAndAssertTotal(total);
		});
	}

	for (const { basePrice, name, prices, total } of basePriceTestCases) {
		it(name, async () => {
			await tpcSafari.updateHeader(name);

			// set prices
			await tpcSafari.setPrices(prices);

			// Set ticket total
			await tpcSafari.setTicketTotal(total);

			const calculatedPrice = await tpcSafari.getBasePrice();

			expect(calculatedPrice).toBe(tpcSafari.getFormattedAmount(basePrice));

			await submitAndAssertTotal(total);
		});
	}
});
