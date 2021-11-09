import { createNewEvent } from '@e2eUtils/admin/events';
import { EventsListSurfer, Goto } from '@e2eUtils/admin';
import { eventList } from '../../../../shared/data';

const eventsListSurfer = new EventsListSurfer();

beforeAll(async () => {
	// Loop and create event base on the eventList
	for (const args of [...eventList, ...eventList]) {
		await createNewEvent(args);
	}
	await Goto.eventsListPage();
});

describe('Events overview clickable actions/links', () => {
	it('View all events', async () => {
		// first click view all events
		await eventsListSurfer.getToView('View All Events');
		let titleList: string[];

		// get the number and elements of rows availble
		const { tableRows, count } = await eventsListSurfer.tableRowsChecker();

		if (count) {
			// assert if count is greater than or equal to one
			expect(count).toBeGreaterThanOrEqual(1);
			// get only rows that is only contain "Test One" event name
			const filteredRows = (
				await Promise.all(
					tableRows.map(async (row) => {
						const title = await eventsListSurfer.getEventName(row);
						return title === 'Test One' ? row : null;
					})
				)
			).filter(Boolean);

			// get only the value of a checkbox base on the filteredRows result
			const fetchInputValue = await Promise.all(
				filteredRows.map(
					async (ro) => await (await ro.$('.check-column input[type="checkbox"]')).getAttribute('value')
				)
			);

			// check all the checkbox that the value contain in fetchInputValue
			for (const iterator of fetchInputValue) {
				await page.check(`.check-column input[value="${iterator}"]`);
			}
			// after selecting all the roes that contain "Test One" trash all the selected rows
			await eventsListSurfer.trash();
			// check if the the selected rows i already removed then assert
			const removeIndividual = await eventsListSurfer.getListItems();
			titleList = await Promise.all(removeIndividual.map(eventsListSurfer.getEventName));
			// assert the rows that contain "Test One"
			expect(titleList).not.toContain('Test One');

			// trash all remaining rows to test the select all
			await eventsListSurfer.trashAll();
			// check number of rows left
			const { count: countCkecker } = await eventsListSurfer.tableRowsChecker();
			// assert remove all rows
			expect(countCkecker).toBe(0);
		} else {
			expect(count).toBe(0);
		}
	});
});
