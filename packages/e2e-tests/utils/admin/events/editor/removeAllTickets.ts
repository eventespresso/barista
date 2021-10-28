import { clickButton } from '@e2eUtils/common';

const selector = '.ee-ticket-main-menu button';

export const removeAllTickets = async () => {
	let button = await page.$(selector);

	while (button) {
		await button.click();
		await clickButton('trash ticket');
		await clickButton('Yes');

		button = await page.$(selector);
	}
};
