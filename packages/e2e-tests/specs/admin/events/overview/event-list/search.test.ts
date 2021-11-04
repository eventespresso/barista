import { createNewEvent, searchEvent } from '@e2eUtils/admin/events';
import { Goto } from '@e2eUtils/admin';

describe('Search events', () => {
	// Initialize event title to be created for search testing
	const eventList = ['Test One', 'Test Two', 'Test Three', 'Test Four'];

	beforeAll(async () => {
		// Loop and create event base on the eventList
		for (const title of eventList) {
			await createNewEvent({ title });
		}
		await Goto.eventsListPage();
	});

	const testCases = [
		// Search by event list titles
		{
			desc: 'Search by event titles',
			data: eventList,
			expected: true,
		},
		// Convert event titles into uppercase for search testing
		{
			desc: 'Search by uppercase text',
			data: eventList.map((name) => name.toUpperCase()),
			expected: true,
		},
		// Convert event titles into lowercase for search testing
		{
			desc: 'Search by lowercase text',
			data: eventList.map((name) => name.toLowerCase()),
			expected: true,
		},
		// Cut random index in even title for search testing
		{
			desc: 'Search by partial text',
			data: eventList.map((event) => event.slice(0, Math.floor(Math.random() * 6 + 1))),
			expected: true,
		},
		// Generate random string for search testing
		{
			desc: 'Search by random text',
			data: [(Math.random() + 1).toString(36).substring(7), 'eweryhfghret', 'asda54h'],
			expected: false,
		},
		// null or empty strings for search testing
		{
			desc: 'Search by empty text',
			data: [null, '', undefined],
			expected: false,
		},
	];

	// // Loop all search cases
	for (const { desc, data, expected } of testCases) {
		it(desc, async () => {
			for (const searchText of data) {
				// handle searching events
				const serachResult = await searchEvent(searchText, expected);
				serachResult ? expect(serachResult).toBeTruthy() : expect(serachResult).toBeFalsy();
			}
		});
	}
});
