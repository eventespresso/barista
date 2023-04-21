import { saveVideo, PageVideoCapture } from 'playwright-video';
import { createNewEvent } from '@e2eUtils/admin/events';
import { EventsListSurfer, Goto } from '@e2eUtils/admin';
import { uuid } from '@eventespresso/utils';
import { pluck } from 'ramda';
import { eventData } from '../../../shared/data';

const eventsListSurfer = new EventsListSurfer();

const namespace = 'events-search-clickable-actions-links';

let capture: PageVideoCapture;

beforeAll(async () => {
	capture = await saveVideo(page, `artifacts/${namespace}.mp4`);

	// delete all events from view all events link
	await eventsListSurfer.deleteAllEventsByLink('View All Events');
	// delete permanently all events at trash link
	await eventsListSurfer.deleteAllPermanentlyFromTrash();
	// Loop and create event base on the eventData
	for (const args of Object.values(eventData)) {
		await createNewEvent(args);
	}
	await Goto.eventsListPage();
});

afterAll(async () => {
	await capture?.stop();
});

describe('Search events', () => {
	const eventTitles = pluck('title', Object.values(eventData));

	const testCases = [
		// Search by event list titles
		{
			desc: 'Search by event titles',
			search: 'Test Two',
			expectedCount: 1,
			expectedTitles: ['Test Two'],
		},
		{
			desc: 'Search by event titles partially',
			search: 'Test',
			expectedCount: 4,
			expectedTitles: eventTitles,
		},
		{
			desc: 'Search by event titles in lowercase',
			search: 'test two',
			expectedCount: 1,
			expectedTitles: ['Test Two'],
		},
		{
			desc: 'Search by event titles in uppercase',
			search: 'TEST TWO',
			expectedCount: 1,
			expectedTitles: ['Test Two'],
		},
		{
			desc: 'Search by event titles partially in lowercase',
			search: 'test',
			expectedCount: 4,
			expectedTitles: eventTitles,
		},
		{
			desc: 'Search by event titles partially in uppercase',
			search: 'TEST',
			expectedCount: 4,
			expectedTitles: eventTitles,
		},
		{
			desc: 'Search by event description',
			search: 'Some description for test three event',
			expectedCount: 1,
			expectedTitles: ['Test Three'],
		},
		{
			desc: 'Search by event description partially',
			search: 'description for test three event',
			expectedCount: 1,
			expectedTitles: ['Test Three'],
		},
		{
			desc: 'Search by event description in lowercase',
			search: 'some description for test three event',
			expectedCount: 1,
			expectedTitles: ['Test Three'],
		},
		{
			desc: 'Search by event description in uppercase',
			search: 'SOME DESCRIPTION FOR TEST THREE EVENT',
			expectedCount: 1,
			expectedTitles: ['Test Three'],
		},
		{
			desc: 'Search by empty string',
			search: '',
			expectedCount: 4,
			expectedTitles: eventTitles,
		},
		{
			desc: 'Search by random string',
			search: uuid(),
			expectedCount: 0,
			expectedTitles: [],
		},
	];

	// // Loop all search cases
	for (const { desc, search, expectedCount, expectedTitles } of testCases) {
		it(desc, async () => {
			// Enter the text in search input
			await eventsListSurfer.searchFor(search);

			// count the number of results, discarding the no results row
			const tableRows = await eventsListSurfer.getListItems();

			// check if there is rows contain 'no items found'
			const hasNoItems = await eventsListSurfer.hasNoItems();
			// if hasNoItems is true, use it for count else get the table rows count length
			const count = hasNoItems ? 0 : tableRows.length;

			// if expectedCount is greater than zero use assertion toBeGreaterThanOrEqual else use toBe
			if (expectedCount > 0) {
				expect(count).toBeGreaterThanOrEqual(expectedCount);
			} else {
				expect(count).toBe(0);
			}

			// check expectedCount first if it is greater than 0
			if (expectedCount) {
				// get all the inner text value where event title is located
				const titles = await Promise.all(tableRows.map(eventsListSurfer.getEventName));
				// loop all titles
				for (const expectedTitle of expectedTitles) {
					// check if search title is inside the array of expectedTitle
					expect(titles).toContain(expectedTitle);
				}
			}
		});
	}
});
