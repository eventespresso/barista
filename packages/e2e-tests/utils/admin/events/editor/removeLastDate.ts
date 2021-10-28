import { clickButton } from '@e2eUtils/common';

export const removeLastDate = async () => {
	await page.click('[aria-label="event date main menu"]');

	await clickButton('trash datetime');
	await clickButton('Yes');
};
