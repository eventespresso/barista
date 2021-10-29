import { Goto } from '@e2eUtils/admin';

import { EDTRGlider } from '../editor';

const edtrGlider = new EDTRGlider();

export async function createNewEvent({ title }: any = {}) {
	await Goto.eventsListPage();

	await Promise.all([page.waitForNavigation(), page.click('#add-new-event')]);

	await page.fill('#titlewrap #title', title);

	await edtrGlider.saveEvent();
}
