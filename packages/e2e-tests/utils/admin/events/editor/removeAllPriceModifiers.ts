import { clickButton } from '@e2eUtils/common';

const selector = '[aria-label="delete price modifier"]';

export const removeAllPriceModifiers = async () => {
	let button = await page.$(selector);

	while (button) {
		await button.click();
		await clickButton('Yes');

		button = await page.$(selector);
	}
};
