import { clickButton } from '@e2eUtils/common';
import { EntityListParser } from './EntityListParser';

const parser = new EntityListParser('ticket');

export const removeLastTicket = async () => {
	try {
		await page.click('[aria-label="ticket main menu"]');

		const waitForListUpdate = await parser.createWaitForListUpdate();
		await clickButton('trash ticket');
		await clickButton('Yes');
		await waitForListUpdate();
	} catch (error) {
		// There may not be any ticket to remove
	}
};
