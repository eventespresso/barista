import { Goto } from '@e2eUtils/admin';

const ticketsListSelector = '#ee-entity-list-tickets .ee-entity-list__card-view';

export async function createNewEvent({ title }: any = {}) {
	await Goto.eventsListPage();

	await page.click('#add-new-event');

	await page.focus('#titlewrap #title');

	await page.type('#titlewrap #title', title);

	await Promise.all([
		// Wait for page load after the event is published
		page.waitForNavigation(),
		page.click('#publishing-action #publish'),
	]);

	// Wait for tickets list lazy load
	await page.waitForSelector(ticketsListSelector);
}
