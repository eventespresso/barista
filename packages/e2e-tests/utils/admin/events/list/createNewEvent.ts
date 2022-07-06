import { Goto } from '@e2eUtils/admin';

import { EDTRGlider } from '../editor';

const edtrGlider = new EDTRGlider();

export type Args = {
	title?: string;
	description?: string;
	shouldPublish?: boolean;
	wpClassicEditor?: boolean;
};

export async function fillEventFields({ title, description, wpClassicEditor }: Args) {
	// fill in title event field
	await page.fill('#titlewrap #title', title || '');

	// fill in event description
	if (description) {
		if(wpClassicEditor){
			await page.click('#content-html');
			await page.fill('#wp-content-editor-container textarea.wp-editor-area', description);
		}else{
			const editorSelector = '.chakra-tabs__tab-panels .ee-rich-text-editor';
			await page.click(editorSelector);
			await page.type(editorSelector, description);

			await page.waitForSelector('text=successfully updated event');
		}
	}
}

export async function triggerAddNewEvent() {
	// trigger add new event button
	await Promise.all([page.waitForNavigation(), page.click('#add-new-event')]);
}

export async function fillAndSaveEvent({ title, description, shouldPublish = true }: Args = {}) {
	// fill in event title and description
	await fillEventFields({ title, description });

	// save event
	await edtrGlider.saveEvent(shouldPublish);
}

export async function createNewEvent({ title, description, shouldPublish = true }: Args = {}) {
	await Goto.eventsListPage();
	// trigger add new event button
	await triggerAddNewEvent();
	// fill and save events
	await fillAndSaveEvent({ title, description, shouldPublish });
}

export async function createMultipleEvents({ title, description, shouldPublish = true }: Args = {}) {
	// fill in event title and description
	await fillEventFields({ title, description });
	// save event
	await edtrGlider.saveEvent(shouldPublish);
	// tirgger add new event again
	await Promise.all([page.waitForNavigation(), page.click('a:has-text("Add New Event")')]);
}
