import { clickButton } from '@e2eUtils/common';
import { IS_WP_MULTISITE_NETWORK } from '../../../../utils/dev/config';

import { DateEditor } from './DateEditor';
import { DateTicketFormArgs, fillDateTicketForm } from './fillDateTicketForm';

const editor = new DateEditor();

export const addNewDate = async (fields: DateTicketFormArgs) => {
	await page.click('text=Add New Date');

	if(fields.singleDate !== undefined || IS_WP_MULTISITE_NETWORK){
		await page.click('text=Add Single Date');
	}

	await fillDateTicketForm(fields);

	await clickButton('Save and assign tickets');

	await page.waitForSelector('[aria-label="assign ticket"]');

	await page.click('[aria-label="assign ticket"]');

	await editor.submitEditForm();
};
