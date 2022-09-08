import { clickButton } from '@e2eUtils/common';
import { EntityListParser } from './EntityListParser';
import { DO_NOT_USE_BARISTA_STRUCTURE } from '../../../../utils/dev/config';

const parser = new EntityListParser('ticket');

export const removeLastTicket = async () => {
	try {
		await page.click('[aria-label="ticket main menu"]');

		const waitForListUpdate = await parser.createWaitForListUpdate();
		await clickButton('trash ticket');

		let modalConfirmText = 'confirm'
		if(DO_NOT_USE_BARISTA_STRUCTURE){
			modalConfirmText = 'Yes';
		}
		await clickButton(modalConfirmText);

		await waitForListUpdate();
	} catch (error) {
		// There may not be any ticket to remove
	}
};
