import { clickButton } from '@e2eUtils/common';
import { DO_NOT_USE_BARISTA_STRUCTURE } from '../../../../utils/dev/config';

const selector = '.ee-ticket-main-menu button';

export const removeAllTickets = async () => {
	let button = await page.$(selector);

	while (button) {
		await button.click();
		await clickButton('trash ticket');

		let modalConfirm = 'confirm';
		if(DO_NOT_USE_BARISTA_STRUCTURE){
			modalConfirm = 'Yes';
		}
		await clickButton(modalConfirm);

		button = await page.$(selector);
	}
};
