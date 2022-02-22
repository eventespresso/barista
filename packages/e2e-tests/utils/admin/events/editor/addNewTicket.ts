import { clickButton } from '@e2eUtils/common';

import { EntityListParser } from './EntityListParser';
import { fillDateTicketForm, DateTicketFormArgs } from './fillDateTicketForm';
import { setPrice } from './setPrice';

const parser = new EntityListParser('ticket');

export const addNewTicket = async ({
	amount,
	setDirectPrice = false,
	...fields
}: DateTicketFormArgs & { amount?: number; setDirectPrice?: boolean }) => {
	await page.click('text=Add New Ticket');

	await fillDateTicketForm(fields);

	// Set prices only if we have the amount
	if (amount !== undefined) {
		await clickButton('Set ticket prices');

		// if (setDirectPrice) {
		// 	// Set price amount
		// 	await page.fill(`.ee-input__price-field`, (amount || '').toString());
		// } else {

		await page.waitForSelector('text=Add default prices');

		await page.click('text=Add default prices');

		await setPrice({ amount, isBasePrice: true } as any);

		await clickButton('Save and assign dates');
		// }
	} else {
		await clickButton('Skip prices - assign dates');
	}

	// Ensure that trashed dates are visible
	await page.click('[aria-label="show trashed dates"]');

	await page.click('[aria-label="assign ticket"]');

	const waitForListUpdate = await parser.createWaitForListUpdate();

	await page.click('button[type=submit]');

	await waitForListUpdate();
};
