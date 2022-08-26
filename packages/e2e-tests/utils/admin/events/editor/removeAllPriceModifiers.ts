import { clickButton } from '@e2eUtils/common';
import { DO_NOT_USE_BARISTA_STRUCTURE } from '../../../../utils/dev/config';

const selector = '[aria-label="delete price modifier"]';

export const removeAllPriceModifiers = async () => {
	let button = await page.$(selector);

	while (button) {
		await button.click();

		let modalConfirm = 'confirm';
		if(DO_NOT_USE_BARISTA_STRUCTURE){
			modalConfirm = 'Yes';
		}
		await clickButton(modalConfirm);

		button = await page.$(selector);
	}
};
