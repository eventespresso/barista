import { clickButton } from '@e2eUtils/common';

import { DateEditor } from './DateEditor';
import { DateTicketFormArgs, fillDateTicketForm } from './fillDateTicketForm';

const editor = new DateEditor();

export const addNewDate = async (fields: DateTicketFormArgs) => {
	await page.click('text=Add New Date');

	await fillDateTicketForm(fields);

	await clickButton('Save and assign tickets');

	await page.waitForSelector('[aria-label="assign ticket"]');

	await page.click('[aria-label="assign ticket"]');

	await editor.submitEditForm();
};
