import { EntityListParser } from '@e2eUtils/admin/event-editor';
import { clickButton } from '@e2eUtils/common';
import { fillDateTicketForm, DateTicketFormArgs } from './';
import { setPrice } from './setPrice';

const parser = new EntityListParser('ticket');

export const addNewTicket = async ({ amount, ...fields }: DateTicketFormArgs & { amount?: number }) => {
	await page.click('text=Add New Ticket');

	await fillDateTicketForm(fields);

	await clickButton('Set ticket prices');

	await page.waitForSelector('text=Add default prices');

	await page.click('text=Add default prices');

	await setPrice({ amount, isBasePrice: true } as any);

	await clickButton('Save and assign dates');

	// Ensure that trashed dates are visible
	await page.click('[aria-label="show trashed dates"]');

	await page.click('[aria-label="assign ticket"]');

	const waitForListUpdate = await parser.createWaitForListUpdate();

	await page.click('button[type=submit]');

	page.on('console', async (msg) => {
		for (let i = 0; i < msg.args().length; ++i) console.log(await msg.args()[i].jsonValue());
	});

	await waitForListUpdate();
};
