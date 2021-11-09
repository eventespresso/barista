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
		await eventsListSurfer.goToView('View All Events');

		// get the number and elements of rows availble
		const count = await eventsListSurfer.getItemCount();

		if (count) {
			// get only rows that is only contain "Test One" event name
			const filteredRows = await eventsListSurfer.filterRowsByName('Test One');

			// check all the checkbox that the value contain in fetchInputValue
			for (const item of filteredRows) {
				await eventsListSurfer.selectItemCheckbox(item);
			}

			// Check first the total count in view all events
			const countForViewAllBefore = await eventsListSurfer.getViewCount('View All Events');
			// Check first the total count in trash
			const countForTrashBefore = await eventsListSurfer.getViewCount('Trash');

			// after selecting all the rows that contain "Test One" trash all the selected rows
			await eventsListSurfer.trashSelected();

			// Check the total count in view all events after trashing
			const countForViewAllAfter = await eventsListSurfer.getViewCount('View All Events');
			// Check the total count in trash after trashing
			const countForTrashAfter = await eventsListSurfer.getViewCount('Trash');

			expect(countForViewAllBefore).toBeGreaterThan(countForViewAllAfter);
			expect(countForTrashBefore).toBeLessThan(countForTrashAfter);
		}

		it('', async () => {
			await eventsListSurfer.goToView('Trash');

			const firstItem = await eventsListSurfer.getFirstListItem();
			const restoreLink = await eventsListSurfer.getItemActionLinkByText(firstItem, 'Restore from Trash');
			expect(0).toBe(0);
			await page.goto(restoreLink);
		});
	});
});
