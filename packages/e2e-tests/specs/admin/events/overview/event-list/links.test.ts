import { createNewEvent, EDTRGlider } from '@e2eUtils/admin/events';
import { EventsListSurfer, Goto } from '@e2eUtils/admin';
import { eventList } from '../../../../shared/data';

const eventsListSurfer = new EventsListSurfer();
const edtrGlider = new EDTRGlider();

beforeAll(async () => {
	// Loop and create event base on the eventList
	for (const args of [...eventList, ...eventList]) {
		await createNewEvent(args);
	}
	await Goto.eventsListPage();
});

describe('Events overview clickable actions/links', () => {
	it('View all events link test', async () => {
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

	it('Trash link test', async () => {
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
			const countAfterRestore = await eventsListSurfer.getViewCount('Trash');
			// assert the before and after trash count
			expect(countBeforeTrash).toBeGreaterThan(countAfterRestore);
		}

		// go to "Trash" link again
		await eventsListSurfer.goToView('Trash');
		// get the number and elements of rows availble
		const countBeforeDeletePermanently = await eventsListSurfer.getViewCount('Trash');

		// check if there is event in trash
		if (countBeforeDeletePermanently) {
			// get the first event in trash
			const firstItemForDeletePermanently = await eventsListSurfer.getFirstListItem();
			// got to "Delete Permanently" action link for the selected first event
			const deletePermanentlyLink = await eventsListSurfer.getItemActionLinkByText(
				firstItemForDeletePermanently,
				'Delete Permanently'
			);
			await page.goto(deletePermanentlyLink);

			// select all the event checkbox that is selected to delete permanently
			await eventsListSurfer.checkAllDeletePermanently();
			// check the confirmation checkbox for delete permanently
			await eventsListSurfer.checkConfirmDeletePermanently();
			// click the confirm button to delete event/s permanently
			await Promise.all([page.waitForLoadState(), page.click('text="Confirm"')]);
			// go back to event page
			await Goto.eventsListPage();
			// check again the trash count if it is already less than before
			const countAfterDeletePermanently = await eventsListSurfer.getViewCount('Trash');
			// assert the before and after trash count
			expect(countBeforeDeletePermanently).toBeGreaterThan(countAfterDeletePermanently);
		}
	});

	it('Draft link test', async () => {
		// first go to "Draft" link
		await eventsListSurfer.goToView('Draft');
		// Check first the total count in draft
		const countBeforeDraft = await eventsListSurfer.getViewCount('Draft');
		//create a draft event
		await createNewEvent({
			title: 'Draft test event',
			description: 'Draft test description',
			shouldPublish: false,
		});
		// go back to event list page
		await Goto.eventsListPage();
		// go to draft link
		await eventsListSurfer.goToView('Draft');
		// get total count in draft
		const countAfterDraft = await eventsListSurfer.getViewCount('Draft');
		// assert draft if countAfterDraft is greater than countBeforeDraft
		expect(countAfterDraft).toBeGreaterThan(countBeforeDraft);

		// get the raft first item to edit
		const draftFirstItem = await eventsListSurfer.getFirstListItem();
		// got Edit link for the selected draft first item
		const draftEditLink = await eventsListSurfer.getItemActionLinkByText(draftFirstItem, 'Edit');
		await page.goto(draftEditLink);
		// save or publish the selected item
		await edtrGlider.saveEvent();
		// go back to event list page
		await Goto.eventsListPage();
		// go to Draft link
		await eventsListSurfer.goToView('Draft');
		// count again the draft list
		const countAfterDraftEdit = await eventsListSurfer.getViewCount('Draft');
		// then assert the before and after edit or publish the draft item
		expect(countAfterDraft).toBeGreaterThan(countAfterDraftEdit);
	});
});
