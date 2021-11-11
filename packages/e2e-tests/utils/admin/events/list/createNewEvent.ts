import { Goto } from '@e2eUtils/admin';

import { EDTRGlider } from '../editor';

const edtrGlider = new EDTRGlider();

type Args = {
	title?: string;
	description?: string;
	toSave?: boolean;
};

export async function createNewEvent({ title, description, toSave = true }: Args = {}) {
	await Goto.eventsListPage();

	await Promise.all([page.waitForNavigation(), page.click('#add-new-event')]);

	await page.fill('#titlewrap #title', title || '');

	if (description) {
		await page.click('#content-html');

		await page.fill('#wp-content-editor-container textarea.wp-editor-area', description);
	}

	await edtrGlider.saveEvent(toSave);
}
