import { Goto } from '@e2eUtils/admin';

import { EDTRGlider } from '../editor';

const edtrGlider = new EDTRGlider();

type Args = {
	title?: string;
	description?: string;
	shouldPublish?: boolean;
	category?: string;
};

async function fillEventFields({ title, description, category }: Args) {
	await page.fill('#titlewrap #title', title || '');

	if (description) {
		await page.click('#content-html');

		await page.fill('#wp-content-editor-container textarea.wp-editor-area', description);
	}

	if (category) {
		// const linkAddCategpry = await page.$(`a:has-text("Event Categories")`);
		// const hrefAddCategpry = await linkAddCategpry.getAttribute('href');
		// await Promise.all([page.waitForNavigation(), page.click(`a:has-text("Event Categories")`)]);
		// await page.check(`#in-espresso_event_categories-4`);
	}
}

export async function createNewEvent({ title, description, category, shouldPublish = true }: Args = {}) {
	await Goto.eventsListPage();

	await Promise.all([page.waitForNavigation(), page.click('#add-new-event')]);
	await fillEventFields({ title, description, category });
	await edtrGlider.saveEvent(shouldPublish);
}

export async function createMultipleEvents({ title, description, shouldPublish = true }: Args = {}) {
	await fillEventFields({ title, description });

	await edtrGlider.saveEvent(shouldPublish);

	await Promise.all([page.waitForNavigation(), page.click('a:has-text("Add Event")')]);
}
