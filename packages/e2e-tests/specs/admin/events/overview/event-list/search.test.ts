import { createNewEvent, searchEvent } from '@e2eUtils/admin/events';
import { Goto } from '@e2eUtils/admin';

beforeAll(async () => {
	await Goto.eventsListPage();
});

describe('Search events', () => {
	it('tests search events', async () => {
		// Initialize event title to be created for search testing
		const eventList = ['Test One', 'Test Two', 'Test Three', 'Test Four'];
		// Convert event titles into uppercase for search testing
		const searchByUppercase = eventList.map((name) => name.toUpperCase());
		// Convert event titles into lowercase for search testing
		const searchByLowerCase = eventList.map((name) => name.toLowerCase());
		// Cut random index in even title for search testing
		const searchByPartial = eventList.map((event) => event.slice(0, Math.floor(Math.random() * 6 + 1)));
		//Generate random string or null value  for search testing
		const searchByRadmonTextNull = [(Math.random() + 1).toString(36).substring(7), ''];
		//Accumulate all search cases
		const searchCases = [eventList, searchByPartial, searchByUppercase, searchByLowerCase, searchByRadmonTextNull];

		// Loop and create event base on the eventList
		for (const title of eventList) {
			await createNewEvent({ title });
		}
		await Goto.eventsListPage();

		// Loop all search cases
		for (const [index, value] of searchCases.entries()) {
			for (const searchText of value) {
				// handle searching events
				const serachResult = await searchEvent(searchText, index);
				expect(serachResult).toBeTruthy();
			}
		}
	});
});
