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
	it('View all events link', async () => {
		// first click view all events
		await eventsListSurfer.goToView('View All Events');

		// get the number and elements of rows availble
		const count = await eventsListSurfer.getItemCount();

		if (count) {
			// get only rows that is only contain "Test One" event name
			const filteredRows = await eventsListSurfer.getRowsByName('Test One');

			// check all the checkbox that the name contain 'Test One' event
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

			// check if the previous count for view all event is greater than after trashing selected event/s
			expect(countForViewAllBefore).toBeGreaterThan(countForViewAllAfter);
			// check if the previous count for trash event is less than after trashing selected event/s
			expect(countForTrashBefore).toBeLessThan(countForTrashAfter);
		}
	});

	it('Trash link', async () => {
		// first go to "Trash" link
		await eventsListSurfer.goToView('Trash');

		// get the number and elements of rows availble
		const countBeforeTrash = await eventsListSurfer.getViewCount('Trash');

		// check if there is event in trash
		if (countBeforeTrash) {
			// get the first event in trash
			const firstItem = await eventsListSurfer.getFirstListItem();
			// got to "restore from trash" action link for the selected first event
			const restoreLink = await eventsListSurfer.getItemActionLinkByText(firstItem, 'Restore from Trash');
			await page.goto(restoreLink);

			// check again the trash count if it is already less than before
			const countAfterTrashFirstItem = await eventsListSurfer.getViewCount('Trash');
			// assert the before and after trash count
			expect(countBeforeTrash).toBeGreaterThan(countAfterTrashFirstItem);
		}

		// go to "Trash" link again
		await eventsListSurfer.goToView('Trash');
		// get the number and elements of rows availble
		const countBeforeTrashPermanently = await eventsListSurfer.getViewCount('Trash');

		// check if there is event in trash
		if (countBeforeTrashPermanently) {
			// get the first event in trash
			const firstItemForDeletePermanently = await eventsListSurfer.getFirstListItem();
			// got to "Delete Permanently" action link for the selected first event
			const deletePermanentlyLink = await eventsListSurfer.getItemActionLinkByText(
				firstItemForDeletePermanently,
				'Delete Permanently'
			);
			await page.goto(deletePermanentlyLink);

			// select all the event checkbox that is selected to delete permanently
			await page.check(
				'#eventespressoadmin-pageseventsform-sectionsconfirmeventdeletionform-events input[type="checkbox"]'
			);
			// check the confirmation checkbox for delete permanently
			await page.check('#eventespressoadmin-pageseventsform-sectionsconfirmeventdeletionform-backup-yes');
			// click the confirm button to delete event/s permanently
			await Promise.all([page.waitForLoadState(), page.click('text="Confirm"')]);
			// go back to event page
			await Goto.eventsListPage();
			// check again the trash count if it is already less than before
			const countAfterTrashPermanently = await eventsListSurfer.getViewCount('Trash');
			// assert the before and after trash count
			expect(countBeforeTrashPermanently).toBeGreaterThan(countAfterTrashPermanently);
		}
	});
});
