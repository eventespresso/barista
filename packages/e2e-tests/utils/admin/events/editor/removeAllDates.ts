import { clickButton } from '@e2eUtils/common';

const selector = '.ee-date-main-menu button';

export const removeAllDates = async () => {
	let button = await page.$(selector);

	while (button) {
		await button.click();
		await clickButton('trash datetime');
		await clickButton('Yes');

		button = await page.$(selector);
	}
};
