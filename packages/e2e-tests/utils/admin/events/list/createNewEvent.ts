import { Goto } from '@e2eUtils/admin';

import { EDTRGlider } from '../editor';

const edtrGlider = new EDTRGlider();

type Args = {
	title?: string;
	description?: string;
	shouldPublish?: boolean;
};

async function fillEventFields({ title, description }) {
	await page.fill('#titlewrap #title', title || '');

	if (description) {
		await page.click('#content-html');

		await page.fill('#wp-content-editor-container textarea.wp-editor-area', description);
	}
}

export async function createNewEvent({ title, description, shouldPublish = true }: Args = {}) {
	await Goto.eventsListPage();

	await Promise.all([page.waitForNavigation(), page.click('#add-new-event')]);
	await fillEventFields({ title, description });
	await edtrGlider.saveEvent(shouldPublish);
}

export async function createMultipleEvents({ title, description, shouldPublish = true }: Args = {}) {
	await fillEventFields({ title, description });

	await edtrGlider.saveEvent(shouldPublish);

	await Promise.all([page.waitForNavigation(), page.click('a:has-text("Add Event")')]);
}
