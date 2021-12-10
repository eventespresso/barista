import { Goto } from '@e2eUtils/admin';

import { EDTRGlider } from '../editor';

const edtrGlider = new EDTRGlider();

type Args = {
	title?: string;
	description?: string;
	shouldPublish?: boolean;
	category?: string;
};

async function fillEventFields({ title, description }: Args) {
	// fill in title event field
	await page.fill('#titlewrap #title', title || '');

	// fill in event description
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

	// trigger add new event button
	await Promise.all([page.waitForNavigation(), page.click('#add-new-event')]);
	// fill in event title and description
	await fillEventFields({ title, description });
	// save event
	await edtrGlider.saveEvent(shouldPublish);
}

export async function createMultipleEvents({ title, description, shouldPublish = true }: Args = {}) {
	// fill in event title and description
	await fillEventFields({ title, description });
	// save event
	await edtrGlider.saveEvent(shouldPublish);
	// tirgger add new event again
	await Promise.all([page.waitForNavigation(), page.click('a:has-text("Add Event")')]);
}
